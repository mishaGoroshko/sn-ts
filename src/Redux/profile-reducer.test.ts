import {
    addPostAC, deletePostAC,
    initialStateProfileType,
    PostType,
    profileReducer
} from './profile-reducer';
import {v1} from 'uuid';

let initialState: initialStateProfileType
beforeEach(() => {
    let user2 = {
        'aboutMe': 'я круто чувак 1001%',
        'contacts': {
            'facebook': 'facebook.com',
            'website': null,
            'vk': 'vk.com/dimych',
            'twitter': 'https://twitter.com/@sdf',
            'instagram': 'instagra.com/sds',
            'youtube': null,
            'github': 'github.com',
            'mainLink': null
        },
        'lookingForAJob': true,
        'lookingForAJobDescription': 'не ищу, а дурачусь',
        'fullName': 'samurai dimych',
        'userId': 2,
        'photos': {
            'small': 'https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0',
            'large': 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0'
        }
    }

    initialState = {
        posts: [
            {id: v1(), message: 'Hi my first message ', likeCounting: 12},
            {id: '1234', message: 'Hello it\'s me ', likeCounting: 23},
        ] as Array<PostType>,
        userProfile: user2,
        status: '',
        initialized: false
    }
});

test('new post should be added', () => {

    let newState = profileReducer(initialState, addPostAC('HELLO'))

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].likeCounting).toBe(0)
})


test('new post should be save new message', () => {

    let newState = profileReducer(initialState, addPostAC('HELLO'))

    expect(newState.posts[2].message).toBe('HELLO')
})


test('post should be removed', () => {

    let newState = profileReducer(initialState, deletePostAC('1234'))

    expect(newState.posts.length).toBe(1)
})
