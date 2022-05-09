import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {getAuthUserDataTC, logoutAuthTC} from '../../Redux/auth-reducer';

export class HeaderContainer extends React.Component<HeaderType> {
    componentDidMount() {
        this.props.getUserDataTC()
    }

    render() {
        return <Header {...this.props}/>
    }
}

type MpaStatePropsType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type MpaDispatchPropsType = {
    getUserDataTC: () => void
    logoutAuthTC: () => void
}
export type HeaderType = MpaStatePropsType & MpaDispatchPropsType

const mapStateToProps = (state: AppStateType): MpaStatePropsType => {
    return {
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        email: state.auth.email,
    }
}


export const HeaderConnect = connect(mapStateToProps, {getUserDataTC: getAuthUserDataTC, logoutAuthTC})(HeaderContainer)