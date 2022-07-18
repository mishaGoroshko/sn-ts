import {follow, InitialStateUsersType, unfollow, UsersReducer} from './users-reducer';


let state: InitialStateUsersType
beforeEach(() => {
    state = {
        users: [
            {
                name: 'Bob',
                id: 0,
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: true,
                status: 'status 1',
            },
            {
                name: 'Bob2',
                id: 1,
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: true,
                status: 'status 2',
            },
            {
                name: 'Bob3',
                id: 2,
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: false,
                status: 'status 3',
            },
        ],
        pageSize: 10,
        totalCountUsers: 0,
        currentPage: 1,
        isFetching: false,
        followArrayId: [] as Array<number>,
        termSearchFilter: '',
        friendFollowFilter: null as null | boolean,
    }
})

test('follow success', () => {
    let newState = UsersReducer(state, follow(2))

    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeTruthy()
})

test('unfollow success', () => {
    let newState = UsersReducer(state, unfollow(0))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
})