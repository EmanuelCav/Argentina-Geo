import axios from 'axios'
import { EXPO_URL, EXPO_HOST, NODE_ENV } from '@env';

import { ILogin, INickname, IOptions, IPassword, IPoints, ISetting, IUpdateCaterories } from '../../interface/User'
import { HelpType } from '../../types/props.types';

const api = axios.create({ baseURL: NODE_ENV !== 'production' ? `${EXPO_HOST}` : `${EXPO_URL}` })

export const usersApi = async (date: string) => {
    return await api.get(`/users/ranking/${date}`)
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

export const getLoginApi = async (id: string) => {
    return await api.get(`/login/${id}`)
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

export const updateExperienceApi = async (pointsData: IPoints, token: string) => {
    return await api.put(`/users/experience`, pointsData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateAllCategoryApi = async (categoryData: IUpdateCaterories, token: string) => {
    return await api.put('/users/category', categoryData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getDateExperienceApi = async (token: string) => {
    return await api.get(`/users/experience/date`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const rankingLocationApi = async (location: string, date: string, token: string) => {
    return await api.get(`/users/location/${location}/date/${date}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const helpsApi = async (type: HelpType, token: string) => {
    return await api.put(`/users/helps/${type}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const tentsApi = async (token: string) => {
    return await api.get('/tents', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createPaymentApi = async (id: string, token: string) => {

    return await api.post(`/payments/tents/${id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

}