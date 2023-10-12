import axios from 'axios'

import { ILogin, INickname, IOptions, IPassword, IPoints, ISetting } from '../../interface/User'

const api = axios.create({ baseURL: 'http://localhost:4200' })

export const usersApi = async (date: string, token: string) => {
    return await api.get(`/users/ranking/${date}`, {
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
    return await api.patch(`/users/options/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateCategoryApi = async (id: string, token: string) => {
    return await api.patch(`/users/category/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updatePasswordApi = async (id: string, userData: IPassword, token: string) => {
    return await api.put(`/users/password/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateNicknameApi = async (id: string, userData: INickname, token: string) => {
    return await api.put(`/users/nickname/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateLocationApi = async (id: string, settingsData: ISetting, token: string) => {
    return await api.put(`/users/location/${id}`, settingsData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const unlockCategoryApi = async (id: string, token: string) => {
    return await api.put(`/users/category/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateExperienceApi = async (id: string, pointsData: IPoints, token: string) => {
    return await api.put(`/users/experience/${id}`, pointsData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}