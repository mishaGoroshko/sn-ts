let subscribers = [] as SubscriberType[]

let localWs: WebSocket
let timeoutID: NodeJS.Timeout

const closeHandle = () => {
    console.log('WS WAS CLOSED')
    // setError('reconnect...')
    timeoutID = setTimeout(createChannel, 3000)
};

const messageHandle = (e: MessageEvent) => {
    subscribers.forEach(s => s(JSON.parse(e.data)))
}

const createChannel = () => {
    // setError('')
    localWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    localWs.addEventListener('close', closeHandle)
    // setWs(localWs)
}


export const chatApi = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
}

export type SubscriberType = (messages: MessageType[]) => void

export type MessageType = {
    userId: number
    photo: string,
    userName: string
    message: string
}