import {v1} from 'uuid';

export type UserType = {
    name: string
    id: string
    uniqueUrlName: string
    photos: {
        small: string
        large: string
    },
    followed: boolean
    status: string
    location: { city: string, country: string }
}

let initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalCountUsers: 0,
    currentPage: 1
}

export type InitialStateUsersType = typeof initialState

export const UsersReducer = (state: InitialStateUsersType = initialState, action: ACTypes): InitialStateUsersType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.userId ? {...el, followed: false} : el)
            }
        case 'UN-FOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.userId ? {...el, followed: true} : el)
            }
        case 'SET-USERS':
            return {...state, users: [...action.payload.users]}
        case 'SET-PAGE-NUMBER':
            return {...state, currentPage: action.payload.currentPage}
        case 'SET-TOTAL-COUNT':
            return {...state, totalCountUsers: action.payload.totalCount}
        default:
            return state
    }
}

type followACType = ReturnType<typeof followAC>
type unfollowACType = ReturnType<typeof unfollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type setCurrentPageACACType = ReturnType<typeof setCurrentPageAC>
type setTotalCountACType = ReturnType<typeof setTotalCountAC>
type ACTypes = followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACACType
    | setTotalCountACType

export const followAC = (userId: string) => {
    return {
        type: 'FOLLOW',
        payload: {userId},
    } as const
}
export const unfollowAC = (userId: string) => {
    return {
        type: 'UN-FOLLOW',
        payload: {userId},
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: 'SET-USERS',
        payload: {users},
    } as const
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-PAGE-NUMBER',
        payload: {currentPage},
    } as const
}

export const setTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-COUNT',
        payload: {totalCount}
    } as const
}
