import {chatApi, MessageType} from '../API/chatApi';
import {AppThunk} from './redux-store';
import {Dispatch} from 'redux';

const initState = {
    messages: [] as MessageType[]
}
export type InitStateType = typeof initState

export const chatReducer = (state: InitStateType = initState, action: ChatActionsType): InitStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        default:
            return state
    }
}

export type ChatActionsType = ReturnType<typeof messagesReceived>

export const messagesReceived = (messages: MessageType[]) =>
    ({type: 'CHAT/MESSAGES_RECEIVED', payload: {messages},} as const);


let _newMessagesHandle: ((messages: MessageType[]) => void) | null = null

const newMessagesCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandle === null)
        _newMessagesHandle = (messages) => {
            dispatch(messagesReceived(messages))
        }
    return _newMessagesHandle
};

export const startMessagesListening = (userID: number): AppThunk => async dispatch => {
    chatApi.subscribe(newMessagesCreator(dispatch))
}

export const stopMessagesListening = (userID: number): AppThunk => async dispatch => {
    chatApi.unsubscribe(newMessagesCreator(dispatch))
}