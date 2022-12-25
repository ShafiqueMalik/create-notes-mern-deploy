import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Divider, Button, Stack, FormControl, InputLabel, Select, MenuItem, Fab } from "@mui/material";
import FullHeight from 'components/FullHeight/FullHeight';
import NotesAccordion from './NotesAccordion';
import { Link, useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useGetNotesQuery } from 'app/api/notesApi';
import AddIcon from '@mui/icons-material/Add';
import MainLoader from 'components/MainLoader/MainLoader';


const Notes = ({ history }) => {
    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");
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

    useEffect(() => {
        setCategories([...new Set(notes?.map(note => note.category))]);
    }, [notes]);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    if (isLoading) {
        return <MainLoader />
    }
    if (isError) {
        return "something went wrong..."
    }
    return (
        <FullHeight>
            <Container>
                {notes.length > 0 ? (
                    <>
                        <Typography variant="h4" fontWeight={100} pt={3} pb={1}>
                          <strong>Notes</strong>
                        </Typography>
                        {/* <Divider /> */}
                        <Stack direction="row" mt={2} justifyContent="space-between" alignItems="center">
                            <FormControl size='small' sx={{ width: "200px" }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCategory}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem  value="">All</MenuItem>
                                    {categories?.map(item => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* <Button variant="contained" component={Link} to="create-note"
                                sx={{ textTransform: "uppercase", width: "fit-content", mt: 2, display: "flex", ml: "auto" }}>Create new memory</Button> */}
                            <Fab color="primary" component={Link} to="create-note" aria-label="add" >
                                <AddIcon />
                            </Fab>
                        </Stack>
                        <Box sx={{ mt: 1 }}>
                            <NotesAccordion notes={notes.filter(item=>item.category.includes(selectedCategory))} />
                        </Box>
                    </>
                ) : (<Typography variant="h6" py={1}>
                    You don't have any note. <Link to="create-note">Click here to create one.</Link>
                </Typography>)}

            </Container>
        </FullHeight>
    )
}

export default Notes