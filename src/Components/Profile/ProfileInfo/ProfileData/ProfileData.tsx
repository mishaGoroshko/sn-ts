import React from 'react';
import {UserProfile} from '../../../../Redux/profile-reducer';

type ProfileDataType = {
    userProfile: UserProfile
    isOwner: boolean
    setEditMode: (editMode: boolean) => void
}

export const ProfileData: React.FC<ProfileDataType> = ({userProfile, isOwner, setEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={() => setEditMode(true)}>edit</button>}
            <div>{userProfile.fullName}</div>
            <div><b>aboutMe</b>: {userProfile.aboutMe}</div>
            <div><b>lookingForAJob:</b> {userProfile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>skills:</b> {userProfile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts:</b>{Object.entries(userProfile.contacts).map((c, i) =>
                <div key={i}>{c[0]}: {c[1] ? c[1] : '-----'}</div>)}
            </div>

        </div>
    );
}