import {ActionsTypes} from './store';
import {v1} from 'uuid';

type FriendType = {
    id: string
    name: string
    image: string
}

let initialState = {
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
    ] as Array<FriendType>
}

export type InitialStateSidebarType = typeof initialState

export const sidebarReducer = (state: InitialStateSidebarType = initialState, action: ActionsTypes): InitialStateSidebarType => {
    return state
}