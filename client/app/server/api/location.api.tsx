import axios from "axios";
import Constants from 'expo-constants';

const api = axios.create({ baseURL: `${Constants?.manifest?.extra?.host}` })

export const getCountriesApi = async () => {
    return await api.get('/paises')
}

export const getProvinciasApi = async (pais: string | undefined) => {
    return await api.get(`/provincias/${pais}`)
}

export const getMunicipiosApi = async (provincia: string | undefined) => {
    return await api.get(`/municipios/${provincia}`)
}