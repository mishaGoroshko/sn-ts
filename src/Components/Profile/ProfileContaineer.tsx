import React, {JSXElementConstructor} from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {setUserProfile, UserProfile} from '../../Redux/profile-reducer';
import {useParams} from 'react-router-dom';


class ProfileContainer extends React.Component<ProfileType> {
    componentDidMount() {
        // @ts-ignore
        let userID:number | null = this.props.params['*'];
        if (!userID) {
            userID = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
            .then(promise => this.props.setUserProfile(promise.data))
    }

    render() {
        return (
            <>
                <Profile {...this.props} userProfile={this.props.userProfile}/>
            </>
        );
    }
}

type MapStatePropsType = {
    userProfile: UserProfile
}

type MapDispatchPropsType = {
    setUserProfile: (userProfile: UserProfile) => void
}

type ProfileType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.profilePage.userProfile
    }
}

const withRouter = (Component: JSXElementConstructor<any>): JSXElementConstructor<any> => {
    function ComponentWithRouterProp(props: any) {
        let params = useParams<'*'>();
        return (
            <Component
                {...props}
                params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}


export const ProfileConnect = connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))