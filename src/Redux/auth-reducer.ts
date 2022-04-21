import {Dispatch} from 'redux'
import {authAPI} from '../API/api';

export type InitStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initState: InitStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: InitStateType = initState, action: SetUserDataType): InitStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.payload.data, isAuth: true}
        default:
            return state
    }
}

type SetUserDataType = ReturnType<typeof setUserData>

export const setUserData = (id: number | null, email: string | null, login: string | null) => {
    return {
        type: 'SET-USER-DATA',
        payload: {
            data: {id, email, login}
        }
    } as const
}

export const getUserDataTC= () => (dispatch: Dispatch) => {
    authAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserData(id, email, login))
            }
        })
}