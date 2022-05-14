import {Dispatch} from 'redux'
import {authAPI} from '../API/api';
import {AppThunk} from './redux-store';
import {stopSubmit} from 'redux-form';
import {getAuthUserDataTC} from './auth-reducer';

export type InitStateType = {
    initialized: boolean
}

const initState: InitStateType = {
    initialized: false,
}

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}

export type AppActionsType = ReturnType<typeof initializedSuccess>

export const initializedSuccess = () =>
    ({type: 'INITIALIZED-SUCCESS',} as const)


export const initializedApp = (): AppThunk => (dispatch) => {
    dispatch(getAuthUserDataTC())
        .then(res => dispatch(initializedSuccess()))


}

