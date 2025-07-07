import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";
import axios from "../api/axios";
import { isAxiosError } from "axios";
export default function Login() {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "/auth/login",
                {
                    email,
                    senha,
                },
                {
                    withCredentials: true, // <--- apenas se back usa cookie auth
                }
            );
            const { access_token } = response.data;
            setToken(access_token); // atualiza o contexto e salva no localStorage
            navigate("/");
        } catch (err: unknown) {
            if (isAxiosError(err) && err.response?.data?.message) {
                setErro(err.response.data.message);
            } else {
                setErro("Erro ao fazer login");
            }
        }
    };
    return (
        <Box className="flex flex-col items-center justify-center min-h-screen w-full bg-background-default py-10">
            <Box className="bg-background-paper rounded-2xl shadow-lg px-12 py-12 w-full max-w-md mx-auto">
                <Box className="flex flex-col gap-6">
                    <Typography
                        variant="h4"
                        className="text-center text-text-primary font-semibold mb-4"
                    >
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        className="py-3 mt-4"
                    >
                        Entrar
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={!!erro}
                autoHideDuration={4000}
                onClose={() => setErro("")}
            >
                <Alert severity="error">{erro}</Alert>
            </Snackbar>
        </Box>
    );
}
