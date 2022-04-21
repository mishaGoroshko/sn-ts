import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    deleteFollowTC,
    follow,
    getUsersTC,
    postFollowTC,
    toggleDisabled,
    unfollow,
    UserType
} from '../../Redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {Navigate} from 'react-router-dom';


class UsersContainer extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    // } можно не писать, если больше ничего в constructor не делаем(была попытка написать axios), все sideEffects делать в componentDidMount():
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) =>
        this.props.getUsersTC(pageNumber, this.props.pageSize)

    render() {
        let {
            users, pageSize, totalCountUsers, currentPage, isFetching, followArrayId, isAuth,
            postFollowTC, deleteFollowTC
        } = this.props;

        if (!isAuth) return <Navigate to="/login"/>

        return (
            <>
                <Preloader isFetching={isFetching}/>
                <Users users={users}
                       currentPage={currentPage}
                       pageSize={pageSize}
                       totalCountUsers={totalCountUsers}
                       onPageChanged={this.onPageChanged}
                       followArrayId={followArrayId}
                       postFollowTC={postFollowTC}
                       deleteFollowTC={deleteFollowTC}
                />
            </>)
    }
}

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalCountUsers: number
    currentPage: number
    isFetching: boolean
    followArrayId: Array<string>
    isAuth: boolean
}
type MapDispatchPropsType = {
    toggleDisabled: (userId: string, isDisabled: boolean) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    postFollowTC: (userId: string) => void
    deleteFollowTC: (userId: string) => void
}

export type UsersType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCountUsers: state.usersPage.totalCountUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followArrayId: state.usersPage.followArrayId,
        isAuth: state.auth.isAuth
    }
}

export const UsersConnect = connect(mapStateToProps, {
    toggleDisabled, getUsersTC, postFollowTC, deleteFollowTC
})(UsersContainer)

