import React from 'react';
import s from './Users.module.css';
import {UserType} from '../../Redux/users-reducer';
import {Pagination} from '../common/Pagination/Pagination';
import {User} from './User/User';

type UsersType = {
    totalCountUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    followArrayId: Array<string>
    postFollowTC: (userId: string) => void
    deleteFollowTC: (userId: string) => void
}

export const Users: React.FC<UsersType> = (
    {
        totalCountUsers, pageSize, currentPage,
        onPageChanged, users, followArrayId, postFollowTC, deleteFollowTC
    }) => {

    return (
        <div className={s.header}>
            <Pagination totalCountUsers={totalCountUsers}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}/>

            {users.map(u => <User key={u.id}
                                  user={u}
                                  postFollowTC={postFollowTC}
                                  followArrayId={followArrayId}
                                  deleteFollowTC={deleteFollowTC}/>)}
        </div>
    );
}