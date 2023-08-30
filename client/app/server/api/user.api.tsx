import axios from 'axios'

import { ILogin, IOptions } from '../../interface/User'

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

export const updateOptionsApi = async (id: string, userData: IOptions, token: string) => {
    return await api.put(`/users/options/${id}`, {
        amountQuestions: parseInt(userData.amountQuestions),
        amountOptions: parseInt(userData.amountOptions)
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}