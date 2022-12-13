import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Container, Tooltip, IconButton, Avatar, Menu, MenuItem, InputBase } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import UserProfilePhotoMenu from './UserProfilePhotoMenu';

const drawerWidth = 240;
const navItemsData = [{
    text: "My Notes",
    route: "notes"
}];

function Navbar(props) {
    const { window } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector((state) => state.global);
    const [user, setUser] = React.useState(null);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        if (loggedInUser) {
            setUser(loggedInUser)
        } else {
            setUser(null)
        }
    }, [loggedInUser]);
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItemsData.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} component="header">
            <AppBar component="nav" position='fixed'>
                <Container maxWidth="lg">
                    <Toolbar sx={{ alignItems: "stretch", px: "0 !important" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            color="inherit"
                            sx={{
                                mr: "auto",
                                fontFamily: "cursive",
                                textDecoration: "none",
                                display: { xs: 'none', sm: 'flex', alignItems: "center" }
                            }}
                        >
                            CREATE(NOTES)
                        </Typography>
                        {user && (
                            <>
                                <SearchInput />
                                <Box sx={{
                                    display: {
                                        xs: 'none', sm: 'flex', alignItems: "center", gap: "20px",
                                        alignItems: "stretch"
                                    }
                                }}>
                                    {navItemsData.map((item) => (
                                        <Box component={NavLink} to={`/${item.route}`} key={item.text}
                                            sx={{
                                                position: "relative",
                                                color: '#fff', px: 1, display: "flex",
                                                alignItems: "center", textDecoration: "none",
                                                "&.active::after": {
                                                    content: '""',
                                                    display: "block",
                                                    width: "100%",
                                                    height: "4px",
                                                    backgroundColor: "red",
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0,
                                                }
                                            }}>
                                            {item.text}
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}

                        {user ? (<UserProfilePhotoMenu user={user} />) : (
                            <>
                                <Box component={NavLink} to={`/register`}
                                    sx={{
                                        position: "relative",
                                        color: '#fff', px: 1, display: "flex",
                                        alignItems: "center", textDecoration: "none",
                                        ml: 2,
                                        "&.active::after": {
                                            content: '""',
                                            display: "block",
                                            width: "100%",
                                            height: "4px",
                                            backgroundColor: "red",
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                        }
                                    }}>
                                    Signup
                                </Box>
                                <Box component={NavLink} to={`/login`}
                                    sx={{
                                        position: "relative",
                                        color: '#fff', px: 1, display: "flex",
                                        alignItems: "center", textDecoration: "none",
                                        "&.active::after": {
                                            content: '""',
                                            display: "block",
                                            width: "100%",
                                            height: "4px",
                                            backgroundColor: "red",
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                        }
                                    }}>
                                    Login
                                </Box>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;