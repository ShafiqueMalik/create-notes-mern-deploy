import { Box, Button, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingButton = ({text,isLoading,...props}) => {
    return (
        <Button {...props} disabled={isLoading}>
            <Box component="span">{text}</Box>
            {isLoading && <CircularProgress sx={{ml:1}} size={20} color="inherit" />}
        </Button>
    )
}

export default LoadingButton