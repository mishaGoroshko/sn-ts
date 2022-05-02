import axios from 'axios';
import {UserProfile} from '../Redux/profile-reducer';
import {UserType} from '../Redux/users-reducer';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd7f83afa-8c04-4518-b416-2095e558276e'}
})
//@ts-ignore
const resData = res => res.data

type userAPIType = {
    items: UserType[]
    'totalCount': number
    'error': string
}
type followAPIType = {
    resultCode: number
    messages: Array<string>
    data: object
}
type authAPIType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => instance
        .get<userAPIType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data),

    postFollow: (id: string) => instance
        .post<followAPIType>(`follow/${id}`)
        .then(res => res.data),

    deleteFollow: (id: string) => instance
        .delete<followAPIType>(`follow/${id}`)
        .then(res => res.data),

    getUserForProfile: (userID: number) => instance
        .get<UserProfile>(`profile/${userID}`)
        .then(res => res.data),

}

export const authAPI = {
    getAuth: () => instance
        .get<authAPIType>(`auth/me`)
        .then(res => res.data),
}

