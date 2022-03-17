import React from 'react';
import {addPostAC, onchangeTextareaHandlerAC} from "../../../Redux/profile-reducer";
import {ProfilePageType} from "../../../Redux/store";
import MyPost from "./MyPost";

type MyPostContainerType = {
    store: any
}

export const MyPostContainer: React.FC<MyPostContainerType> = ({store, ...props}) => {

    const profilePage: ProfilePageType = store.getState().profilePage

    let addPost = () => {
        store.dispatch(addPostAC(profilePage.messageForNewPost))
    }

    const onchangeTextarea = (newText: string) => {
        store.dispatch(onchangeTextareaHandlerAC(newText))
    }

    return <MyPost addPost={addPost} profilePage={profilePage} onchangeTextarea={onchangeTextarea}/>
}