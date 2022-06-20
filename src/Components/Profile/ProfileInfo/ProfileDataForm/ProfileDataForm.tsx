import React from 'react';
import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import {updateProfileTC, UserProfile} from '../../../../Redux/profile-reducer';
import {useAppDispatch} from '../../../../Redux/redux-store';
import {ProfileUpdateProperties} from '../../../../API/api';

type ProfileDataFormType = {
    userProfile: UserProfile
    setEditMode: (editMode: boolean) => void
}

type FormValues = ProfileUpdateProperties
//     {
//     fullName: string;
//     AboutMe: string;
//     lookingForAJob: boolean;
//     lookingForAJobDescription: string
// }

export const ProfileDataForm: React.FC<ProfileDataFormType
    & Partial<FormikProps<FormValues>>> = ({userProfile, setEditMode}) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            fullName: userProfile.fullName,
            aboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription,
            contacts: userProfile.contacts
        },

        validationSchema: Yup.object().shape({
            fullName: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            aboutMe: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            lookingForAJob: Yup.boolean()
                .required('Required'),
            lookingForAJobDescription: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            contacts: Yup.object().shape({
                github: Yup.string()
                    .url('must be a url')
                    .nullable(),
                vk: Yup.string()
                    .url('must be a url')
                    .nullable(),
                facebook: Yup.string()
                    .url('must be a url')
                    .nullable(),
                instagram: Yup.string()
                    .url('must be a url')
                    .nullable(),
                twitter: Yup.string()
                    .url('must be a url')
                    .nullable(),
                website: Yup.string()
                    .url('must be a url')
                    .nullable(),
                youtube: Yup.string()
                    .url('must be a url')
                    .nullable(),
                mainLink: Yup.string()
                    .url('must be a url')
                    .nullable(),
            })
        }),
        onSubmit: (values, {setSubmitting}) => {
            // @ts-ignore
            dispatch(updateProfileTC(values))//  need to fix with types
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