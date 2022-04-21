import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../Assets/images/userPhoto.png';
import {UserType} from '../../Redux/users-reducer';
import {NavLink} from 'react-router-dom';

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

    let totalPages = Math.ceil(totalCountUsers / pageSize)

    let pages = [...Array(totalPages)].map((_, i) => i + 1)

    return (
        <div className={s.header}>
            <div>
                {pages.map((p, i) => {
                    return <span key={i}
                                 className={p === currentPage ? s.active : s.item}
                                 onClick={() => onPageChanged(p)}>{p}</span>
                })}
            </div>
            {users.map(u => {
                return (
                    <div key={u.id} className={s.block}>
                        <div className={s.blockAva}>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    src={u.photos.small !== null ? u.photos.small : userPhoto}
                                    className={s.image} alt="users photo"/>
                            </NavLink>
                            {u.followed
                                ? <button disabled={followArrayId.some(el => el === u.id)}
                                          onClick={() => deleteFollowTC(u.id)}>unfollow</button>
                                : <button disabled={followArrayId.some(el => el === u.id)}
                                          onClick={() => postFollowTC(u.id)}>follow</button>}
                        </div>
                        <div className={s.allInfo}>
                            <div className={s.nameStatus}>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            <div className={s.location}>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}