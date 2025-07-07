import { createTheme } from "@mui/material/styles";

const commonSettings = {
    typography: {
        fontFamily: "Roboto, sans-serif",
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none" as const,
                    borderRadius: "0.5rem",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "0.5rem",
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#42a5f5" },
        secondary: { main: "#ff9800" },
    },
    ...commonSettings,
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#80cbc4" },
        secondary: { main: "#ffb74d" },
    },
    ...commonSettings,
});
