import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {UserProfile} from '../../Redux/profile-reducer';

type ProfileType = {
    userProfile: UserProfile
}

const Profile: React.FC<ProfileType> = ({userProfile,...props}) => {
    return (
        <div className={s.content}>
            <ProfileInfo userProfile={userProfile}/>
            <MyPostContainer/>
        </div>
    );
};

export default Profile;