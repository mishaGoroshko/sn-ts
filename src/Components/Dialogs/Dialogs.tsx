import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogComponents/DialogItem/DialogsItem";
import Message from "./DialogComponents/Message/Message";
import {ActionsTypes, DialogsPageType} from "../../Redux/state";
import {addMessageAC, onchangeTextAreaMessageAC} from "../../Redux/dialogs-reducer";
// import {dialogType, messageType} from "../../index";

type DialogsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionsTypes) => void
}

const Dialogs: React.FC<DialogsType> = ({dialogsPage, dispatch}) => {

    let dialogsElements = dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} {...dialog}/>)
    let messagesElements = dialogsPage.messages.map(mes => <Message key={mes.id} {...mes}/>)

    // const messageRef = React.createRef<HTMLTextAreaElement>()
    // const sendMessage = () => {alert(messageRef.current?.value)}

    const onchangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(onchangeTextAreaMessageAC(e.currentTarget.value))
    }

    const onClickHandler = () => {
        dispatch(addMessageAC(dialogsPage.newMessageBody))
    }

    return (
        <div className={s.dialogs}>
            <div>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea value={dialogsPage.newMessageBody} onChange={onchangeHandler}
                          placeholder={'enter yuor message'}/> {/*ref={messageRef}*/}
                <button onClick={onClickHandler}>send</button>
                {/*onClick={sendMessage}*/}
            </div>
        </div>
    );
};

export default Dialogs;
