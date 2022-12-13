import React, { useState } from 'react'
import { Box, Typography, Container, Button, Stack, Grid,Paper,
FormGroup,TextField
} from "@mui/material";
import FullHeight from 'components/FullHeight/FullHeight';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setLoggedInUser } from 'app/slices/globalSlice';
import { useUpdateUserProfileMutation } from 'app/api/usersApi';

const UserProfilePage = () => {
    const [updateUserProfile, { isLoading, isError }] = useUpdateUserProfileMutation();
    const [pic, setPic] = useState(null);
    const navigate = useNavigate();
    const { loggedInUser } = useSelector((state) => state.global);


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
                const { data: responseData } = await updateUserProfile({ ...dataWithoutPic, pic: imageUrl });
                console.log(responseData);
                if (responseData?.status==="success") {
                    localStorage.setItem("user", JSON.stringify(responseData));
                    dispatch(setLoggedInUser(responseData));
                    navigate("/notes");
                }
            } else {
                let { pic, ...dataWithoutPic } = { ...data };
                const { data: responseData } = await updateUserProfile({ ...dataWithoutPic });
                console.log(responseData);
                if (responseData?.status==="success") {
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
        <FullHeight sx={{ bgcolor: "#ffffff" }}>
            <Container maxWidth="lg" sx={{ pt: 3 }}>
                <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
                    <Typography variant="h3" color="initial" mb={2}>
                        Edit Profile
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <Box  className="Register-page">
                                    <Box>
                                        <FormGroup sx={{ mb: 2 }}>
                                            <TextField type="text" label="Name" variant="standard"
                                            defaultValue={loggedInUser.name}
                                                {...register("name", { required: true })}
                                                error={errors?.name}
                                            />
                                        </FormGroup>
                                        <FormGroup sx={{ mb: 2 }}>
                                            <TextField type="email" label="Email" variant="standard"
                                            defaultValue={loggedInUser.email}
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
                                                {...register("password")}
                                                error={errors?.password}
                                            />
                                        </FormGroup>
                                        <FormGroup sx={{ mb: 2 }}>
                                            <TextField type="password" label="Confirm Password" variant="standard"
                                                {...register("confirmPassword", {
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
                                        <Button variant="contained" type="submit">Update</Button>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box  component="img" src={loggedInUser?.pic} sx={{
                                width:"100%",
                                height:"100%"
                            }}/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </FullHeight>
    )
}

export default UserProfilePage