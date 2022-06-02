import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {profileAPI, userAPI} from '../API/api';
import {initializedSuccess, InitializedSuccessAC} from './app-reducer';

export type PostType = {
    id: string
    message: string
    likeCounting: number
}

export type UserProfile = {
    'aboutMe': string
    'contacts': {
        'facebook': string | null
        'website': string | null
        'vk': string | null
        'twitter': string | null
        'instagram': string | null
        'youtube': string | null
        'github': string | null
        'mainLink': string | null
    },
    'lookingForAJob': boolean,
    'lookingForAJobDescription': string
    'fullName': string
    'userId': number | null
    'photos': {
        'small': string | undefined
        'large': string | undefined
    }
}

const user2 = {
    'aboutMe': 'я круто чувак 1001%',
    'contacts': {
        'facebook': 'facebook.com',
        'website': null,
        'vk': 'vk.com/dimych',
        'twitter': 'https://twitter.com/@sdf',
        'instagram': 'instagra.com/sds',
        'youtube': null,
        'github': 'github.com',
        'mainLink': null
    },
    'lookingForAJob': true,
    'lookingForAJobDescription': 'не ищу, а дурачусь',
    'fullName': 'samurai dimych',
    'userId': 2,
    'photos': {
        'small': 'https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0',
        'large': 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0'
    }
}

const initialState = {
    posts: [
        {id: v1(), message: 'Hi my first message ', likeCounting: 12},
        {id: v1(), message: 'Hello it\'s me ', likeCounting: 23},
    ] as Array<PostType>,
    userProfile: user2,
    status: '',
    initialized: false
}

export type initialStateProfileType = {
    posts: Array<PostType>
    userProfile: UserProfile
    status: string
    initialized: boolean
}

export const profileReducer = (state: initialStateProfileType = initialState, action: ProfileActionsType): initialStateProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            return {...state,
                posts: [...state.posts, {
                    id: v1(),
                    message: action.payload.newPost,
                    likeCounting: 0
                }]
            }
        case 'SET-USER-PROFILE':
            return {...state, userProfile: action.payload.userProfile}
        case 'SET-STATUS':
            return {...state, status: action.payload.status}
        case 'INITIALIZED-PROFILE':
            return {...state, initialized: true}
        case 'DELETE-POST':
            return {...state, posts: state.posts
                    .filter(p => p.id !== action.payload.id)}
        default:
            return state
    }
}

export type ProfileActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof initializedProfile>
    | ReturnType<typeof deletePostAC>

// action
export const addPostAC = (newPost: string) =>
    ({type: 'ADD-POST', payload: {newPost}} as const)
export const deletePostAC = (id: string) =>
    ({type: 'DELETE-POST', payload: {id}} as const)
export const setUserProfile = (userProfile: UserProfile) =>
    ({type: 'SET-USER-PROFILE', payload: {userProfile}} as const)
export const setStatus = (status: string) =>
    ({type: 'SET-STATUS', payload: {status}} as const)
export const initializedProfile = () =>
    ({type: 'INITIALIZED-PROFILE',} as const)

// thunk
export const getUserProfileTC = (userID: number) => (dispatch: Dispatch) =>
    userAPI.getUserForProfile(userID)
        .then(data => {
            dispatch(setUserProfile(data))
            dispatch(initializedProfile())
        })

export const getStatusTC = (userID: number) => (dispatch: Dispatch) =>
    profileAPI.getStatus(userID)
        .then(data => dispatch(setStatus(data)))

export const updateStatusTC = (status: string) => (dispatch: Dispatch) =>
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
