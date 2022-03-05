import React from 'react';
import s from './Navbar.module.css'
import {Link, NavLink} from "react-router-dom";
import {friendType} from "../../Redux/state";
import {Friends} from "../Friends/Friends";
import {futimes} from "fs";

type NavbarType = {
    friends: Array<friendType>
}

const Navbar: React.FC<NavbarType> = ({friends}) => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'}
                         className={navClick => navClick.isActive ? s.active : s.item}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'} className={navClick => navClick.isActive ? s.active : s.item}>
                    Message
                </NavLink>
            </div>
            <div>
                <NavLink to={'/news'} className={navClick => navClick.isActive ? s.active : s.item}>
                    News
                </NavLink>
            </div>
            <div>
                <NavLink to={'/Music'} className={navClick => navClick.isActive ? s.active : s.item}>
                    Music
                </NavLink>
            </div>
            <div className={s.settings}>
                <NavLink to={'/Settings'} className={navClick => navClick.isActive ? s.active : s.item}>
                    Settings
                </NavLink>
            </div>
            <div className={s.friends}>
                <NavLink to={'/friends/'} className={navClick => navClick.isActive ? s.active : s.item}>
                    FRIENDS
                </NavLink>
            </div>
            <Friends friends={friends}/>

        </nav>
    );
};

export default Navbar;