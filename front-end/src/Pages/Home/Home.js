import React, { useEffect } from 'react'
import { Typography, Container, Button, Stack } from "@mui/material";
import FullHeight from 'components/FullHeight/FullHeight';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
    const { loggedInUser } = useSelector((state) => state.global);
    const navigate =useNavigate();
    useEffect(()=>{
        if(loggedInUser){
            navigate("/notes")
        }
    },[loggedInUser])
    return (
        <FullHeight sx={{ bgcolor: "#ffffff" }}>
            <Container maxWidth="lg">
                <Typography textAlign="center" variant="h1" color="initial">
                    Welcome to Note Cloud
                </Typography>
                <Typography textAlign="center" >
                    Very save place save your notes.
                </Typography>
                {!loggedInUser && (
                    <Stack direction="row" gap={8} justifyContent="center" mt={4}>
                        <Button component={Link} to="/login" variant="contained" color="primary">
                            Login
                        </Button>
                        <Button component={Link} to="/register" variant="outlined" color="primary">
                            Signup
                        </Button>
                    </Stack>
                )}
            </Container>
        </FullHeight>
    )
}

export default Home