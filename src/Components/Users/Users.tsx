import React from 'react';
import {UsersType} from './UsersContainer';
import s from './Users.module.css'
import {v1} from 'uuid';

export const Users: React.FC<UsersType> = ({users, follow, unfollow, setUsers, ...props}) => {
    users.length === 0 && setUsers([
        {
            id: v1(),
            photoUrl: 'https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160903962/62628297-freunde-flaches-design-gelb-rundes-web-symbol.jpg',
            followed: true,
            fullName: 'Miha',
            status: 'study now',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            photoUrl: 'https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160903962/62628297-freunde-flaches-design-gelb-rundes-web-symbol.jpg',
            followed: false,
            fullName: 'Alina',
            status: 'good day',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            photoUrl: 'https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160903962/62628297-freunde-flaches-design-gelb-rundes-web-symbol.jpg',
            followed: false,
            fullName: 'Sasha',
            status: '......mmm',
            location: {city: 'Minsk', country: 'Belarus'}
        },
    ])
    return (
        <div className={s.header}>
            {users.map(u => {
                return (
                    <div key={u.id} className={s.block}>
                        <div className={s.blockAva}>
                            <img src={u.photoUrl} className={s.image}/>
                            {u.followed
                                ? <button onClick={() => follow(u.id)} className={s.button}>unfollow</button>
                                : <button onClick={() => unfollow(u.id)}>follow</button>}
                        </div>
                        <div className={s.allInfo}>
                            <div className={s.nameStatus}>
                                <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </div>
                            <div className={s.location}>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}