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


export const fetchAccountAPI = () => {
    const urlBacked = "/api/v1/auth/account"
    return axios.get<IBackendRes<IFetchAccount>>(urlBacked, {
        headers: {
            delay: 1000
        }
    })
}

export const logoutAPI = () => {
    const urlBacked = "/api/v1/auth/logout"
    return axios.post<IBackendRes<IFetchAccount>>(urlBacked)
}


// export const getUsersAPI = (current: number, pageSize: number) => {
//     const urlBacked = `/api/v1/user?current=${current}&pageSize=${pageSize}`
//     return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBacked)
// }

export const getUsersAPI = (query: string) => {
    const urlBacked = `/api/v1/user?${query}`
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBacked)
}
export const createUsersAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBacked = "/api/v1/user"
    return axios.post<IBackendRes<IRegister>>(urlBacked, {
        fullName, email, password, phone
    })
}


export const bulkCreateUserAPI = (data: {
    fullName: string;
    password: string;
    email: string;
    phone: string
}[]) => {
    const urlBacked = "/api/v1/user/bulk-create"
    return axios.post<IBackendRes<IResponseImport>>(urlBacked, data)
}

export const updateUserAPI = (_id: string, fullName: string, phone: string) => {
    const urlBacked = "/api/v1/user"
    return axios.put<IBackendRes<IResponseImport>>(urlBacked, { _id, fullName, phone })
}