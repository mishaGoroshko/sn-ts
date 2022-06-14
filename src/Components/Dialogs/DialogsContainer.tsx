import React, {ComponentType} from 'react';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {compose, Dispatch} from 'redux';
import {addMessageAC, DialogsPageType} from '../../Redux/dialogs-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

export type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchPropsType = {
    addMessage: (message: string) => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addMessage: (message: string) => dispatch(addMessageAC(message))
    }
}

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
