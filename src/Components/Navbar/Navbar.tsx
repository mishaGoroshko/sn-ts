import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom';

type NavbarType = {}

const Navbar: React.FC<NavbarType> = ({...props}) => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    Profile
                </NavLink>
            </div>
            {/*<div>*/}
            {/*    <NavLink to={'/dialogs'}*/}
            {/*             className={({isActive}) => isActive ? s.active : s.item}>*/}
            {/*        Message*/}
            {/*    </NavLink>*/}
            {/*</div>*/}
            <div>
                <NavLink to={'/chatPage'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    Chat
                </NavLink>
            </div>
            <div>
                <NavLink to={'/news'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    News
                </NavLink>
            </div>
            <div>
                <NavLink to={'/Music'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    Music
                </NavLink>
            </div>
            <div className={s.marginSettings}>
                <NavLink to={'/users'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    Users
                </NavLink>
            </div>
            <div className={s.marginSettings}>
                <NavLink to={'/Settings'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    Settings
                </NavLink>
            </div>
            <div className={s.friends}>
                <NavLink to={'/friends'}
                         className={({isActive}) => isActive ? s.active : s.item}>
                    FRIENDS
                </NavLink>
            </div>

        </nav>
    );
};

export default Navbar;