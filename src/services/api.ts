import axios from 'services/axios.customize'
export const loginAPI = (username: string, password: string) => {
    const urlBacked = "/api/v1/auth/login"
    return axios.post(urlBacked, { username, password })
}