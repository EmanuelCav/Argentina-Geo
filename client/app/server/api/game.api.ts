import axios from 'axios'

import { EXPO_URL, EXPO_HOST, NODE_ENV } from '@env';

const api = axios.create({ baseURL: NODE_ENV !== 'production' ? `${EXPO_HOST}` : `${EXPO_URL}` })

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

export const questionsCountApi = async (id: string | undefined, token: string) => {
    return await api.patch(`/questions/count/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const questionsCorrectApi = async (id: string | undefined, token: string) => {
    return await api.patch(`/questions/correct/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const generateQuestionApi = async (id: string, questionId: string, token: string) => {
    return await api.patch(`/questions/${questionId}/game/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}