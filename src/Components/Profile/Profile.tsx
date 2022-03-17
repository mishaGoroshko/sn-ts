import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../Redux/redux-store";
import {MyPostContainer} from "./MyPost/MyPostContainer";

type ProfileType = {
    store: StoreType
}

const Profile: React.FC<ProfileType> = ({store, ...props}) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostContainer store={store}/>
        </div>
    );
};

export default Profile;