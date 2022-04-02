import React from 'react';
import s from './Users.module.css'
import {UsersType} from './UsersContainer';
import axios from 'axios';
import userPhoto from '../../Assets/images/userPhoto.png'

export class Users extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    // } можно не писать, если больше ничего в constructor не делаем(была попытка написать axios)
    componentDidMount() {
        alert('componentDidMount')
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => this.props.setUsers(response.data.items))
    }

    componentWillMount() {
        alert('componentWillMount')
    }

    componentWillUnmount() {
        alert('componentWillUnmount')
    }

    componentDidUpdate() {
        alert('componentDidUpdate')
    }

    render() {
        let {users, follow, unfollow, setUsers} = this.props;

        return (
            <div className={s.header}>
                {users.map(u => {
                    return (
                        <div key={u.id} className={s.block}>
                            <div className={s.blockAva}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.image}/>
                                {u.followed
                                    ? <button onClick={() => follow(u.id)} className={s.button}>unfollow</button>
                                    : <button onClick={() => unfollow(u.id)}>follow</button>}
                            </div>
                            <div className={s.allInfo}>
                                <div className={s.nameStatus}>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </div>
                                <div className={s.location}>
                                    <div>{'u.location.country'}</div>
                                    <div>{'u.location.city'}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}