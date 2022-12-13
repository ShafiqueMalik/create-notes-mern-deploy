import React, { useState, useEffect } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper, Alert } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { useCreateNoteMutation, useDeleteNoteMutation, useGetNoteByIdQuery, useUpdateNoteMutation } from 'app/api/notesApi'

const EditNote = () => {
    let { id } = useParams();
    console.log(id)
    const [updateNote, { isError: isUpdateError, isSuccess: isUpdateSuccess }] = useUpdateNoteMutation();
    const [deleteNote, { isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeleteNoteMutation();

    const { data: singleNote, isLoading, isSuccess, isError } = useGetNoteByIdQuery(id);
    console.log(singleNote)

    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = async (data, e) => {
        try {
            const newData = { ...data, id }
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
    if (isLoading) {
        return "Loading..."
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
                        <Typography variant="h3" mb={2} color="initial">Edit Note</Typography>
                       {deleteSuccess ? (
                        <Alert severity="success">Deleted successfully!</Alert>
                       ):(
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
                             <TextField type="textarea" label="Content" multiline rows={3}
                                 variant="standard"
                                 defaultValue={singleNote?.content}

                                 {...register("content", {
                                     required: true,
                                 })}
                                 error={errors?.content}
                             />
                         </FormGroup>
                         <FormGroup sx={{ mb: 2 }}>
                             <TextField type="text" label="Category" variant="standard"
                                 defaultValue={singleNote?.category}
                                 {...register("category", {
                                     required: true,
                                 })}
                                 error={errors?.category}
                             />
                         </FormGroup>
                         <Button variant="contained" type='submit'>Update Note</Button>
                         <Button variant="contained" color="error" type='button' onClick={handleDeleteNote}
                             sx={{ ml: 2 }}
                         >Delete Note</Button>
                     </Box>
                       )}
                    </Box>
                </Box>

            </Container>
        </FullHeight>
    )
}

export default EditNote