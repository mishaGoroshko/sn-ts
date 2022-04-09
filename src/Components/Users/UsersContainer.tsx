import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    follow,
    setCurrentPage,
    setPreloader,
    setTotalCount,
    setUsers,
    unfollow,
    UserType
} from '../../Redux/users-reducer';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';


class UsersContainer extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    // } можно не писать, если больше ничего в constructor не делаем(была попытка написать axios), все sideEffects делать в componentDidMount():
    componentDidMount() {
        this.props.setPreloader(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setPreloader(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setPreloader(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setPreloader(false)
                this.props.setUsers(response.data.items)
            })
    }


    render() {
        let {users, follow, unfollow, pageSize, totalCountUsers, currentPage, isFetching} = this.props;

        return (
            <>
                <Preloader isFetching={isFetching}/>
                <Users users={users}
                       follow={follow}
                       unfollow={unfollow}
                       currentPage={currentPage}
                       pageSize={pageSize}
                       totalCountUsers={totalCountUsers}
                       onPageChanged={this.onPageChanged}
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
}
type MapDispatchPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCount: (totalCount: number) => void
    setPreloader: (isFetching: boolean) => void
}

export type UsersType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCountUsers: state.usersPage.totalCountUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         follow: (userId) => dispatch(followAC(userId)),
//         unfollow: (userId) => dispatch(unfollowAC(userId)),
//         setUsers: (users) => dispatch(setUsersAC(users)),
//         setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
//         setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
//         startPreloader: (isFetching) => dispatch(startPreloaderAC(isFetching))
//     }
// }

export const UsersConnect = connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setTotalCount, setPreloader,
})(UsersContainer)

