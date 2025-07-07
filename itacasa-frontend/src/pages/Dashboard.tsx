import { useEffect, useState } from "react";
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
import axios from "../api/axios";
import Header from "../components/Header";
import { type Imovel } from "../dtos/imovel.dto";
import ImovelCard from "../components/Imovel";
import { Add } from "@mui/icons-material";

export default function Dashboard() {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const carregarImoveis = async () => {
            try {
                const response = await axios.get<Imovel[]>("/imovel");
                setImoveis(response.data);
            } catch {
                setErro("Erro ao carregar os imoveis");
            } finally {
                setCarregando(false);
            }
        };
        carregarImoveis();
    }, []);
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

                        <Box className="flex justify-end mb-6">
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

                        {carregando ? (
                            <Box className="flex justify-center mt-4">
                                <CircularProgress />
                            </Box>
                        ) : erro ? (
                            <Alert severity="error" className="mt-4">
                                {erro}
                            </Alert>
                        ) : (
                            <Grid container spacing={3} className="mt-4">
                                {imoveis.map((imovel) => (
                                    <Grid size={12} key={imovel.id}>
                                        <ImovelCard {...imovel} />
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
