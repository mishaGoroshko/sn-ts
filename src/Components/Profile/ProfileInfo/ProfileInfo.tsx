import React from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                    width={'300px'} alt=""/>
            </div>
            <div className={s.avaDescription}>
                ava + description
            </div>
        </div>
    );
};

export default ProfileInfo;