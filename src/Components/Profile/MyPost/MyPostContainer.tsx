import React from 'react';
import {connect} from 'react-redux';
import {addPostAC, initialStateProfileType, onchangeTextareaHandlerAC} from '../../../Redux/profile-reducer';
import MyPost from './MyPost';
import {AppStateType} from '../../../Redux/redux-store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
    profilePage: initialStateProfileType
}

type MapDispatchPropsType = {
    onchangeTextarea: (newText: string) => void
    addPost: () => void
}

export type MyPostType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onchangeTextarea: (newText: string) => dispatch(onchangeTextareaHandlerAC(newText)),
        addPost: () => dispatch(addPostAC())
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)