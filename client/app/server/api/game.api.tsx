import axios from 'axios'
import Constants from 'expo-constants';

import { EXPO_HOST } from '@env';

const api = axios.create({ baseURL: `${EXPO_HOST}` })

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