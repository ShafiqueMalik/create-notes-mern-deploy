import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import LoadingButton from 'components/LoadingButton/LoadingButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    
    boxShadow: 2,
    borderRadius:"8px"
};

export default function ConfirmationModal({ open, setOpen,isLoading=false, title = "Do you want to delete?", message = "", onDelete, onOk, onCancel }) {

    return (
        <Box>
            <Modal
                open={open}
                onClose={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Box className="modal-body" sx={{ p: 4 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        {!!message && (
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {message}
                            </Typography>
                        )}
                    </Box>
                    <Stack direction="row" sx={{ py:1,px:4, gap: { xs: 0.5, sm: 1, lg: 3 } }}>
                        {!!onDelete && (
                            <LoadingButton isLoading={isLoading} text="Delete" variant="contained" color="error" type='button' onClick={onDelete}/>
                           
                        )}
                        {!!onCancel && (
                            <Button variant="contained" type='submit'
                                sx={{ gap: "5px" }}
                            >
                                <Box component="span">Update</Box>
                            </Button>
                        )}
                            <Button variant="contained" type='submit'
                                sx={{ gap: "5px" }}
                                onClick={setOpen}
                            >
                                <Box component="span">Close</Box>
                            </Button>

                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}