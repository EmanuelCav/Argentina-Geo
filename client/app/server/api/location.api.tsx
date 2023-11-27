import axios from "axios";

import { EXPO_URL, EXPO_HOST, NODE_ENV } from '@env';

const api = axios.create({ baseURL: NODE_ENV !== 'production' ? `${EXPO_HOST}` : `${EXPO_URL}`  })

export const getCountriesApi = async () => {
    return await api.get('/paises')
}

export const getProvinciasApi = async (pais: string | undefined) => {
    return await api.get(`/provincias/${pais}`)
}

export const getMunicipiosApi = async (provincia: string | undefined) => {
    return await api.get(`/municipios/${provincia}`)
}