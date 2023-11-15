import axios from 'axios'
import Constants from 'expo-constants';

const api = axios.create({ baseURL: `${Constants?.manifest?.extra?.host}` })

export const gamesApi = async (token: string) => {
    return await api.get('/games', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createGameApi = async (token: string) => {
    return await api.post('/games', null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const questionsCountApi = async (id: string, token: string) => {
    return await api.patch(`/questions/count/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const questionsCorrectApi = async (id: string, idGame: string, token: string) => {
    return await api.patch(`/questions/correct/${id}/${idGame}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}