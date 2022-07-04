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
    postFollowTC, selectFriendFollowFilter, selectTermSearchFilter,
    toggleDisabled,
    UserType
} from '../../Redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {UsersQueryParams} from '../../API/api';


class UsersContainer extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    // } можно не писать, если больше ничего в constructor не делаем(была попытка написать axios), все sideEffects делать в componentDidMount():

    componentDidMount() {
        let {currentPage, pageSize, getUsersTC, termSearchFilter, friendFollowFilter} = this.props

        getUsersTC({page: currentPage,count: pageSize, term: termSearchFilter, friend: friendFollowFilter!})
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, getUsersTC, termSearchFilter, friendFollowFilter} = this.props

        getUsersTC({page: pageNumber,count: pageSize, term: termSearchFilter, friend: friendFollowFilter!})
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
    termSearchFilter: string
    friendFollowFilter: null | boolean,
}
type MapDispatchPropsType = {
    toggleDisabled: (userId: string, isDisabled: boolean) => void
    getUsersTC: (payload: UsersQueryParams) => void
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
        termSearchFilter: selectTermSearchFilter(state),
        friendFollowFilter: selectFriendFollowFilter(state)
    }
}

export default compose<ComponentType>(connect(mapStateToProps,
        {toggleDisabled, getUsersTC, postFollowTC, deleteFollowTC}),
    withAuthRedirect)(UsersContainer)

