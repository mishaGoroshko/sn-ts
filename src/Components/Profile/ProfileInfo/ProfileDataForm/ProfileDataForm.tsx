import React from 'react';
import {FormikProps, useFormik} from 'formik';
import {UserProfile} from '../../../../Redux/profile-reducer';
import {ProfileUpdateProperties} from '../../../../API/api';
import {validationUpdateDataProfile} from '../../../../helpers';

type ProfileDataFormType = {
    userProfile: UserProfile
    setEditMode: (editMode: boolean) => void
    updateProfileTC: (payload: ProfileUpdateProperties) => void
}

export const ProfileDataForm: React.FC<ProfileDataFormType> = ({userProfile, setEditMode, updateProfileTC}) => {

    const formik = useFormik({
        initialValues: {
            fullName: userProfile.fullName,
            aboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription,
            contacts: userProfile.contacts
        },
        validationSchema: validationUpdateDataProfile,
        onSubmit: (values, {setSubmitting}) => {
            updateProfileTC(values)
            setEditMode(false)
        },
    });

    const backToProfileHandle = () => setEditMode(false)

    const editHandle = (c: keyof typeof userProfile.contacts) => {
        if(formik.touched.contacts && formik.touched.contacts[c] && formik.errors.contacts){
            return formik.errors.contacts[c] ? <div>{formik.errors.contacts[c]}</div> : null
        }else return null
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div><b>fullName</b></div>
            <input
                id="fullName"
                type="text"
                {...formik.getFieldProps('fullName')}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
                <div>{formik.errors.fullName}</div>
            ) : null}
            <div><b>aboutMe</b></div>
            <input
                id="aboutMe"
                type="text"
                {...formik.getFieldProps('aboutMe')}
            />
            {formik.touched.aboutMe && formik.errors.aboutMe ? (
                <div>{formik.errors.aboutMe}</div>
            ) : null}

            <div><b>lookingForAJob:</b></div>
            <input
                id="lookingForAJob"
                type="checkbox"
                checked={formik.values.lookingForAJob}
                {...formik.getFieldProps('lookingForAJob')}
            />
            {formik.touched.lookingForAJob && formik.errors.lookingForAJob ? (
                <div>{formik.errors.lookingForAJob}</div>
            ) : null}

            <div><b>skills:</b></div>
            <input
                id="lookingForAJobDescription"
                type="text"
                {...formik.getFieldProps('lookingForAJobDescription')}
            />
            {formik.touched.lookingForAJobDescription && formik.errors.lookingForAJobDescription ? (
                <div>{formik.errors.lookingForAJobDescription}</div>
            ) : null}
            <div>
                <b>Contacts:</b>{Object.keys(userProfile.contacts).map((c, i) =>
                <div key={i}>
                    {c}: <input
                    id={`contacts.${c}`}
                    name={`contacts.${c}`}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contacts[c as keyof typeof userProfile.contacts] || ''}
                />
                    {editHandle(c as keyof typeof userProfile.contacts)}
                </div>
            )}
            </div>

            <button type="submit">Save</button>
            <button onClick={backToProfileHandle}>Back</button>

        </form>
    );
}