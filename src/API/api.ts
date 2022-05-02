import axios from 'axios';
import {UserProfile} from '../Redux/profile-reducer';
import {UserType} from '../Redux/users-reducer';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'f3f54432-d8c8-49d7-98bb-7ebfd06f7be2'}
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
    data: {}
}
type authAPIType = {
    fieldsErrors: []
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

type responseAPIType<D = {}> = {
    fieldsErrors: any[]
    resultCode: number
    messages: Array<string>
    data: D
}


export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => instance
        .get<userAPIType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data),

    postFollow: (id: string) => instance
        .post<responseAPIType>(`follow/${id}`)
        .then(res => res.data),

    deleteFollow: (id: string) => instance
        .delete<responseAPIType>(`follow/${id}`)
        .then(res => res.data),

    getUserForProfile: (userID: number) => {
        console.warn('Obsolete method, you must replace your APIs')
        return profileAPI.getProfile(userID)
    },
}

export const profileAPI = {
    getProfile: (userID: number) => instance
        .get<UserProfile>(`profile/${userID}`)
        .then(res => res.data),

    getStatus: (userID: number) => instance
        .get<string>(`profile/status/${userID}`)
        .then(res => res.data),

    updateStatus: (status: string) => instance
        .put<responseAPIType>(`profile/status`, {status})
        .then(res => res.data),
}

export const authAPI = {
    getAuth: () => instance
        .get<responseAPIType<{ id: number, email: string, login: string }>>(`auth/me`)
        .then(res => res.data),
}

