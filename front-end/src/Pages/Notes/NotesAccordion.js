import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Chip, Alert, IconButton } from "@mui/material";
import { useDeleteNoteMutation, useUpdateNoteMutation } from 'app/api/notesApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dateToDDMMMYYYY } from 'utils/dateTime';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : "#bedaeb",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function NotesAccordion({ notes }) {
  const [expanded, setExpanded] = React.useState("1");
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [deleteNote, { isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeleteNoteMutation();
  const { searchTerm } = useSelector((state) => state.global);

  const navigate = useNavigate();

  const handleEditClick = async (e, note) => {
    e.stopPropagation();
    navigate(`edit/${note._id}`);
  }
  const handleDeleteClick = async (e, { _id }) => {
    e.stopPropagation();
    const { data: responseData } = await deleteNote(_id);
  }


  React.useEffect(() => {
    if (isDeleteSuccess) {
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } else {
      setDeleteSuccess(false);
    }
  }, [isDeleteSuccess])
  return (
    <Box sx={{
      "& .MuiPaper-root": {
        border: "none",
        mb: 1.5
      }
    }}>
      {deleteSuccess && <Alert severity="success">Deleted successfully!</Alert>}
      {[...notes]?.reverse()
        ?.filter(filterNote => filterNote.title.toLowerCase().includes(searchTerm.toLowerCase()))?.map((note, idx) => (
          <Accordion key={note._id}
            sx={{
              "& .MuiAccordionSummary-content": {
                justifyContent: "space-between",
                alignItems: "center",
                border: "none",
              }
            }}
          >
            <AccordionSummary sx={{
            }} aria-controls="panel1d-content" id="panel1d-header"
            >
              <Typography fontWeight="500">{note.title}</Typography>
              <Stack direction="row" gap={1}>
                <Button variant='outlined' aria-label='edit note'
                  sx={{ minWidth: "35px", "&:hover": { bgcolor: "currentcolor" }, "&:hover svg": { fill: "white" } }}
                  onClick={(e) => handleEditClick(e, note)} color="info" size="small">
                  <EditOutlinedIcon />
                </Button>
                <Button variant='outlined' aria-label='delete note'
                  color='error'
                  sx={{ minWidth: "35px", "&:hover": { bgcolor: "currentcolor" }, "&:hover svg": { fill: "white" } }}
                  onClick={(e) => { }} size="small">
                  <DeleteForeverOutlinedIcon />
                </Button>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{
              border: "1px solid #bedaeb",
              borderTop: 0,
              borderRadius: "0 0 10px 10px",
            }}>
              <Chip size="small" label={note.category} color="info" sx={{ mb: 1 }} />
              <Typography mb={1.5} dangerouslySetInnerHTML={{ __html: note.content }} />
                {/* <div  />
              </Typography> */}
              <Typography fontSize="13px" sx={{ textAlign: "right", color: (theme) => theme.palette.grey[600] }}>
                Created on &#8212; {dateToDDMMMYYYY(new Date(note.createdAt))}
              </Typography>

            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}