import React from 'react';
import {addMessageAC, onchangeTextAreaMessageAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {DialogsPageType} from "../../Redux/store";

type DialogsContainerType = {
    store: any
}

export const DialogsContainer: React.FC<DialogsContainerType> = ({store, ...props}) => {
    const dialogsPage: DialogsPageType = store.getState().dialogsPage

    const onchangeTextAreaMessage = (newText: string) => {
        store.dispatch(onchangeTextAreaMessageAC(newText))
    }

    const addMessage = () => {
        store.dispatch(addMessageAC(dialogsPage.newMessageBody))
    }

    return <Dialogs dialogsPage={dialogsPage} addMessage={addMessage}
                    onchangeTextAreaMessage={onchangeTextAreaMessage}/>
}