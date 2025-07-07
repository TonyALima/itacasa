import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../theme/useThemeMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";
import { HomeWork } from "@mui/icons-material";
const Header = () => {
    const { isDark, toggleTheme } = useThemeMode();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HomeWork />
                    <Typography variant="h6">Itacasa</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Button color="inherit" onClick={handleLogout}>
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
