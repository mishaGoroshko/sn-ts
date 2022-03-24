import React from 'react';
import s from './Friends.module.css'
import { FriendsType } from './FriendsContainer';


export const Friends:React.FC<FriendsType> = ({sidebar}) => {
    return (
        <div>
            {sidebar.friends.map(friend => {
                return (
                    <div key={friend.id} className={s.friends}>
                        <img className={s.image} src={friend.image} alt=""/>
                        <div>
                            {friend.name}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}