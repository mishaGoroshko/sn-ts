import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";

type ProfileType = {

}

const Profile: React.FC<ProfileType> = ({...props}) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostContainer/>
        </div>
    );
};

export default Profile;