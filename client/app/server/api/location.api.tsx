import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:4200' })

export const getCountriesApi = async () => {
    return await api.get('/paises')
}

export const getProvinciasApi = async (pais: string | undefined) => {
    return await api.get(`/provincias/${pais}`)
}

export const getMunicipiosApi = async (provincia: string | undefined) => {
    return await api.get(`/municipios/${provincia}`)
}