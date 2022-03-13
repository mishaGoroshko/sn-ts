import store, {ActionsTypes, ProfilePageType} from "./state";

export const proofileReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            action.postText && state.posts.push({
                id: new Date().getTime(),
                message: action.postText,
                likeCounting: 0
            })
            state.messageForNewPost = ''
            return state;
        case 'ONCHANGE-TEXT-AREA':
            state.messageForNewPost = action.newText
            return state;
        default:
            return state
    }
}

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}

export const onchangeTextareaHandlerAC = (newText: string) => {
    return {
        type: "ONCHANGE-TEXT-AREA",
        newText: newText
    } as const
}