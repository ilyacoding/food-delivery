import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, SIGNUP_ROUTE } from '/constants';

import './AuthenticationLinks.scss';

const AuthenticationLinks = () => {
    const currentUrl = location.pathname;

    if (currentUrl === LOGIN_ROUTE) {
        return (
            <div className='authentication-links'>
                <Link to={SIGNUP_ROUTE}>Регистрация</Link>
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
