import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Divider, Button } from "@mui/material";
import FullHeight from 'components/FullHeight/FullHeight';
import NotesAccordion from './NotesAccordion';
import { Link, useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useGetNotesQuery } from 'app/api/notesApi';


const Notes = ({ history }) => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const { data, isLoading, isSuccess, isError } = useGetNotesQuery();

    useEffect(() => {
        if (data && isSuccess) {
            setNotes(data);
        }
    }, [data]);

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/");
        }
    }, [history]);


    if (isLoading) {
        return "Loading..."
    }
    if (isError) {
        return "something went wrong..."
    }

    return (
        <FullHeight>
            <Container>
                {notes.length > 0 ? (
                    <>
                        <Typography variant="h3" fontWeight={100} py={1}>
                            List of your <strong>notes</strong>
                        </Typography>
                        <Divider />
                        <Button variant="contained" component={Link} to="create-note"
                            sx={{ textTransform: "uppercase", width: "fit-content", mt: 2, display: "flex", ml: "auto" }}>Create new memory</Button>
                        <Box sx={{ mt: 1 }}>
                            <NotesAccordion notes={notes} />
                        </Box>
                    </>
                ) : (<Typography variant="h6"  py={1}>
                    You don't have any note. <Link to="create-note">Click here to create one.</Link>
                </Typography>)}

            </Container>
        </FullHeight>
    )
}

export default Notes