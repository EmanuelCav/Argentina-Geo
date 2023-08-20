import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4200' })

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