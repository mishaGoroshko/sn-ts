import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {HeaderType} from './HeaderContainer';

const Header: React.FC<HeaderType> = ({login, isAuth, logoutAuthTC}) => {

    // const dispatch = useDispatch()

    const logout = () => logoutAuthTC()

    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png"
                alt=""/>

            <div className={s.login}>
                {isAuth
                    ? <div>
                        {login}
                        <button onClick={logout}>logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;