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
    currentPage: 1,
    isFetching: false,
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
        case 'SET-PRELOADER':
            return {...state, isFetching: action.payload.isFetching}
        default:
            return state
    }
}

type followACType = ReturnType<typeof follow>
type unfollowACType = ReturnType<typeof unfollow>
type setUsersACType = ReturnType<typeof setUsers>
type setCurrentPageACACType = ReturnType<typeof setCurrentPage>
type setTotalCountACType = ReturnType<typeof setTotalCount>
type setPreloaderACType = ReturnType<typeof setPreloader>
type ACTypes = followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACACType
    | setTotalCountACType
    | setPreloaderACType

export const follow = (userId: string) => {
    return {
        type: 'FOLLOW',
        payload: {userId},
    } as const
}
export const unfollow = (userId: string) => {
    return {
        type: 'UN-FOLLOW',
        payload: {userId},
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'SET-USERS',
        payload: {users},
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-PAGE-NUMBER',
        payload: {currentPage},
    } as const
}

export const setTotalCount = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-COUNT',
        payload: {totalCount}
    } as const
}
export const setPreloader = (isFetching: boolean) => {
    return {
        type: 'SET-PRELOADER',
        payload: {isFetching}
    } as const
}
