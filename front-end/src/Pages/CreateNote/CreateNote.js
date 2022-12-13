import React, {useState, useEffect } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper, Alert } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { useCreateNoteMutation } from 'app/api/notesApi'

const CreateNote = () => {
  const [createNote, { isLoading, isError, isSuccess }] = useCreateNoteMutation();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const onSubmit = async (data, e) => {
    try {
      const { data: responseData } = await createNote({ ...data });
      reset();
      console.log(responseData);
    } catch (error) {
      console.log("Error:", error)
    }
  }
  useEffect(()=>{
    if(isSuccess){
      setSuccess(true);
      setTimeout(()=>{
        setSuccess(false);
      },3000);
    }else{
      setSuccess(false);
    }
  },[isSuccess])
  if (isError) {
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
                <TextField type="textarea" label="Content" multiline rows={3} variant="standard"
                  {...register("content", {
                    required: true,
                  })}
                  error={errors?.content}
                />
              </FormGroup>
              <FormGroup sx={{ mb: 2 }}>
                <TextField type="text" label="Category" variant="standard"
                  {...register("category", {
                    required: true,
                  })}
                  error={errors?.category}
                />
              </FormGroup>
              <Button variant="contained" type='submit'>Create Note</Button>
              <Button variant="contained" color="error" type='button' onClick={()=>reset()}
                sx={{ ml: 2 }}
              >Reset</Button>
              <Typography variant="body2" mt={2}>
                New user register here <Link to="/register">Register Here</Link>
              </Typography>
            </Box>
          </Box>
        </Box>

      </Container>
    </FullHeight>
  )
}

export default CreateNote