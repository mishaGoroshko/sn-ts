import React from 'react';
import {friendType, StoreType} from "../../Redux/store";
import {Friends} from "./Friends";

type FriendsType = {
    store:StoreType
}

export const FriendsContainer:React.FC<FriendsType> = ({store,...props}) => {
    const friends:Array<friendType> = store.getState().sidebar.friends
    return <Friends friends={friends}/>
}