import React from 'react';
import s from './Profile.module.css'
import MyPost from "./MyPost/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import {PostType} from "../../index";
import { ProfilePageType} from "../../Redux/state";

type ProfileType = {
    profilePage: ProfilePageType
    addPost:(postText: string)=>void
    onchangeTextarea: (newText: string) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPost profilePage={props.profilePage} addPost={props.addPost} onchangeTextarea={props.onchangeTextarea}/>
        </div>
    );
};

export default Profile;