import {addPostAC} from './profile-reducer';
import {addMessageAC} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {v1} from 'uuid';

type postType = {
    id: string
    message: string
    likeCounting: number
}

type dialogType = {
    id: string
    name: string
    image: string
}

type messageType = {
    id: string
    message: string
}

type friendType = {
    id: string
    name: string
    image: string
}

type SidebarType = {
    friends: Array<friendType>
}

type ProfilePageType = {
    messageForNewPost: string
    posts: Array<postType>
}

type DialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
}

type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof addMessageAC>

const store: StoreType = {
    _state: {
        profilePage: {
            messageForNewPost: 'XY',
            posts: [
                {id: v1(), message: 'Hi my first message ', likeCounting: 12},
                {id: v1(), message: 'Hello it\'s me ', likeCounting: 23},
            ]
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
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
        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._onChange()
    }
}

