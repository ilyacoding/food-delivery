import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, SIGNUP_ROUTE, FORGET_PASSWORD_ROUTE } from '/constants';

import './AuthenticationLinks.scss';

const AuthenticationLinks = () => {
    const currentUrl = location.pathname;

    if (currentUrl === LOGIN_ROUTE) {
        return (
            <div className='authentication-links'>
                <Link to={SIGNUP_ROUTE}>Регистрация</Link>
                // <Link to={FORGET_PASSWORD_ROUTE}>Забыли пароль?</Link>
            </div>
        );
    }
    if (currentUrl === SIGNUP_ROUTE) {
        return (
            <div className="authentication-links">
                <Link to={LOGIN_ROUTE}>Логин</Link>
            </div>
        );
    }
};

export default AuthenticationLinks;
