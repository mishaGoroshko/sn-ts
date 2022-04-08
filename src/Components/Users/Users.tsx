import React from 'react';
import s from './Users.module.css'
import {UsersType} from './UsersContainer';
import axios from 'axios';
import userPhoto from '../../Assets/images/userPhoto.png'

export class Users extends React.Component<UsersType> {
    // constructor(props: UsersType) {
    //     super(props);
    // } можно не писать, если больше ничего в constructor не делаем(была попытка написать axios), все sideEffects делать в componentDidMount():
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsers(response.data.items))
    }


    render() {
        let {users, follow, unfollow, setUsers, pageSize, totalCountUsers, currentPage, setCurrentPage} = this.props;

        let totalPages = Math.ceil(totalCountUsers / pageSize)

        let pages = [...Array(totalPages)].map((_, i) => i + 1)
        // let pages = []
        // for (let i = 1; i <= totalPages; i++)
        //     pages.push(i)
        return (
            <div className={s.header}>
                <div>
                    {pages.map((p, i) => {
                        return <span key={i}
                                     className={p === currentPage ? s.active : s.item}
                                     onClick={() => this.onPageChanged(p)}>{p}</span>
                    })}
                </div>
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