import {Dispatch} from 'redux'
import {authAPI} from '../API/api';
import {AppThunk} from './redux-store';
import {stopSubmit} from 'redux-form';
import {getAuthUserDataTC} from './auth-reducer';
import {EMPTY_STRING} from '../constants';
import {AxiosError} from 'axios';


const initState = {
    initialized: false,
    error: EMPTY_STRING,
}
export type InitStateType = typeof initState

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state, initialized: true}
        case 'SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type AppActionsType = InitializedSuccessAC
    | ReturnType<typeof setError>

export type  InitializedSuccessAC = ReturnType<typeof initializedSuccess>


export const initializedSuccess = () =>
    ({type: 'INITIALIZED-SUCCESS',} as const)

export const setError = (error: string) =>
    ({type: 'SET-ERROR', payload: {error},} as const);

export const initializedApp = (): AppThunk => async (dispatch) => {
    try {
        let res = await dispatch(getAuthUserDataTC())
        dispatch(initializedSuccess())
    } catch (e) {
        dispatch(setError((e as AxiosError).message))
    }

}

