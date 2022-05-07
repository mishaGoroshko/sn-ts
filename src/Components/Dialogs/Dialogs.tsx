import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogComponents/DialogItem/DialogsItem';
import Message from './DialogComponents/Message/Message';
import {DialogsType} from './DialogsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';


type FormDataType = {
    message: string
}

export const Dialogs: React.FC<DialogsType> = (props) => {
    let {dialogsPage, addMessage} = props
    let dialogsElements = dialogsPage.dialogs.map(dialog => <DialogItem
        key={dialog.id} {...dialog}/>)
    let messagesElements = dialogsPage.messages.map(mes => <Message
        key={mes.id} {...mes}/>)

    // const messageRef = React.createRef<HTMLTextAreaElement>()
    // const sendMessage = () => {alert(messageRef.current?.value)}

    const addNewMessage = (formData: FormDataType) => {
        addMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}


export const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    let {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'enter your message'}
                   name="message"
                   component="textarea"/>
            <button>send</button>
        </form>
    );
}

export const AddMessageReduxForm = reduxForm<FormDataType>({form: 'message'})(AddMessageForm)

