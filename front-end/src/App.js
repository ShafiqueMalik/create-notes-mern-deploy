import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import { Box, Container } from "@mui/material";
import Footer from 'components/Footer/Footer';
import Home from 'Pages/Home/Home';
import About from 'Pages/About/About';
import Notes from 'Pages/Notes/Notes';
import CreateNote from 'Pages/CreateNote/CreateNote';
import Login from 'Pages/Login/Login';
import Register from 'Pages/Register/Register';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import EditNote from 'Pages/EditNote/EditNote';
import UserProfilePage from 'Pages/UserProfilePage/UserProfilePage';
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Box className="app">
          <Navbar />
          <Box component="main" sx={{
            minHeight: "calc(100vh - 64px)",
            mt: "64px"
          }}>
           
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/notes" element={<ProtectedRoute Component={Notes} />} />
                <Route path="/notes/create-note" element={<ProtectedRoute Component={CreateNote} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notes/edit/:id" element={<EditNote />} />
                <Route path="/profile" element={<ProtectedRoute Component={UserProfilePage} />} />
              </Routes>
           </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </>

  );
}

export default App;
