import React, { useEffect, useState } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'app/api/usersApi'
import { setLoggedInUser } from 'app/slices/globalSlice'
import { useDispatch } from 'react-redux'
import AutoCloseAlert from 'components/AutoCloseAlert/AutoCloseAlert'
import LoadingButton from 'components/LoadingButton/LoadingButton'

const Login = () => {
    const [login, { isLoading,isError,isSuccess,error }] = useLoginMutation();
    console.log(error)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [unhandleError, setUnhandleError] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const {data:responseData} = await login({ ...data });
            console.log(responseData);
            if (responseData?.status==="success") {
                localStorage.setItem("user", JSON.stringify(responseData));
                dispatch(setLoggedInUser(responseData));
                navigate("/notes");
            }
            setUnhandleError("");
        } catch (error) {
            setUnhandleError("Exception occur!, please try again.");
        }
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
                        {isSuccess && <AutoCloseAlert type="success" message="Successfully login!"/>}
                        {isError && <AutoCloseAlert message={error?.data?.message}/>}
                        {unhandleError.length>0 && <AutoCloseAlert message={unhandleError}/>}

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
                            {/* <Button variant="contained" type='submit'>LOGIN</Button> */}
                            <LoadingButton text="LOGIN" isLoading={isLoading} variant="contained" type="submit"/>
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