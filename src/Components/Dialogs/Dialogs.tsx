import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogComponents/DialogItem/DialogsItem";
import Message from "./DialogComponents/Message/Message";
import {dialogType, messageType} from "../../Redux/state";
// import {dialogType, messageType} from "../../index";

type DialogsType = {
    dialogsData: Array<dialogType>
    messagesData: Array<messageType>
}

const Dialogs: React.FC<DialogsType> = ({dialogsData, messagesData}) => {

    let dialogsElements = dialogsData.map(dialog => <DialogItem key={dialog.id} {...dialog}/>)
    let messagesElements = messagesData.map(mes => <Message key={mes.id} {...mes}/>)

    const messageRef = React.createRef<HTMLTextAreaElement>()
    const sendMessage = () => {
        alert(messageRef.current?.value)
    }

    return (
        <div className={s.dialogs}>
            <div>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea ref={messageRef}></textarea>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    );
};

export default Dialogs;
