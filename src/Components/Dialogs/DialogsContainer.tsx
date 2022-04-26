import React, {ComponentType} from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {compose, Dispatch} from 'redux';
import {
    addMessageAC,
    DialogsPageType,
    onchangeTextAreaMessageAC
} from '../../Redux/dialogs-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

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
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onchangeTextAreaMessage: (newText: string) => dispatch(onchangeTextAreaMessageAC(newText)),
        addMessage: () => dispatch(addMessageAC())
    }
}

export const DialogsConnect = compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)