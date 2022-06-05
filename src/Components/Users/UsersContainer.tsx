import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    deleteFollowTC,
    getCurrentPage, getFollowArrayId,
    getIsFetching,
    getPageSize,
    getTotalCountUsers,
    getUsers,
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
        let {currentPage, pageSize, getUsersTC} = this.props

        getUsersTC(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, getUsersTC} = this.props

        getUsersTC(pageNumber, pageSize)
    }

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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCountUsers: getTotalCountUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followArrayId: getFollowArrayId(state),
    }
}

export const UsersConnect = compose<ComponentType>(connect(mapStateToProps,
        {toggleDisabled, getUsersTC, postFollowTC, deleteFollowTC}),
    withAuthRedirect)(UsersContainer)

