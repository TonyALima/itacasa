import { createContext } from "react";

export interface TokenPayload {
    sub: string;
    nome: string;
    tipo: string;
}

interface AuthContextType {
    payload: TokenPayload | null;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
