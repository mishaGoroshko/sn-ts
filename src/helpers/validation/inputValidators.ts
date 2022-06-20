import * as Yup from 'yup';

export const validationUpdateDataProfile = Yup.object().shape({
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
})

