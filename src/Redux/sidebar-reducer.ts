import {ActionsTypes, SidebarType} from "./store";

let initialState : SidebarType= {
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

export const sidebarReducer = (state: SidebarType = initialState, action: ActionsTypes) => {
    return state
}