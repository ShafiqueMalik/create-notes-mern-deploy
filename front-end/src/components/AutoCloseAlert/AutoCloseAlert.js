import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'

const AutoCloseAlert = ({ type="error",message="",timeout=3000 }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, timeout)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    if (!show) {
        return null;
    }

    return (
        <Alert severity={type}>{message}</Alert>
    )
}

export default AutoCloseAlert