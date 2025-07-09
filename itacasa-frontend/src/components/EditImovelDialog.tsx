import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Imovel } from "../dtos/imovel.dto";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (id: string, payload: Partial<Imovel>) => void;
    imovelParaEditar: Imovel;
}

export default function EditImovelDialog({
    open,
    onClose,
    onSubmit,
    imovelParaEditar,
}: Props) {
    const [formData, setFormData] = useState({
        tipo: "",
        cidade: "",
        bairro: "",
        andar: "",
        numQuartos: "",
        areaConstruida: "",
        valor: "",
        tamanhoQuintal: "",
    });

    const [errors, setErrors] = useState({
        tipo: false,
        cidade: false,
        bairro: false,
        andar: false,
        numQuartos: false,
        areaConstruida: false,
        valor: false,
        tamanhoQuintal: false,
    });

    // Preenche o formulário quando o dialog abre com dados para edição
    useEffect(() => {
        if (open && imovelParaEditar) {
            setFormData({
                tipo: imovelParaEditar.tipo.toLowerCase(),
                cidade: imovelParaEditar.cidade || "",
                bairro: imovelParaEditar.bairro || "",
                andar: imovelParaEditar.andar?.toString() || "",
                numQuartos: imovelParaEditar.numQuartos.toString(),
                areaConstruida: imovelParaEditar.areaConstruida.toString(),
                valor: formatCurrency(
                    (imovelParaEditar.valor * 100).toString()
                ),
                tamanhoQuintal:
                    imovelParaEditar.tamanhoQuintal?.toString() || "",
            });
        } else if (open && !imovelParaEditar) {
            // Limpa o formulário para novo imóvel
            setFormData({
                tipo: "",
                cidade: "",
                bairro: "",
                andar: "",
                numQuartos: "",
                areaConstruida: "",
                valor: "",
                tamanhoQuintal: "",
            });
        }
        // Limpa os erros quando o dialog abre
        setErrors({
            tipo: false,
            cidade: false,
            bairro: false,
            andar: false,
            numQuartos: false,
            areaConstruida: false,
            valor: false,
            tamanhoQuintal: false,
        });
    }, [open, imovelParaEditar]);

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

    // Validação do formulário
    const validate = () => {
        const valorNumber = Number(formData.valor.replace(/\D/g, "")) / 100;
        const isApartamento = formData.tipo === "apartamento";
        const isCasa = formData.tipo === "casa";

        const newErrors = {
            tipo: formData.tipo === "",
            cidade: formData.cidade.trim() === "",
            bairro: formData.bairro.trim() === "",
            andar: isApartamento ? formData.andar === "" : false,
            tamanhoQuintal: isCasa ? formData.tamanhoQuintal === "" : false,
            numQuartos: formData.numQuartos === "",
            areaConstruida: formData.areaConstruida === "",
            valor: formData.valor === "" || valorNumber <= 0,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        // Converte os dados do formulário para o formato esperado pela API
        const valorNumber = Number(formData.valor.replace(/\D/g, "")) / 100;

        const imovelData: Partial<Imovel> = {
            tipo: formData.tipo.toUpperCase() as "CASA" | "APARTAMENTO",
            cidade: formData.cidade || null,
            bairro: formData.bairro || null,
            numQuartos: Number(formData.numQuartos),
            areaConstruida: Number(formData.areaConstruida),
            valor: valorNumber,
        };

        // Adiciona campos condicionais
        if (formData.tipo === "apartamento" && formData.andar) {
            imovelData.andar = Number(formData.andar);
        }

        if (formData.tipo === "casa" && formData.tamanhoQuintal) {
            imovelData.tamanhoQuintal = Number(formData.tamanhoQuintal);
        }

        const id = imovelParaEditar.id;

        onSubmit(id, imovelData);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className: "rounded-2xl",
                },
            }}
        >
            <DialogTitle className="text-xl font-semibold text-text-primary px-6 py-4">
                {imovelParaEditar ? "Editar Imóvel" : "Novo Imóvel"}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent className="px-6 py-4">
                    <Stack spacing={3}>
                        {/* Tipo de Imóvel */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <span className="text-lg font-medium text-text-primary min-w-[140px]">
                                Tipo de Imóvel
                            </span>
                            <FormControl error={errors.tipo} className="flex-1">
                                <InputLabel id="tipo-label">Tipo</InputLabel>
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
                                    size="small"
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

                        {/* Primeira linha: Cidade e Bairro */}
                        <Stack direction="row" spacing={2}>
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
                                size="small"
                                className="flex-1"
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
                                size="small"
                                className="flex-1"
                            />
                        </Stack>

                        {/* Segunda linha: Quartos e Área */}
                        <Stack direction="row" spacing={2}>
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
                                size="small"
                                className="flex-1"
                            />
                            <TextField
                                required
                                id="areaConstruida"
                                label="Área Construída (m²)"
                                name="areaConstruida"
                                type="number"
                                value={formData.areaConstruida}
                                onChange={handleChange}
                                error={errors.areaConstruida}
                                helperText={
                                    errors.areaConstruida
                                        ? "Campo obrigatório"
                                        : ""
                                }
                                placeholder="80"
                                size="small"
                                className="flex-1"
                            />
                        </Stack>

                        {/* Terceira linha: Valor e campos condicionais */}
                        <Stack direction="row" spacing={2}>
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
                                size="small"
                                className="flex-1"
                            />

                            {/* Campo condicional para Apartamento */}
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
                                    size="small"
                                    className="flex-1"
                                />
                            )}

                            {/* Campo condicional para Casa */}
                            {formData.tipo === "casa" && (
                                <TextField
                                    required
                                    id="tamanhoQuintal"
                                    label="Área do Quintal (m²)"
                                    name="tamanhoQuintal"
                                    type="number"
                                    value={formData.tamanhoQuintal}
                                    onChange={handleChange}
                                    error={errors.tamanhoQuintal}
                                    helperText={
                                        errors.tamanhoQuintal
                                            ? "Campo obrigatório"
                                            : ""
                                    }
                                    placeholder="50"
                                    size="small"
                                    className="flex-1"
                                />
                            )}
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions className="px-6 py-4">
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        className="min-w-[100px]"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        className="min-w-[100px]"
                    >
                        {imovelParaEditar ? "Salvar" : "Cadastrar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
