import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4200' })

export const usersApi = async (token: string) => {
    return await api.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
