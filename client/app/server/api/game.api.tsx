import axios from 'axios'

import { EXPO_URL, EXPO_HOST, NODE_ENV } from '@env';

const api = axios.create({ baseURL: NODE_ENV !== 'production' ? `${EXPO_HOST}` : `${EXPO_URL}`  })

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