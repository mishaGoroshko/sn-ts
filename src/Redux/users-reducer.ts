import {v1} from 'uuid';

export type UserType = {
    id: string
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: { city: string, country: string }
}

let initialState = {
    users: [] as UserType[]
}

export type InitialStateUsersType = typeof initialState

export const UsersReducer = (state: InitialStateUsersType = initialState, action: ACTypes): InitialStateUsersType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.payload.userId ? {...el, followed: false} : el)}
        case 'UN-FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.payload.userId ? {...el, followed: true} : el)}
        case 'SET-USERS':
            return {...state, users: [ ...action.payload.users]}
        default:
            return state
    }
}

type followACType = ReturnType<typeof followAC>
type unfollowACType = ReturnType<typeof unfollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type ACTypes = followACType | unfollowACType | setUsersACType

export const followAC = (userId: string) => {
    return {
        type: 'FOLLOW',
        payload: {userId}
    } as const
}
export const unfollowAC = (userId: string) => {
    return {
        type: 'UN-FOLLOW',
        payload: {userId}
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: 'SET-USERS',
        payload: {users}
    } as const
}
