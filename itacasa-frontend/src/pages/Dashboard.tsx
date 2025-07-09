import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Container,
    Button,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ImovelCard from "../components/Imovel";
import { Add } from "@mui/icons-material";
import { useImoveis } from "../hooks/useImoveis";
import { useAuth } from "../auth/use-auth";
import { useEffect } from "react";

export default function Dashboard() {
    const { token, payload } = useAuth();

    const navigate = useNavigate();
    const { imoveis } = useImoveis({ userId: payload?.sub });

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <Box className="min-h-screen w-full bg-background-default">
            <Header />
            <Box className="py-10">
                <Container maxWidth="lg">
                    <Box className="bg-background-paper rounded-2xl shadow-lg px-12 py-12 mx-auto">
                        <Typography
                            variant="h4"
                            className="text-center text-text-primary font-semibold mb-8"
                            gutterBottom
                        >
                            Lista de Imoveis
                        </Typography>

                        <Box className="flex justify-between items-center mb-6">
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    imoveis.mutate(undefined, {
                                        revalidate: true,
                                    })
                                }
                                disabled={imoveis.isLoading}
                            >
                                Atualizar Lista
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/imovel/novo")}
                                className="bg-primary-main hover:bg-primary-dark"
                                startIcon={<Add />}
                            >
                                Adicionar Imóvel
                            </Button>
                        </Box>

                        {imoveis.isLoading ? (
                            <Box className="flex justify-center mt-4">
                                <CircularProgress />
                            </Box>
                        ) : imoveis.error ? (
                            <Alert severity="error" className="mt-4">
                                {imoveis.error}
                            </Alert>
                        ) : imoveis.data && imoveis.data.length === 0 ? (
                            <Box className="text-center mt-8">
                                <Typography variant="h6" color="textSecondary">
                                    Nenhum imóvel encontrado
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className="mt-2"
                                >
                                    Clique em "Adicionar Imóvel" para começar
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3} className="mt-4">
                                {imoveis.data?.map((imovel) => (
                                    <Grid size={12} key={imovel.id}>
                                        <ImovelCard imovel={imovel} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
