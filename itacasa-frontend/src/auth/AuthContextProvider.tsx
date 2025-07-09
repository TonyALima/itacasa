import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext, type TokenPayload } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            // Verifica se o token armazenado está expirado
            try {
                const decoded: { exp: number } = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    localStorage.removeItem("token");
                    return null;
                }
                return storedToken;
            } catch {
                localStorage.removeItem("token");
                return null;
            }
        }
        return null;
    });
    const [payload, setPayload] = useState<TokenPayload | null>(null);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch {
            return true; // Se não conseguir decodificar, considera como expirado
        }
    };

    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                // Token expirado, remove do estado e localStorage
                setToken(null);
                localStorage.removeItem("token");
                setPayload(null);
            } else {
                localStorage.setItem("token", token);
                setPayload(jwtDecode(token));
            }
        } else {
            localStorage.removeItem("token");
            setPayload(null);
        }
    }, [token]);
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };
    return (
        <AuthContext.Provider value={{ payload, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
