import {ActionsTypes} from './store';
import {v1} from 'uuid';

type PostType = {
    id: string
    message: string
    likeCounting: number
}

let initialState = {
    messageForNewPost: 'XY',
    posts: [
        {id: v1(), message: 'Hi my first message ', likeCounting: 12},
        {id: v1(), message: 'Hello it\'s me ', likeCounting: 23},
    ] as Array<PostType>
}

export type initialStateProfileType = typeof initialState

export const profileReducer = (state: initialStateProfileType = initialState, action: ActionsTypes): initialStateProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            if (state.messageForNewPost.trim()) {
                return {
                    ...state, messageForNewPost: '',
                    posts: [...state.posts, {id: v1(), message: state.messageForNewPost.trim(), likeCounting: 0}]
                }
            } else return {...state, messageForNewPost: ''}
        case 'ONCHANGE-TEXT-AREA':
            return {...state, messageForNewPost: action.newText};
        default:
            return state
    }
}


export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const onchangeTextareaHandlerAC = (newText: string) => {
    return {
        type: 'ONCHANGE-TEXT-AREA',
        newText: newText
    } as const
}