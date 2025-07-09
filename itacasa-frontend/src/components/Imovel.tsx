import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import type { Imovel } from "../dtos/imovel.dto";
import { Delete, Edit } from "@mui/icons-material";
import { useModal } from "../hooks/useModal";
import EditImovelDialog from "./EditImovelDialog";
import { useImoveis } from "../hooks/useImoveis";
import DeleteImovelDialog from "./DeleteImovelDialog";

interface ImovelCardProps {
    imovel: Imovel;
}
export default function ImovelCard({ imovel }: ImovelCardProps) {
    const { updateImovel, deleteImovel } = useImoveis({
        userId: imovel.proprietarioId,
    });
    const { setModal, modalComponent } = useModal();

    const handleEdit = () => {
        setModal(EditImovelDialog, {
            imovelParaEditar: imovel,
            onSubmit: (id: string, payload: Partial<Imovel>) => {
                updateImovel(id, payload);
            },
        });
    };

    const handleDelete = () => {
        setModal(DeleteImovelDialog, {
            imovel,
            onConfirm: (id: string) => {
                deleteImovel(id);
            },
        });
    };

    return (
        <>
            <Card elevation={2} className="hover:shadow-lg transition-shadow">
                <CardHeader
                    title={`${imovel.tipo}, ${imovel.bairro}, ${imovel.cidade}`}
                    action={
                        <Box>
                            <IconButton onClick={handleEdit}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        </Box>
                    }
                />
                <CardContent>
                    <Typography variant="body2" className="text-text-secondary">
                        {`R$ ${imovel.valor.toLocaleString()}`}
                    </Typography>
                </CardContent>
            </Card>
            {modalComponent}
        </>
    );
}
