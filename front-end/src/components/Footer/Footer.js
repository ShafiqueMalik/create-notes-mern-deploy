import React from 'react'
import {Box, Typography} from "@mui/material";
const Footer = () => {
  return (
    <Box component="footer" sx={{
      textAlign:"center",
      p:2,
      bgcolor:"primary.main",
      color:"white"
    }}>
      <Typography variant="body1" >
        All right reserved. Powered by <b>Shafique Malik</b>
      </Typography>
    </Box>
  )
}

export default Footer