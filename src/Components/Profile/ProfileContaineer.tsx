import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {getUserProfileTC, UserProfile} from '../../Redux/profile-reducer';
import {
    NavigateFunction,
    Params,
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfileType & WithRouterType> {
    componentDidMount() {
        let userID: number | null = this.props.router?.params['*'];
        if (!userID) {
            userID = 2
        }
        this.props.getUserProfileTC(userID)
    }

    render() {
        //@ts-ignore
        // if (!this.props.isAuth) this.props.router.navigate('/login', {replace: true})

        return <Profile {...this.props} userProfile={this.props.userProfile}/>
    }
}

type MapStatePropsType = {
    userProfile: UserProfile
}

type MapDispatchPropsType = {
    getUserProfileTC: (userID: number) => void
}

type ProfileType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.profilePage.userProfile,
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
                {...props as T}
                router={{location, navigate, params}}
                // params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}

// const TestComponent = connect(mapStateToProps, {getUserProfileTC})(ProfileContainer)
//
// export const ProfileConnect = WithAuthRedirect<ProfileType & WithRouterType>(withRouter<ProfileType>(TestComponent))

export default compose<ComponentType>(WithAuthRedirect, withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfileTC})
)(ProfileContainer);
