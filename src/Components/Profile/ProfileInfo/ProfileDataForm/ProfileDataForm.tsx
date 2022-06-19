import React from 'react';
import {FormikErrors, FormikProps, useFormik} from 'formik';
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
    const validate = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.fullName) {
            errors.fullName = 'Required';
        } else if (values.fullName.length > 15) {
            errors.fullName = 'Must be 15 characters or less';
        }

        if (!values.AboutMe) {
            errors.AboutMe = 'Required';
        } else if (values.AboutMe.length > 20) {
            errors.AboutMe = 'Must be 20 characters or less';
        }

        if (!values.lookingForAJobDescription) {
            errors.lookingForAJobDescription = 'Required';
        } else if (values.lookingForAJobDescription.length > 20) {
            errors.lookingForAJobDescription = 'Must be 20 characters or less';
        }

        // if (!values.email) {
        //     errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid email address';
        // }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            fullName: userProfile.fullName,
            AboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription,
            contacts: userProfile.contacts
        },
        validate,
        onSubmit: values => {
            // @ts-ignore
            dispatch(updateProfileTC(values))//  need to fix with types
            setEditMode(false)
        },
    });

    const backToProfileHandle = () => setEditMode(false)

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
                id="AboutMe"
                type="text"
                {...formik.getFieldProps('AboutMe')}
            />
            {formik.touched.AboutMe && formik.errors.AboutMe ? (
                <div>{formik.errors.AboutMe}</div>
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
                    //@ts-ignore
                    value={formik.values.contacts[c]}
                />
                    {/*{//@ts-ignore*/}
                    {/*    formik.touched.contacts[c] && formik.errors.contacts[c] ? (<div>{formik.errors.contacts[c]}</div>) : null}*/}
                </div>)}
            </div>

            <button type="submit">Save</button>
            <button onClick={backToProfileHandle}>Back</button>

        </form>
    );
}