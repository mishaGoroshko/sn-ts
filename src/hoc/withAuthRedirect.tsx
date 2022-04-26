import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from '../Redux/redux-store';


type MapStatePropsType = { isAuth: boolean }

const mapSateToProps = (state: AppStateType): MapStatePropsType => ({isAuth: state.auth.isAuth})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent: React.FC<MapStatePropsType> = ({isAuth, ...props}) => {

        if (!isAuth) return <Navigate to="/login"/>
        return <Component {...props as T}/>
    }
    return connect(mapSateToProps)(RedirectComponent)
}