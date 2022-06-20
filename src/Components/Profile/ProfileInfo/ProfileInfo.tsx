import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {UserProfile} from '../../../Redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import userPhoto from '../../../Assets/images/userPhoto.png';
import {ProfileStatusWithHooks} from './ProfileStatus/ProfileStatusWithHooks';
import {ProfileData} from './ProfileData/ProfileData';
import {ProfileDataForm} from './ProfileDataForm/ProfileDataForm';
import {ProfileUpdateProperties} from '../../../API/api';


type ProfileInfoType = {
    userProfile: UserProfile
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    updateProfileTC: (payload: ProfileUpdateProperties) => void
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           userProfile,
                                                           isOwner, savePhoto,
                                                           ...props
                                                       }) => {
    let [editMode, setEditMode] = useState(false)

    if (!userProfile) {
        return <Preloader isFetching={true}/>
    }

    const addFileHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) savePhoto(e.target.files[0])
    }
    return (
        <div className={s.content}>
            <div className={s.avaDescription}>
                <img
                    src={userProfile.photos.large || userPhoto}
                    alt="ava"/>

                {isOwner && <input type={'file'} onChange={addFileHandle}/>}

                {editMode
                    ? <ProfileDataForm  userProfile={userProfile} setEditMode={setEditMode} {...props}/>
                    : <ProfileData userProfile={userProfile}
                                   isOwner={isOwner}
                                   setEditMode={setEditMode}/>}
                <ProfileStatusWithHooks {...props} />
            </div>
        </div>
    )
};

export default ProfileInfo;