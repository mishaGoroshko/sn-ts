import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {setUserData} from '../../Redux/auth-reducer';
import {authAPI} from '../../API/api';

export class HeaderContainer extends React.Component<HeaderType> {
    componentDidMount() {
        authAPI.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <>
                <Header {...this.props}/>
            </>
        );
    }
}

type MpaStatePropsType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type MpaDispatchPropsType = {
    setUserData: (id: number | null, email: string | null, login: string | null) => void
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


export const HeaderConnect = connect(mapStateToProps, {setUserData})(HeaderContainer)