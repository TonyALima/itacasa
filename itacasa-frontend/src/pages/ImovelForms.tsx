import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";
import { useImoveis } from "../hooks/useImoveis";
import type { ImovelPayload } from "../dtos/imovel.dto";

export default function ImovelForms() {
    const navigate = useNavigate();
    const { token, payload } = useAuth();
    const { createImovel } = useImoveis({ userId: payload?.sub });

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [formData, setFormData] = useState({
        tipo: "",
        cidade: "",
        bairro: "",
        andar: "",
        numQuartos: "",
        area: "",
        valor: "",
        areaQuintal: "",
    });
    const [errors, setErrors] = useState({
        tipo: false,
        cidade: false,
        bairro: false,
        andar: false,
        numQuartos: false,
        area: false,
        valor: false,
        areaQuintal: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name as string]: value,
        });
        setErrors({
            ...errors,
            [name as string]: false,
        });
    };

    // Função para formatar valor como moeda BRL
    const formatCurrency = (value: string) => {
        const numeric = value.replace(/\D/g, "");
        const number = Number(numeric) / 100;
        if (isNaN(number)) return "";
        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    // Função para tratar a digitação do campo valor
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numeric = rawValue.replace(/\D/g, "");
        const formatted = formatCurrency(numeric);
        setFormData({
            ...formData,
            valor: formatted,
        });
        setErrors({
            ...errors,
            valor: false,
        });
    };

    // Ajuste na validação para considerar campos condicionais
    const validate = () => {
        const valorNumber = Number(formData.valor.replace(/\D/g, "")) / 100;
        const isApartamento = formData.tipo === "apartamento";
        const isCasa = formData.tipo === "casa";
        const newErrors = {
            tipo: formData.tipo === "",
            cidade: formData.cidade.trim() === "",
            bairro: formData.bairro.trim() === "",
            andar: isApartamento ? formData.andar === "" : false,
            areaQuintal: isCasa ? formData.areaQuintal === "" : false,
            numQuartos: formData.numQuartos === "",
            area: formData.area === "",
            valor: formData.valor === "" || valorNumber <= 0,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const valorNumber = Number(formData.valor.replace(/\D/g, "")) / 100;

        const imovelData: ImovelPayload = {
            tipo: formData.tipo.toUpperCase() as "CASA" | "APARTAMENTO",
            cidade: formData.cidade || null,
            bairro: formData.bairro || null,
            numQuartos: Number(formData.numQuartos),
            areaConstruida: Number(formData.area),
            valor: valorNumber,
        };

        // Adiciona campos condicionais
        if (formData.tipo === "apartamento" && formData.andar) {
            imovelData.andar = Number(formData.andar);
        }

        if (formData.tipo === "casa" && formData.areaQuintal) {
            imovelData.tamanhoQuintal = Number(formData.areaQuintal);
        }

        createImovel(imovelData);
        navigate("/");
    };

    const handleBack = () => {
        navigate("/");
    };
    return (
        <Box className="flex flex-col items-center justify-center min-h-screen w-full bg-background-default py-10">
            <form
                onSubmit={handleSubmit}
                className="bg-background-paper rounded-2xl shadow-lg px-12 py-12 w-full max-w-2xl min-w-[500px] mx-auto"
            >
                <Stack className="gap-6 p-4">
                    <Stack
                        direction="row"
                        className="flex flex-row items-center gap-4"
                    >
                        <span className="text-xl font-semibold text-text-primary">
                            Tipo de Imóvel
                        </span>
                        <FormControl
                            error={errors.tipo}
                            className="min-w-[180px] w-full"
                        >
                            <InputLabel id="tipo-label" className="text-lg">
                                Tipo
                            </InputLabel>
                            <Select
                                labelId="tipo-label"
                                id="tipo"
                                name="tipo"
                                value={formData.tipo}
                                label="Tipo"
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        tipo: event.target.value,
                                    });
                                    setErrors({
                                        ...errors,
                                        tipo: false,
                                    });
                                }}
                                className="text-lg h-12"
                            >
                                <MenuItem value="">
                                    <em>Selecione</em>
                                </MenuItem>
                                <MenuItem value="apartamento">
                                    Apartamento
                                </MenuItem>
                                <MenuItem value="casa">Casa</MenuItem>
                            </Select>
                            {errors.tipo && (
                                <FormHelperText>
                                    Campo obrigatório
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Stack>
                    <Stack className="gap-4 flex" direction="row">
                        <Stack className="gap-6 w-full">
                            <TextField
                                required
                                id="cidade"
                                label="Cidade"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                error={errors.cidade}
                                helperText={
                                    errors.cidade ? "Campo obrigatório" : ""
                                }
                                placeholder="Itajubá"
                                className="text-lg h-12 w-full"
                            />
                            <TextField
                                required
                                id="bairro"
                                label="Bairro"
                                name="bairro"
                                value={formData.bairro}
                                onChange={handleChange}
                                error={errors.bairro}
                                helperText={
                                    errors.bairro ? "Campo obrigatório" : ""
                                }
                                placeholder="Centro"
                                className="text-lg h-12 w-full"
                            />
                            {formData.tipo === "apartamento" && (
                                <TextField
                                    required
                                    id="andar"
                                    label="Andar"
                                    name="andar"
                                    type="number"
                                    value={formData.andar}
                                    onChange={handleChange}
                                    error={errors.andar}
                                    helperText={
                                        errors.andar ? "Campo obrigatório" : ""
                                    }
                                    placeholder="2"
                                    className="text-lg h-12 w-full"
                                />
                            )}
                            {formData.tipo === "casa" && (
                                <TextField
                                    required
                                    id="areaQuintal"
                                    label="Área do Quintal (m²)"
                                    name="areaQuintal"
                                    type="number"
                                    value={formData.areaQuintal}
                                    onChange={handleChange}
                                    error={errors.areaQuintal}
                                    helperText={
                                        errors.areaQuintal
                                            ? "Campo obrigatório"
                                            : ""
                                    }
                                    placeholder="50"
                                    className="text-lg h-12 w-full"
                                />
                            )}
                        </Stack>
                        <Stack className="gap-6 w-full">
                            <TextField
                                required
                                id="numQuartos"
                                label="Número de Quartos"
                                name="numQuartos"
                                type="number"
                                value={formData.numQuartos}
                                onChange={handleChange}
                                error={errors.numQuartos}
                                helperText={
                                    errors.numQuartos ? "Campo obrigatório" : ""
                                }
                                placeholder="2"
                                className="text-lg h-12 w-full"
                            />
                            <TextField
                                required
                                id="area"
                                label="Área Construída (m²)"
                                name="area"
                                type="number"
                                value={formData.area}
                                onChange={handleChange}
                                error={errors.area}
                                helperText={
                                    errors.area ? "Campo obrigatório" : ""
                                }
                                placeholder="2"
                                className="text-lg h-12 w-full"
                            />
                            <TextField
                                required
                                id="valor"
                                label="Valor"
                                name="valor"
                                value={formData.valor}
                                onChange={handleValorChange}
                                error={errors.valor}
                                helperText={
                                    errors.valor
                                        ? "Informe um valor válido"
                                        : ""
                                }
                                placeholder="Ex: R$ 350.000,00"
                                className="text-lg h-12 w-full"
                            />
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        className="flex flex-row justify-center gap-4"
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleBack}
                            className="flex-1 text-lg py-3 rounded-lg min-w-[180px]"
                        >
                            Voltar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            className="flex-1 text-lg py-3 rounded-lg min-w-[180px]"
                        >
                            Cadastrar Imóvel
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
}
