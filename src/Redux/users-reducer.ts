import {v1} from 'uuid';
import {userAPI, UsersQueryParams} from '../API/api';
import {Dispatch} from 'redux';
import {AppStateType, AppThunk} from './redux-store';
import {createSelector} from 'reselect';
import {updateObjectInArray} from '../helpers/updateObjectInArray';

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
    followArrayId: [] as Array<string>,
    termSearchFilter: '',
    friendFollowFilter: null as null | boolean,
}

export type InitialStateUsersType = typeof initialState

export const UsersReducer = (state: InitialStateUsersType = initialState, action: UsersActionsType): InitialStateUsersType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId,
                    'id', {followed: true})
            }
        case 'UN-FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId,
                    'id', {followed: false})
            }
        case 'SET-USERS':
            return {...state, users: [...action.payload.users]}
        case 'SET-PAGE-NUMBER':
            return {...state, currentPage: action.payload.currentPage}
        case 'SET-TOTAL-COUNT':
            return {...state, totalCountUsers: action.payload.totalCount}
        case 'SET-PRELOADER':
            return {...state, isFetching: action.payload.isFetching}
        case 'SET-TERN-SEARCH-FILTER':
        case 'SET-FRIEND-FOLLOW-FILTER':
            return {...state, ...action.payload}
        case 'TOGGLE-DISABLED':
            return {
                ...state, followArrayId: action.payload.isDisabled
                    ? [...state.followArrayId, action.payload.userId]
                    : state.followArrayId.filter(el => el !== action.payload.userId)
            }
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
type toggleDisabledACType = ReturnType<typeof toggleDisabled>
export type UsersActionsType = followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACACType
    | setTotalCountACType
    | setPreloaderACType
    | toggleDisabledACType
    | ReturnType<typeof setTernSearchFilter>
    | ReturnType<typeof setFriendFollowFilter>

export const follow = (userId: string) =>
    ({type: 'FOLLOW', payload: {userId},} as const)
export const unfollow = (userId: string) =>
    ({type: 'UN-FOLLOW', payload: {userId},} as const)
export const setUsers = (users: Array<UserType>) => ({
    type: 'SET-USERS',
    payload: {users},
} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: 'SET-PAGE-NUMBER',
    payload: {currentPage},
} as const)
export const setTotalCount = (totalCount: number) => ({
    type: 'SET-TOTAL-COUNT',
    payload: {totalCount},
} as const)
export const setPreloader = (isFetching: boolean) => ({
    type: 'SET-PRELOADER',
    payload: {isFetching},
} as const)
export const toggleDisabled = (userId: string, isDisabled: boolean) =>
    ({type: 'TOGGLE-DISABLED', payload: {userId, isDisabled}} as const)
export const setTernSearchFilter = (termSearchFilter: string, ) =>
    ({type: 'SET-TERN-SEARCH-FILTER', payload: {termSearchFilter}} as const)
export const setFriendFollowFilter = (friendFollowFilter: boolean | null, ) =>
    ({type: 'SET-FRIEND-FOLLOW-FILTER', payload: {friendFollowFilter}} as const)

export const getUsersTC = (payload: UsersQueryParams): AppThunk => async dispatch => {
    dispatch(setPreloader(true))
    dispatch(setCurrentPage(payload.page))

    let data = await userAPI.getUsers(payload)

    dispatch(setPreloader(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
}


const followUnfollowFlow = async (dispatch: Dispatch, userId: string, apiMethod: any, actionCreater: (userId: string) => followACType | unfollowACType) => {
    dispatch(toggleDisabled(userId, true))

    let data = await apiMethod(userId)

    dispatch(toggleDisabled(userId, false))
    data.resultCode === 0 && dispatch(actionCreater(userId))
}

export const postFollowTC = (userId: string): AppThunk => dispatch =>
    followUnfollowFlow(dispatch, userId, userAPI.postFollow, follow)


export const deleteFollowTC = (userId: string): AppThunk => dispatch =>
    followUnfollowFlow(dispatch, userId, userAPI.deleteFollow, unfollow)


//selectors
export const getUsers = (state: AppStateType): Array<UserType> => state.usersPage.users
// export const selectUsersWithFilter = (state: AppStateType): Array<UserType> =>
//     state.usersPage.users.filter(u => true)

//reselect---------------------------------------------------
export const reselectUsers = createSelector(getUsers, (users) => users.filter(u => true))
//------------------------------------------------------------

export const getPageSize = (state: AppStateType): number => state.usersPage.pageSize

//selectors
export const getTotalCountUsers = (state: AppStateType): number => state.usersPage.totalCountUsers
export const getCurrentPage = (state: AppStateType): number => state.usersPage.currentPage
export const getIsFetching = (state: AppStateType): boolean => state.usersPage.isFetching
export const getFollowArrayId = (state: AppStateType): Array<string> => state.usersPage.followArrayId
export const selectTermSearchFilter = (state: AppStateType): string => state.usersPage.termSearchFilter
export const selectFriendFollowFilter = (state: AppStateType): null | boolean => state.usersPage.friendFollowFilter

