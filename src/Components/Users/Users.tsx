import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../Assets/images/userPhoto.png';
import {UserType} from '../../Redux/users-reducer';

type UsersType = {
    totalCountUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

export const Users: React.FC<UsersType> = ({totalCountUsers, pageSize, currentPage, onPageChanged, users, follow, unfollow}) => {

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
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.image}/>
                            {u.followed
                                ? <button onClick={() => follow(u.id)} className={s.button}>unfollow</button>
                                : <button onClick={() => unfollow(u.id)}>follow</button>}
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