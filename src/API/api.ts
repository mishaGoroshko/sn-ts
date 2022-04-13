import axios, {AxiosResponse} from 'axios';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd7f83afa-8c04-4518-b416-2095e558276e'}
})
const responseData = (response:AxiosResponse<any, any>) => response.data

export const userIPI = {
    getUsers: (currentPage: number, pageSize: number) =>
        instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responseData)
}

export const followIPI = {
    postFollow: (id: string) => instance.post(`follow/${id}`).then(responseData),
    deleteFollow: (id: string) => instance.delete(`follow/${id}`).then(responseData)
}

export const authIPS = {
    getAuth: () => instance.get(`auth/me`).then(responseData)
}