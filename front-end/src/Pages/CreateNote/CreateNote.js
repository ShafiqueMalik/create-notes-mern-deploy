import React, { useState, useEffect, useRef } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper, Alert, FormControl, FormLabel, FormHelperText, Autocomplete } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { useCreateNoteMutation, useGetNotesQuery } from 'app/api/notesApi'
import NoteEditor from 'components/NoteEditor/NoteEditor'

const CreateNote = () => {
  const [createNote, { isLoading, isError, isSuccess }] = useCreateNoteMutation();
  const [success, setSuccess] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const { data: notes, isLoading: isNotesLoading, isSuccess: isNotesSuccess, isError: isNotesError } = useGetNotesQuery();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const editorRef = useRef(null);

  const onSubmit = async (data, e) => {
    console.log("EEEEEEEE")
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
      const { data: responseData } = await createNote({ ...data });
      reset();
      console.log(responseData);
    } catch (error) {
      console.log("Error:", error)
    }
  }
  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setSuccess(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isNotesSuccess) {
      setCategories(notes?.map(note => note.category));
    }
  }, [notes]);

  if (isError || isNotesError) {
    return "Something went wrong..."
  }
  if (isNotesLoading) {
    return "Loading..."
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
            {success && <Alert severity="success">Created successfully!</Alert>}
            <Typography variant="h3" mb={2} color="initial">Create New Note</Typography>
            <Box>
              <FormGroup sx={{ mb: 2 }}>
                <TextField type="text" label="Title" variant="standard"
                  {...register("title", {
                    required: true,
                  })}
                  error={errors?.title}
                />
              </FormGroup>
              <FormGroup sx={{ mb: 2 }}>
                {/* <TextField type="textarea" label="Content" multiline rows={3} variant="standard"
                  {...register("content", {
                    required: true,
                  })}
                  error={errors?.content}
                /> */}
                <FormControl>
                  <FormLabel sx={{ mb: 0 }}>Content</FormLabel>
                  <NoteEditor editorRef={editorRef} />
                  {contentError && <FormHelperText sx={{ color: "error.main" }}>This field is required.</FormHelperText>
                  }

                </FormControl>
              </FormGroup>
              <FormGroup sx={{ mb: 2 }}>
                {/* <TextField type="text" label="Category" variant="standard"
                  {...register("category", {
                    required: true,
                  })}
                  error={errors?.category}
                /> */}
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} variant="standard" label="Category" 
                  {...register("category", {
                    required: true,
                  })}
                  error={errors?.category}
                  />}
                />
              </FormGroup>
              <Button variant="contained" type='submit'>Create Note</Button>
              <Button variant="contained" color="error" type='button' onClick={() => reset()}
                sx={{ ml: 2 }}
              >Reset</Button>
            </Box>
          </Box>
        </Box>

      </Container>
    </FullHeight>
  )
}

export default CreateNote