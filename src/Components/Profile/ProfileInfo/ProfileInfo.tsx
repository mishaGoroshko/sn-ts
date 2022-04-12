import React from 'react';
import s from './ProfileInfo.module.css'
import {UserProfile} from '../../../Redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';


type ProfileInfoType = {
    userProfile: UserProfile
}

const ProfileInfo: React.FC<ProfileInfoType> = ({userProfile}) => {
    if (!userProfile) {
        return <Preloader isFetching={true}/>
    }
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                    width={'300px'} alt=""/>
            </div>
            <div className={s.avaDescription}>
                <img src={userProfile.photos.large} alt="ava"/>
                <div>{userProfile.fullName}</div>
            </div>
        </div>
    );
};

export default ProfileInfo;