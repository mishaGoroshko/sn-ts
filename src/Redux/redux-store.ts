import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import {DialogActionsType, dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {UsersActionsType, UsersReducer} from './users-reducer';
import {AuthActionsType, authReducer} from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {FormAction} from 'redux-form/lib/actions';
import {AppActionsType, appReducer} from './app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type ProjectActionsType = AuthActionsType
    | ProfileActionsType
    | DialogActionsType
    | UsersActionsType
    | FormAction
    | AppActionsType
// | SidebarActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    ProjectActionsType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
