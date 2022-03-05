import React from 'react';
import s from './Message.module.css'

type MessageType = {
    message: string
}

const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={s.message}>
            <img src="https://auto.ironhorse.ru/wp-content/uploads/2021/03/e-tron-gt-tmb-550x300.jpg" alt=""/>
            <span>{props.message}</span>
        </div>
    );
};

export default Message;