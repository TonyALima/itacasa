import React, { useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme";
import { ThemeContext } from "./context";

export const ThemeProvider: React.FC<React.PropsWithChildren<object>> = ({
    children,
}) => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("preferredTheme");
        return stored === "dark";
    });
    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            localStorage.setItem("preferredTheme", next ? "dark" : "light");
            return next;
        });
    };

    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
