import React, { useEffect, useState } from 'react'
import { Typography, Box, TextField, Button, Container, FormGroup, Paper } from '@mui/material'
import FullHeight from 'components/FullHeight/FullHeight'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'app/api/usersApi'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from 'app/slices/globalSlice'

const Register = ({ history }) => {
    const [registerUser, { isLoading, isError }] = useRegisterMutation();
    const [pic, setPic] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            let imageUrl;
            if (data.pic.length) {
                const formData = new FormData();
                console.log(data.pic)
                formData.append("file", data.pic[0]);
                formData.append("upload_preset", "create-note");
                formData.append("cloud_name", "dovhizk82");
                let cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dovhizk82/image/upload", {
                    method: "POST",
                    body: formData
                });
                let { url } = await cloudinaryResponse.json()
                imageUrl = url;
            }
            if (imageUrl) {
                let { pic, ...dataWithoutPic } = { ...data };
                const { data: responseData } = await registerUser({ ...dataWithoutPic, pic: imageUrl });
                console.log(responseData);
                if (responseData?.success) {
                    localStorage.setItem("user", JSON.stringify(responseData));
                    dispatch(setLoggedInUser(responseData));
                    navigate("/notes");
                }
            } else {
                let { pic, ...dataWithoutPic } = { ...data };
                const { data: responseData } = await registerUser({ ...dataWithoutPic });
                console.log(responseData);
                if (responseData?.success) {
                    localStorage.setItem("user", JSON.stringify(responseData));
                    dispatch(setLoggedInUser(responseData));
                    navigate("/notes");
                }
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
                    <Box component={Paper} className="Register-page" sx={{
                        maxWidth: "500px",
                        width: "90%",
                        m: "auto",
                        p: 5,
                        my: "20px"
                    }}>
                        <Typography variant="h3" color="initial">Register</Typography>
                        <Box>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField type="text" label="Name" variant="standard"
                                    {...register("name", { required: true })}
                                    error={errors?.name}
                                />
                            </FormGroup>
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
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField type="password" label="Confirm Password" variant="standard"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (val) => {
                                            if (watch('password') != val) {
                                                return "Your passwords do no match";
                                            }
                                        },
                                    })}
                                    error={errors?.confirmPassword}
                                />
                                <Typography component="span" color="error">{errors?.confirmPassword?.message}</Typography>

                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField type="file" label="Image" variant="standard"
                                    {...register("pic")}
                                // error={errors?.pic}
                                />
                            </FormGroup>
                            <Button variant="contained" type="submit">Signup</Button>
                            <Typography variant="body2" mt={2}>
                                Already have an account <Link to="/login">Login Here</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </FullHeight>
    )
}

export default Register