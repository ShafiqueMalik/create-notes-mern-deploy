import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

import "./MainLoader.scss";
const MainLoader = () => {
    return (
        <div className='loading-container'>
            <div className="loading">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default MainLoader