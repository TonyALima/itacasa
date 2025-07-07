import { useContext } from "react";
import { ThemeContext } from "./context";

export const useThemeMode = () => useContext(ThemeContext);
