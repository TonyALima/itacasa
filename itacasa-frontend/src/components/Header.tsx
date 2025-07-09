import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useThemeMode } from "../theme/useThemeMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";
import { HomeWork } from "@mui/icons-material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Header = () => {
    const { isDark, toggleTheme } = useThemeMode();
    const { logout, payload } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleThemeToggle = () => {
        toggleTheme();
        handleMenuClose();
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        handleMenuClose();
    };
    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HomeWork />
                    <Typography variant="h6">Itacasa</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccountCircleIcon />
                        {payload?.nome}
                    </Box>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        aria-controls={open ? "header-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="header-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        slotProps={{
                            list: {
                                "aria-labelledby": "header-menu-button",
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem onClick={handleThemeToggle}>
                            <ListItemIcon>
                                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                            </ListItemIcon>
                            <ListItemText>
                                {isDark ? "Modo Claro" : "Modo Escuro"}
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Sair</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
