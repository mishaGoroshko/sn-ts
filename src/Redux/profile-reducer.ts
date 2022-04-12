import {v1} from 'uuid';

type PostType = {
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
    'userId': number
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
    messageForNewPost: 'XY',
    posts: [
        {id: v1(), message: 'Hi my first message ', likeCounting: 12},
        {id: v1(), message: 'Hello it\'s me ', likeCounting: 23},
    ] as Array<PostType>,
    userProfile: user2 ,
}

export type initialStateProfileType = {
    messageForNewPost: string
    posts: Array<PostType>
    userProfile: UserProfile
}

export const profileReducer = (state: initialStateProfileType = initialState, action: ActionTypes): initialStateProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            if (state.messageForNewPost.trim()) {
                return {
                    ...state, messageForNewPost: '',
                    posts: [...state.posts, {id: v1(), message: state.messageForNewPost.trim(), likeCounting: 0}]
                }
            } else return {...state, messageForNewPost: ''}
        case 'ONCHANGE-TEXT-AREA':
            return {...state, messageForNewPost: action.newText};
        case 'SET-USER-PROFILE':
            return {...state, userProfile: action.payload.userProfile}
        default:
            return state
    }
}

type ActionTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof onchangeTextareaHandlerAC>
    | ReturnType<typeof setUserProfile>

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const onchangeTextareaHandlerAC = (newText: string) => {
    return {
        type: 'ONCHANGE-TEXT-AREA',
        newText: newText
    } as const
}

export const setUserProfile = (userProfile: UserProfile) => {
    return {
        type: 'SET-USER-PROFILE',
        payload: {userProfile}
    } as const
}