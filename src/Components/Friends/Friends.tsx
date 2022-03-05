import React from 'react';
import s from './Friends.module.css'
import {friendType} from "../../Redux/state";

type FriendsType = {
    friends: Array<friendType>
}

export const Friends:React.FC<FriendsType> = ({friends}) => {
    return (
        <div>
            {friends.map(friend => {
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