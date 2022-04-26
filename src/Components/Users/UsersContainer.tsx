import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    deleteFollowTC,
    getUsersTC,
    postFollowTC,
    toggleDisabled,
    UserType
} from '../../Redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


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
        return (
            <>
                <Preloader isFetching={this.props.isFetching}/>
                <Users onPageChanged={this.onPageChanged} {...this.props}

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
    }
}

export const UsersConnect = compose<ComponentType>(connect(mapStateToProps,
        {toggleDisabled, getUsersTC, postFollowTC, deleteFollowTC}),
    withAuthRedirect)(UsersContainer)

