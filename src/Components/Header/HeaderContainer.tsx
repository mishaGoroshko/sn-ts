import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {getAuthUserDataTC, logoutAuthTC} from '../../Redux/auth-reducer';

export class HeaderContainer extends React.Component<HeaderType> {

    render() {
        return <Header {...this.props}/>
    }
}

type MpaStatePropsType = {
    login: string | null
    isAuth: boolean
}
type MpaDispatchPropsType = {
    logoutAuthTC: () => void
}
export type HeaderType = MpaStatePropsType & MpaDispatchPropsType

const mapStateToProps = (state: AppStateType): MpaStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}


export const HeaderConnect = connect(mapStateToProps, { logoutAuthTC})(HeaderContainer)