import useSWR, { type SWRResponse } from "swr";
import axios from "../api/axios";
import { type Imovel, type ImovelPayload } from "../dtos/imovel.dto";
import { HttpStatusCode } from "axios";

const fetcherList = async (url: string): Promise<Imovel[]> => {
    const response = await axios.get<Imovel[]>(url);
    return response.data;
};

const baseUrl = "/imovel";

interface useImoveisProps {
    userId?: string;
}

export function useImoveis({ userId }: useImoveisProps): {
    imoveis: SWRResponse<Imovel[]>;
    updateImovel: (
        id: string,
        payload: Partial<Imovel>
    ) => Promise<HttpStatusCode>;
    deleteImovel: (id: string) => Promise<HttpStatusCode>;
    createImovel: (payload: ImovelPayload) => Promise<HttpStatusCode>;
} {
    const imoveis = useSWR<Imovel[]>(
        userId ? `${baseUrl}/proprietario/${userId}` : null,
        fetcherList,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    const updateImovel = async (id: string, payload: Partial<Imovel>) => {
        const response = await axios.patch<Imovel>(`${baseUrl}/${id}`, payload);
        imoveis.mutate(undefined, { revalidate: true });
        return response.status;
    };

    const deleteImovel = async (id: string) => {
        const response = await axios.delete(`${baseUrl}/${id}`);
        imoveis.mutate(undefined, { revalidate: true });
        return response.status;
    };

    const createImovel = async (payload: ImovelPayload) => {
        if (!userId) {
            return HttpStatusCode.BadRequest;
        }
        const response = await axios.post<Imovel>(
            `${baseUrl}/user/${userId}`,
            payload
        );
        imoveis.mutate(undefined, { revalidate: true });
        return response.status;
    };

    return {
        imoveis,
        updateImovel,
        deleteImovel,
        createImovel,
    };
}
