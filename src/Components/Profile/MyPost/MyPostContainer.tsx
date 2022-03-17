import React from 'react';
import {addPostAC, onchangeTextareaHandlerAC} from "../../../Redux/profile-reducer";
import {ProfilePageType} from "../../../Redux/store";
import {StoreContext} from '../../../StoreContext';
import MyPost from "./MyPost";

type MyPostContainerType = {}

export const MyPostContainer: React.FC<MyPostContainerType> = ({...props}) => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                const profilePage: ProfilePageType = store.getState().profilePage
                let addPost = () => {
                    store.dispatch(addPostAC(profilePage.messageForNewPost))
                }

                const onchangeTextarea = (newText: string) => {
                    store.dispatch(onchangeTextareaHandlerAC(newText))
                }

                return <MyPost addPost={addPost} profilePage={profilePage} onchangeTextarea={onchangeTextarea}/>
            }}
        </StoreContext.Consumer>
    )
}