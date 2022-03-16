import store, {ActionsTypes, ProfilePageType} from "./store";

let initialState: ProfilePageType = {
    messageForNewPost: 'XY',
    posts: [
        {id: 1, message: 'Hi my first message ', likeCounting: 12},
        {id: 2, message: 'Hello it\'s me ', likeCounting: 23},
    ]
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            if (action.postText.trim()) {
                state.messageForNewPost = ''
                return {
                    ...state,
                    posts: [...state.posts, {id: new Date().getTime(), message: action.postText, likeCounting: 0}]
                }
            } else {
                return state
            }
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