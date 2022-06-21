import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    getStatusTC,
    getUserProfileTC,
    savePhoto,
    updateProfileTC,
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
import {Preloader} from '../common/Preloader/Preloader';
import {ProfileUpdateProperties} from '../../API/api';

class ProfileContainer extends React.Component<ProfileType & WithRouterType> {
    refreshProfile() {
        // @ts-ignore
        let userID: number | null = this.props.router.params.id;
        if (!userID) {
            userID = this.props.authorizedUserId
            if (!userID) {
                // @ts-ignore
                this.props.navigate('/login', {replace: true})
            }
        }

        if (userID !== null) {
            this.props.getUserProfileTC(userID)
            this.props.getStatusTC(userID)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileType & WithRouterType>, prevState: Readonly<{}>, snapshot?: any) {
        // @ts-ignore
        if (this.props.router.params.id !== prevProps.router.params.id)
            this.refreshProfile()
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader isFetching/>
        }
        return <Profile {...this.props}
                        savePhoto={this.props.savePhoto}
            // @ts-ignore
                        isOwner={!this.props.router.params.id}
                        userProfile={this.props.userProfile}
                        status={this.props.status}
                        updateStatusTC={this.props.updateStatusTC}
                        updateProfileTC={this.props.updateProfileTC}
        />
    }
}

type MapStatePropsType = {
    userProfile: UserProfile
    status: string
    authorizedUserId: number | null
    initialized: boolean
}

type MapDispatchPropsType = {
    getUserProfileTC: (userID: number) => void
    getStatusTC: (userID: number) => void
    updateStatusTC: (status: string) => void
    savePhoto: (photoFile: File) => void
    updateProfileTC: (payload: ProfileUpdateProperties) => void
}

type ProfileType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        initialized: state.profilePage.initialized
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
    (mapStateToProps, {
        getUserProfileTC,
        getStatusTC,
        updateStatusTC,
        savePhoto,
        updateProfileTC
    }),
    withRouter,
    withAuthRedirect)
(ProfileContainer);
