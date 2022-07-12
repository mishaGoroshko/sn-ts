import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import s from './ChatPage.module.scss'
import userPhoto from '../../Assets/images/userPhoto.png'

type UserType = {
    userId: number
    photo: string,
    userName: string
    message: string
}
type UsersType = UserType[]

function ChatPage() {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState<UsersType>([])
    const [error, setError] = useState('')

    const [ws, setWs] = useState<WebSocket | null>(null)
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const messagesBlockRef = useRef<HTMLDivElement>(null)


    if (ws) ws.onmessage = (messageEvent) => {
        setMessages([...messages, ...JSON.parse(messageEvent.data)])

        if (messagesBlockRef.current) messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
    }

    useEffect(() => {
        let localWs: WebSocket
        let timeoutID: NodeJS.Timeout

        const closeHandle = () => {
            console.log('WS WAS CLOSED')
            setError('ERRORRRRRRRRRRRRRRR')
            timeoutID = setTimeout(createChannel, 3000)
        };

        const createChannel = () => {
            setError('')
            localWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            localWs.addEventListener('close', closeHandle)
            setWs(localWs)
        }

        createChannel()

        return () => {
            localWs.removeEventListener('close', closeHandle)
            localWs.close()
            clearTimeout(timeoutID)
        }

    }, [])

    useEffect(() => {
        const openHandle = () => {
            console.log('OPEN')
            setReadyStatus('ready')
        };
        ws?.addEventListener('open', openHandle)

        return () => ws?.removeEventListener('open', openHandle)
    }, [ws])


    // useEffect(() => {
    //     const closeHandle = () => {
    //         console.log('WS WAS CLOSED')
    //     };
    //     ws?.addEventListener('close', closeHandle)
    //
    //     return () => ws?.removeEventListener('close', closeHandle)
    // }, [ws])


    const onChangeTextHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.currentTarget.value)
    }

    const addMessageHandle = () => {
        if (!newMessage) return

        ws?.send(newMessage)
        setNewMessage('')
    }

    return (
        <div className={s.container}>
            <div ref={messagesBlockRef} className={s.messagesBlock}>
                {messages.map((u, i) => <div key={i} className={s.message}>
                        <img className={s.photo} src={u.photo ? u.photo : userPhoto}
                             alt="userPhoto"/>
                        <div className={s.textBlock}>
                            <span className={s.userName}>{u.userName}</span>
                            <span className={s.text}>{u.message}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={s.inputBlock}>
                <textarea value={newMessage}
                          onChange={onChangeTextHandle}
                          className={s.textarea}
                          placeholder='your message'
                          name="textarea"
                          id="textarea"></textarea>
                <button onClick={addMessageHandle}
                        disabled={ws == null || readyStatus !== 'ready'}
                        className={s.button}>send
                </button>
                {error && <span>{error}{ws?.onerror?.name}</span>}
            </div>

        </div>
    );
}

export default ChatPage;
