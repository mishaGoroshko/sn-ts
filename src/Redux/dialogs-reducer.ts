import {ActionsTypes, DialogsPageType, ProfilePageType} from "./state";

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
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