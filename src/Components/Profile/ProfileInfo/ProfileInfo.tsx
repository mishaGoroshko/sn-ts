import React from 'react';
import s from './ProfileInfo.module.css'
import {UserProfile} from '../../../Redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import userPhoto from '../../../Assets/images/userPhoto.png';
import {ProfileStatus} from '../../ProfileStatus';


type ProfileInfoType = {
    userProfile: UserProfile
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({userProfile}) => {
    if (!userProfile) {
        return <Preloader isFetching={true}/>
    }
    return (
        <div className={s.content}>

            <div className={s.avaDescription}>
                <img
                    src={userProfile.photos.large !== null ? userProfile.photos.large : userPhoto}
                    alt="ava"/>
                <div>{userProfile.fullName}</div>

                <ProfileStatus status={'I can do it'}/>
            </div>
        </div>
    )
};

export default ProfileInfo;