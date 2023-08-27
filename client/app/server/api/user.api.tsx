import axios from 'axios'

import { ILogin } from '../../interface/User'

const api = axios.create({ baseURL: 'http://localhost:4200' })

export const usersApi = async (token: string) => {
    return await api.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const userApi = async (id: string, token: string) => {
    return await api.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const loginApi = async (userData: ILogin) => {
    return await api.post('/users/login', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const firstTimeApi = async () => {
    return await api.post('/users/first')
}