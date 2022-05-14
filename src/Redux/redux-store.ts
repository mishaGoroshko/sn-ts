import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import {DialogActionsType, dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {UsersActionsType, UsersReducer} from './users-reducer';
import {AuthActionsType, authReducer} from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {FormAction} from 'redux-form/lib/actions';
import {AppActionsType, appReducer} from './app-reducer';

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

export let store = createStore(rootReducer, applyMiddleware(thunk))

