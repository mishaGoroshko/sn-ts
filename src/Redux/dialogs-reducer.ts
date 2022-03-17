import {ActionsTypes, DialogsPageType} from "./store";

let initialState : DialogsPageType = {
    dialogs: [
        {
            id: 1,
            name: 'Miha',
            image: 'https://www.internet-technologies.ru/wp-content/uploads/2020/02/49817-307143.png'
        },
        {
            id: 2,
            name: 'Alinka',
            image: 'https://w7.pngwing.com/pngs/458/502/png-transparent-emoji-broken-heart-paw-patrol-love-heart-smiley.png'
        },
        {
            id: 3,
            name: 'Polina',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKBtROJ2Tc0e9-aQ5BlDFo98XliTit9wXjQ&usqp=CAU'
        },
        {id: 4, name: 'Sasha', image: 'https://www.covenok.ru/files/tiny_images/training/161.png'},
        {
            id: 5,
            name: 'Maja',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBPVAZMuLlW2Dfhqtwwp80B3P6TqQQMVdyg&usqp=CAU'
        },
        {
            id: 6,
            name: 'IvanbIch',
            image: 'https://i.pinimg.com/originals/66/12/e2/6612e2d02db90bfa78fd4afb2e2dc15c.jpg'
        },
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Hello'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ONCHANGE-TEXT-AREA-MESSAGES':
            state.newMessageBody = action.body
            return state
        case 'ADD-MESSAGE':
            action.newBody && state.messages.push({id: new Date().getTime(), message: action.newBody})
            state.newMessageBody = ''
            return state
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

export const addMessageAC = (newBody: string) => {
    return {
        type: 'ADD-MESSAGE',
        newBody: newBody
    } as const
}