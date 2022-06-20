import {Dispatch} from 'redux'
import {authAPI, securityAPI} from '../API/api';
import {AppThunk} from './redux-store';
import {stopSubmit} from 'redux-form';
import {RESULTS_CODE_CAPTCHA, RESULTS_CODE_SUCCESS} from '../constants';


const initState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

export type InitStateType = typeof initState

export const authReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
        case 'GET-CAPTCHA-URL-SUCCESS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type AuthActionsType = ReturnType<typeof setUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {id, email, login, isAuth}
    } as const
}
export const getCaptchaUrlSuccess = (captchaUrl: string) =>
    ({type: 'GET-CAPTCHA-URL-SUCCESS', payload: {captchaUrl}} as const)


export const getAuthUserDataTC = (): AppThunk => async (dispatch: Dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === RESULTS_CODE_SUCCESS) {
        let {id, email, login} = data.data
        dispatch(setUserData(id, email, login, true))
    }
}

export const loginAuthTC = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk => async dispatch => {
    const res = await authAPI.login(email, password, rememberMe, captcha)
    if (res.resultCode === RESULTS_CODE_SUCCESS) {
        dispatch(getAuthUserDataTC())
    } else {
        if (res.resultCode === RESULTS_CODE_CAPTCHA) {
            dispatch(getCaptchaTC())
        }
        let message = res.messages.length > 0 ? res.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaTC = (): AppThunk => async dispatch => {
    const data = await securityAPI.getCaptcha()
    dispatch(getCaptchaUrlSuccess(data.url))
}

export const logoutAuthTC = (): AppThunk => async dispatch => {
    const res = await authAPI.logout()
    res.resultCode === 0 && dispatch(setUserData(null, null, null, false))
}