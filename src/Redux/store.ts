import {addPostAC, onchangeTextareaHandlerAC, profileReducer} from "./profile-reducer";
import {addMessageAC, dialogsReducer, onchangeTextAreaMessageAC} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

export type postType = {
    id: number
    message: string
    likeCounting: number
}

export type dialogType = {
    id: number
    name: string
    image: string
}

export type messageType = {
    id: number
    message: string
}

export type friendType = {
    id: number
    name: string
    image: string
}

export type SidebarType = {
    friends: Array<friendType>
}

export type ProfilePageType = {
    messageForNewPost: string
    posts: Array<postType>
}

export type DialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof onchangeTextareaHandlerAC>
    | ReturnType<typeof onchangeTextAreaMessageAC>
    | ReturnType<typeof addMessageAC>

const store: StoreType = {
    _state: {
        profilePage: {
            messageForNewPost: 'XY',
            posts: [
                {id: 1, message: 'Hi my first message ', likeCounting: 12},
                {id: 2, message: 'Hello it\'s me ', likeCounting: 23},
            ]
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
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
            ]
        }
    },
    _onChange() {
        console.log('Hello')
    },
    subscribe(callback: () => void) {
        this._onChange = callback
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._onChange()
    }
}

export default store