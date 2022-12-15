import React, { useState, useEffect, useRef } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper, Alert, IconButton, Autocomplete, FormHelperText } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { useCreateNoteMutation, useDeleteNoteMutation, useGetNoteByIdQuery, useGetNotesQuery, useUpdateNoteMutation } from 'app/api/notesApi'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import NoteEditor from 'components/NoteEditor/NoteEditor'
import { Stack } from '@mui/system'
import MainLoader from 'components/MainLoader/MainLoader'
const EditNote = () => {
    let { id } = useParams();
    console.log(id)
    const [updateNote, { isError: isUpdateError, isSuccess: isUpdateSuccess }] = useUpdateNoteMutation();
    const [deleteNote, { isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeleteNoteMutation();
    const { data: notes, isLoading: isNotesLoading, isSuccess: isNotesSuccess, isError: isNotesError } = useGetNotesQuery();

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const { data: singleNote, isLoading, isSuccess, isError } = useGetNoteByIdQuery(id);
    const editorRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const navigate = useNavigate();

    const [contentError, setContentError] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onSubmit = async (data, e) => {
        if(!category){
            return;
        }
        try {
            if (editorRef.current) {
                if (editorRef?.current?.getContent()?.trim() === "") {
                    setContentError(true);
                    return;
                } else {
                    setContentError(false);
                    data.content = editorRef?.current?.getContent()?.trim();
                }
            }
            const newData = { ...data, id,category }
            const { data: responseData } = await updateNote({ ...newData });
            reset();
            navigate("/notes")
        } catch (error) {
            console.log("Error:", error)
        }
    }


    useEffect(() => {
        if (isUpdateSuccess) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } else {
            setSuccess(false);
        }
    }, [isUpdateSuccess])

    const handleDeleteNote = async () => {
        reset();
        const { data: responseData } = await deleteNote(id);
        setDeleteSuccess(true);

        setTimeout(() => {
            setDeleteSuccess(false);
            navigate("/notes")
        }, 3000);
    }
    useEffect(() => {
        if (isNotesSuccess) {
            setCategories(notes?.map(note => note.category));
        }
    }, [notes]);
    useEffect(() => {
        if (singleNote) {
            setCategory(singleNote.category)
        }
    }, [singleNote]);
    if (isLoading || isUpdateError || isDeleteError || isNotesLoading) {
        return <MainLoader/>
    }
    if (isUpdateError) {
        return "Something went wrong..."
    }
    return (
        <FullHeight sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="lg">
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box component={Paper} className="login-page" sx={{
                        maxWidth: "800px",
                        width: "90%",
                        m: "auto",
                        py: 2,
                        px: 5
                    }}>
                        {success && <Alert severity="success">Updated successfully!</Alert>}
                        <Button color='primary' variant="outlined" sx={{ mb: 1 }}
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIosOutlinedIcon />
                        </Button>
                        <Typography variant="h3" mb={2} color="initial">Edit Note</Typography>
                        {deleteSuccess ? (
                            <Alert severity="success">Deleted successfully!</Alert>
                        ) : (
                            <Box>
                                <FormGroup sx={{ mb: 2 }}>
                                    <TextField type="text" label="Title" variant="standard"
                                        defaultValue={singleNote?.title}
                                        {...register("title", {
                                            required: true,
                                        })}
                                        error={errors?.title}
                                    />
                                </FormGroup>
                                <FormGroup sx={{ mb: 2 }}>
                                    {/* <TextField type="textarea" label="Content" multiline rows={3}
                                        variant="standard"
                                        defaultValue={singleNote?.content}

                                        {...register("content", {
                                            required: true,
                                        })}
                                        error={errors?.content}
                                    /> */}
                                    <NoteEditor editorRef={editorRef} value={singleNote?.content} />
                                    {contentError && <FormHelperText sx={{ color: "error.main" }}>This field is required.</FormHelperText>
                                    }
                                </FormGroup>
                                <FormGroup sx={{ mb: 2 }}>
                                    {/* <TextField type="text" label="Category" variant="standard"
                                        defaultValue={singleNote?.category}
                                        {...register("category", {
                                            required: true,
                                        })}
                                        error={errors?.category}
                                    /> */}
                                    <Autocomplete
                                        disablePortal
                                        freeSolo
                                        options={categories}
                                        defaultValue={singleNote.category}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params}
                                            type="text"
                                            variant="standard" label="Category"
                                            error={category.length===0}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />}
                                    />
                                </FormGroup>
                                <Stack direction="row" sx={{ gap: { xs: 0.5, sm: 1, lg: 3 } }}>
                                    <Button variant="contained" type='submit'
                                        sx={{ gap: "5px" }}

                                    >
                                        <Box component="span">Update</Box>
                                        <EditOutlinedIcon />
                                    </Button>
                                    <Button variant="contained" color="error" type='button'
                                        onClick={handleDeleteNote}
                                        sx={{ gap: "5px" }}
                                    >
                                        <Box component="span">Delete</Box>
                                        <DeleteForeverOutlinedIcon />
                                    </Button>
                                    <Button variant="outlined" color="info" type='button'
                                        onClick={() => navigate(-1)}
                                        sx={{ gap: "5px" }}
                                    >
                                        <ArrowBackIosOutlinedIcon />
                                        <Box component="span">Cancel</Box>
                                    </Button>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Box>

            </Container>
        </FullHeight>
    )
}

export default EditNote