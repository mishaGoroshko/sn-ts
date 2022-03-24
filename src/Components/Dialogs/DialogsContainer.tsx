import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {Dispatch} from 'redux';
import {addMessageAC, DialogsPageType, onchangeTextAreaMessageAC} from '../../Redux/dialogs-reducer';


export type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchPropsType = {
    onchangeTextAreaMessage: (newText: string) => void,
    addMessage: () => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onchangeTextAreaMessage: (newText: string) => dispatch(onchangeTextAreaMessageAC(newText)),
        addMessage: () => dispatch(addMessageAC())
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)