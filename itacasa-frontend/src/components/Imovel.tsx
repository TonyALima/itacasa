import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import type { Imovel } from "../dtos/imovel.dto";

export default function ImovelCard({ tipo, bairro, cidade, valor }: Imovel) {
    return (
        <Card elevation={2} className="hover:shadow-lg transition-shadow">
            <CardHeader
                title={`${tipo}, ${bairro}, ${cidade}`}
                slotProps={{
                    title: {
                        variant: "h6",
                        className: "font-semibold text-text-primary",
                    },
                }}
            />
            <CardContent>
                <Typography variant="body2" className="text-text-secondary">
                    {`R$ ${valor.toLocaleString()}`}
                </Typography>
            </CardContent>
        </Card>
    );
}
