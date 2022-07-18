import React from 'react';
import s from './Users.module.css';
import {UserType} from '../../Redux/users-reducer';
import {Pagination} from '../common/Pagination/Pagination';
import {User} from './User/User';
import {SearchForm} from './SearchForm/SearchForm';

type UsersType = {
    totalCountUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    followArrayId: Array<number>
    postFollowTC: (userId: number) => void
    deleteFollowTC: (userId: number) => void
}

export const Users: React.FC<UsersType> = (
    {
        totalCountUsers, pageSize, currentPage,
        onPageChanged, users, followArrayId, postFollowTC, deleteFollowTC
    }) => {

    return (
        <div className={s.header}>
            <SearchForm/>
            <Pagination totalItemsCount={totalCountUsers}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                        portionSize={10}/>

            {users.length
                ? users.map(u => <User key={u.id}
                                       user={u}
                                       postFollowTC={postFollowTC}
                                       followArrayId={followArrayId}
                                       deleteFollowTC={deleteFollowTC}/>)
                : <span>users not found</span>}
        </div>
    );
}