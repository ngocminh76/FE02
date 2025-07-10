import axios from 'services/axios.customize'
export const loginAPI = (username: string, password: string) => {
    const urlBacked = "/api/v1/auth/login"
    return axios.post<IBackendRes<ILogin>>(urlBacked, { username, password }, {
        headers: {
            delay: 3000
        }
    })
}

export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBacked = "/api/v1/user/register"
    return axios.post<IBackendRes<IRegister>>(urlBacked, { fullName, email, password, phone })
}