import {ActionsTypes} from './store';
import {v1} from 'uuid';

export type dialogType = {
    id: string
    name: string
    image: string
}

type messageType = {
    id: string
    message: string
}

export type DialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
}

let initialState: DialogsPageType = {
    dialogs: [
        {
            id: v1(),
            name: 'Miha',
            image: 'https://www.internet-technologies.ru/wp-content/uploads/2020/02/49817-307143.png'
        },
        {
            id: v1(),
            name: 'Alinka',
            image: 'https://w7.pngwing.com/pngs/458/502/png-transparent-emoji-broken-heart-paw-patrol-love-heart-smiley.png'
        },
        {
            id: v1(),
            name: 'Polina',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKBtROJ2Tc0e9-aQ5BlDFo98XliTit9wXjQ&usqp=CAU'
        },
        {id: v1(), name: 'Sasha', image: 'https://www.covenok.ru/files/tiny_images/training/161.png'},
        {
            id: v1(),
            name: 'Maja',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBPVAZMuLlW2Dfhqtwwp80B3P6TqQQMVdyg&usqp=CAU'
        },
        {
            id: v1(),
            name: 'IvanbIch',
            image: 'https://i.pinimg.com/originals/66/12/e2/6612e2d02db90bfa78fd4afb2e2dc15c.jpg'
        },
    ],
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are you'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Yo'}
    ],
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case 'ONCHANGE-TEXT-AREA-MESSAGES':
            return {...state, newMessageBody: action.body}
        case 'ADD-MESSAGE':
            return state.newMessageBody.trim() ? {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: v1(), message: state.newMessageBody.trim()}]
            } : {...state, newMessageBody: ''}
        default:
            return state
    }
}
export const onchangeTextAreaMessageAC = (body: string) => {
    return {
        type: 'ONCHANGE-TEXT-AREA-MESSAGES',
        body: body
    } as const
}

export const addMessageAC = () => {
    return {
        type: 'ADD-MESSAGE'
    } as const
}