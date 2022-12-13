import React, { useEffect } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
    const [login, { isLoading,isError }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const {data:responseData} = await login({ ...data });
            console.log(responseData);
            if (responseData?.success) {
                localStorage.setItem("user", JSON.stringify(responseData));
                dispatch(setLoggedInUser(responseData));
                navigate("/notes");
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }
    
    if (isError) {
        return "Something went wrong..."
    }
    return (
        <FullHeight sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="lg">
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box component={Paper} className="login-page" sx={{
                        maxWidth: "500px",
                        width: "90%",
                        m: "auto",
                        p: 5
                    }}>
                        <Typography variant="h3" color="initial">LOGIN</Typography>
                        <Box>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField type="email" label="Email" variant="standard"
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Entered value does not match email format"
                                        }
                                    })}
                                    error={errors?.email || errors?.email?.message.length > 0}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField type="password" label="Password" variant="standard"
                                    {...register("password", { required: true })}
                                    error={errors?.password}
                                />
                            </FormGroup>
                            <Button variant="contained" type='submit'>LOGIN</Button>
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

export default Login