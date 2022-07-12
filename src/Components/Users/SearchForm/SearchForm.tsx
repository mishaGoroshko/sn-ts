import React, {ChangeEvent, MutableRefObject, useEffect, useRef} from 'react';
import {useAppSelector} from '../../../Redux/redux-store';
import {
    getIsFetching,
    getPageSize, getUsersTC,
    selectFriendFollowFilter,
    selectTermSearchFilter, setFriendFollowFilter, setTernSearchFilter
} from '../../../Redux/users-reducer';
import {useDispatch} from 'react-redux';

export const SearchForm = () => {
    const termSearchFilter = useAppSelector(selectTermSearchFilter)
    const friendFollowFilter = useAppSelector(selectFriendFollowFilter)
    const pageSize = useAppSelector(getPageSize)
    const isFetching = useAppSelector(getIsFetching)
    const dispatch = useDispatch()

    const timeoutId = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (termSearchFilter === '') {
            dispatch(getUsersTC({
                page: 1,
                count: pageSize,
                term: termSearchFilter,
                friend: friendFollowFilter!
            }))
        } else {
            timeoutId.current = setTimeout(() => {
                dispatch(getUsersTC({
                    page: 1,
                    count: pageSize,
                    term: termSearchFilter,
                    friend: friendFollowFilter!
                }))
            }, 500)
        }
        return () => {
            clearTimeout(timeoutId.current);
        }
    }, [termSearchFilter, friendFollowFilter])

    const onChangeTermHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTernSearchFilter(e.currentTarget.value))
    }

    const onChangeFriendFollow = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFriendFollowFilter(e.currentTarget.value === 'null' ? null : e.currentTarget.value === 'true'))
    }

    return (
        <div>
            <input placeholder={'search users'} type="text"
                   value={termSearchFilter}
                   onChange={onChangeTermHandler}
                   disabled={isFetching}/>
            <select value={String(friendFollowFilter)}
                    onChange={onChangeFriendFollow}
                    disabled={isFetching}
                    name="select" id="select">
                <option value="null">all users</option>
                <option value="true">follow</option>
                <option value="false">unfollow</option>
            </select>
        </div>
    );
}