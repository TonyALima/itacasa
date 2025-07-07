import { z } from "zod";

const tipoImovelEnumSchema = z.enum([
    "CASA",
    "APARTAMENTO",
]);

export const imovelSchema = z.object({
    id: z.string().cuid(),
    cidade: z.string().nullable().optional(),
    bairro: z.string().nullable().optional(),
    valor: z.number().int(),
    areaConstruida: z.number(),
    numQuartos: z.number().int(),
    tipo: tipoImovelEnumSchema,
    proprietarioId: z.string(),
    tamanhoQuintal: z.number().optional(),
    andar: z.number().int().optional(),
});

export type Imovel = z.infer<typeof imovelSchema>;
export type TipoImovelEnum = z.infer<typeof tipoImovelEnumSchema>;
