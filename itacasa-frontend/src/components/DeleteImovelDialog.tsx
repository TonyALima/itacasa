import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import type { Imovel } from "../dtos/imovel.dto";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    imovel: Imovel | null;
}

export default function DeleteImovelDialog({
    open,
    onClose,
    onConfirm,
    imovel,
}: Props) {
    const handleConfirm = () => {
        if (imovel) {
            onConfirm(imovel.id);
        }
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    // Formatar valor para exibição
    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    // Formatar tipo do imóvel
    const formatTipo = (tipo: string) => {
        return tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    className: "rounded-2xl",
                },
            }}
        >
            <DialogTitle className="text-xl font-semibold text-text-primary px-6 py-4">
                <Box display="flex" alignItems="center" gap={2}>
                    <WarningAmber color="warning" fontSize="large" />
                    Confirmar Exclusão
                </Box>
            </DialogTitle>

            <DialogContent className="px-6 py-4">
                <Typography variant="body1" className="text-text-primary mb-4">
                    Tem certeza que deseja excluir este imóvel? Esta ação não
                    pode ser desfeita.
                </Typography>

                {imovel && (
                    <Box
                        className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400"
                        sx={{ backgroundColor: "background.paper" }}
                    >
                        <Typography
                            variant="h6"
                            className="font-semibold text-text-primary mb-2"
                        >
                            {formatTipo(imovel.tipo)} -{" "}
                            {formatCurrency(imovel.valor)}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="text-text-secondary mb-1"
                        >
                            <strong>Localização:</strong> {imovel.cidade},{" "}
                            {imovel.bairro}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="text-text-secondary mb-1"
                        >
                            <strong>Quartos:</strong> {imovel.numQuartos}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="text-text-secondary mb-1"
                        >
                            <strong>Área Construída:</strong>{" "}
                            {imovel.areaConstruida} m²
                        </Typography>

                        {imovel.tipo === "APARTAMENTO" && imovel.andar && (
                            <Typography
                                variant="body2"
                                className="text-text-secondary mb-1"
                            >
                                <strong>Andar:</strong> {imovel.andar}º
                            </Typography>
                        )}

                        {imovel.tipo === "CASA" && imovel.tamanhoQuintal && (
                            <Typography
                                variant="body2"
                                className="text-text-secondary mb-1"
                            >
                                <strong>Área do Quintal:</strong>{" "}
                                {imovel.tamanhoQuintal} m²
                            </Typography>
                        )}
                    </Box>
                )}
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
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    className="min-w-[100px]"
                >
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
}
