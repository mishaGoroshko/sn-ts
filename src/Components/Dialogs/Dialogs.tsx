import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogComponents/DialogItem/DialogsItem';
import Message from './DialogComponents/Message/Message';
import {DialogsType} from './DialogsContainer';


const Dialogs: React.FC<DialogsType> = ({dialogsPage, addMessage, onchangeTextAreaMessage, ...props}) => {

    let dialogsElements = dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} {...dialog}/>)
    let messagesElements = dialogsPage.messages.map(mes => <Message key={mes.id} {...mes}/>)

    // const messageRef = React.createRef<HTMLTextAreaElement>()
    // const sendMessage = () => {alert(messageRef.current?.value)}

    const onchangeTextAreaMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onchangeTextAreaMessage(e.currentTarget.value)
    }

    const addMessageHandler = () => {
        addMessage()
    }

    return (
        <div className={s.dialogs}>
            <div>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea value={dialogsPage.newMessageBody} onChange={onchangeTextAreaMessageHandler}
                          placeholder={'enter yuor message'}/> {/*ref={messageRef}*/}
                <button onClick={addMessageHandler}>send</button>
                {/*onClick={sendMessage}*/}
            </div>
        </div>
    );
};

export default Dialogs;
