import React from 'react';
import {connect} from 'react-redux';
import {addPostAC, initialStateProfileType} from '../../../Redux/profile-reducer';
import {MyPost} from './MyPost';
import {AppStateType} from '../../../Redux/redux-store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
    profilePage: initialStateProfileType
}

type MapDispatchPropsType = {
    addPost: (newPost: string) => void
}

export type MyPostType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPost: string) => dispatch(addPostAC(newPost))
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)