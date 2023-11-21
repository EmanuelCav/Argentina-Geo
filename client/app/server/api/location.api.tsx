import axios from "axios";

import { EXPO_HOST } from '@env';

const api = axios.create({ baseURL: `${EXPO_HOST}` })

export const getCountriesApi = async () => {
    return await api.get('/paises')
}

export const getProvinciasApi = async (pais: string | undefined) => {
    return await api.get(`/provincias/${pais}`)
}

export const getMunicipiosApi = async (provincia: string | undefined) => {
    return await api.get(`/municipios/${provincia}`)
}