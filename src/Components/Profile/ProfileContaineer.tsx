import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    getStatusTC,
    getUserProfileTC,
    updateStatusTC,
    UserProfile
} from '../../Redux/profile-reducer';
import {
    NavigateFunction,
    Params,
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfileType & WithRouterType> {
    componentDidMount() {
        // @ts-ignore
        let userID: number | null = this.props.router.params['*'];

        if (!userID) {
            userID = this.props.authorizedUserId
        }

        if (userID !== null) {
            this.props.getUserProfileTC(userID)
            this.props.getStatusTC(userID)
        }
    }

    render() {
        //@ts-ignore
        // if (!this.props.isAuth) this.props.router.navigate('/login', {replace: true})

        return <Profile {...this.props}
                        userProfile={this.props.userProfile}
                        status={this.props.status}
                        updateStatusTC={this.props.updateStatusTC}
        />
    }
}

type MapStatePropsType = {
    userProfile: UserProfile
    status: string
    authorizedUserId: number | null
}

type MapDispatchPropsType = {
    getUserProfileTC: (userID: number) => void
    getStatusTC: (userID: number) => void
    updateStatusTC: (status: string) => void
}

type ProfileType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}

type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;

// type WithRouterType = Readonly<Params<string>>;


function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T & WithRouterType) {
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

export default compose<ComponentType>
(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
    (mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC}),
    withRouter,
    withAuthRedirect)
(ProfileContainer);
