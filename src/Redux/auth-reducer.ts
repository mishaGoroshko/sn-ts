import {Dispatch} from 'redux'
import {authAPI} from '../API/api';
import {AppThunk} from './redux-store';
import {stopSubmit} from 'redux-form';
import {initializedSuccess} from './app-reducer';

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

export const authReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type AuthActionsType = ReturnType<typeof setUserData>

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {id, email, login, isAuth}
    } as const
}


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserData(id, email, login, true))
            }
        })
}

export const loginAuthTC = (email: string, password: string, rememberMe: boolean): AppThunk => async dispatch => {
    const res = await authAPI.login(email, password, rememberMe)
    if (res.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        let message = res.messages.length > 0 ? res.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}


export const logoutAuthTC = (): AppThunk => async dispatch => {
    const res = await authAPI.logout()
    res.resultCode === 0 && dispatch(setUserData(null, null, null, false))
}