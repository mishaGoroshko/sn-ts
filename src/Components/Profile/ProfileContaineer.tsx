import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {getUserProfileTC, UserProfile} from '../../Redux/profile-reducer';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';


class ProfileContainer extends React.Component<ProfileType> {
    componentDidMount() {
        // @ts-ignore
        let userID: number | null = this.props.router.params['*'];
        if (!userID) {
            userID = 2
        }
        this.props.getUserProfileTC(userID)
    }

    render() {
        // @ts-ignore
        if (!this.props.isAuth) this.props.router.navigate('/login', {replace: true})
        return <Profile {...this.props} userProfile={this.props.userProfile}/>
    }
}

type MapStatePropsType = {
    userProfile: UserProfile
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfileTC: (userID: number) => void
}

type ProfileType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        isAuth: state.auth.isAuth
    }
}

// type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;


function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T
                                     // & WithRouterType
    ) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export const ProfileConnect = connect(mapStateToProps, {getUserProfileTC})(withRouter(ProfileContainer))