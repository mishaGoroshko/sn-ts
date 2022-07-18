import React from 'react';
import s from './User.module.css';
import userPhoto from '../../../Assets/images/userPhoto.png';
import {UserType} from '../../../Redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UsersType = {
    user: UserType
    followArrayId: Array<number>
    postFollowTC: (userId: number) => void
    deleteFollowTC: (userId: number) => void
}

export const User: React.FC<UsersType> = (
    {user: u, followArrayId, postFollowTC, deleteFollowTC}) => {

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
}