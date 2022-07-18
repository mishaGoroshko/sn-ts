import {
    deleteFollowTC,
    follow,
    postFollowTC,
    toggleDisabled,
    unfollow
} from './users-reducer';
import {ResponseAPIType, userAPI} from '../API/api';
import {RESULTS_CODE_SUCCESS} from '../constants';

jest.mock('../API/api')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const result: ResponseAPIType = {
    resultCode: RESULTS_CODE_SUCCESS,
    messages: [],
    data: {},
    fieldsErrors: []
}

const dispatchMock = jest.fn()
const getState = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getState.mockClear()
    // userAPIMock.postFollow.mockClear()
    // userAPIMock.deleteFollow.mockClear()
})


test('follow thunk should be success', async () => {
    userAPIMock.postFollow.mockReturnValue(Promise.resolve(result))

    const thunk = postFollowTC(1)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleDisabled(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleDisabled(1, false))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, follow(1))


})
test('unfollow thunk should be success', async () => {
    userAPIMock.deleteFollow.mockReturnValue(Promise.resolve(result))

    const thunk = deleteFollowTC(1)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleDisabled(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleDisabled(1, false))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, unfollow(1))


})