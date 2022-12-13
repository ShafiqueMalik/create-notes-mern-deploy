import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const FullHeight = styled(Box)(({ theme }) => ({
    minHeight:"calc(100vh - 64px)"
}));


export default FullHeight