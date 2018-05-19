import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LOGIN_ROUTE, LOGOUT_ROUTE, SIGNUP_ROUTE } from "/constants";

import "./User.scss";

const User = ({ displayName, isAuthenticated, logout }) => (
    <div className="user">
        <div>
            <i className="fa fa-user"></i>
            {isAuthenticated
                ? (<span>Привет, {displayName}</span>)
                : (<span>Аккаунт</span>)
            }
            <i className="fa fa-caret-down"></i>
        </div>
        <div className="user__dropdown-content">
            {isAuthenticated
                ? <Link to={LOGOUT_ROUTE}
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    Выход
                </Link>
                : <div>
                    <Link to={LOGIN_ROUTE}>Логин</Link>
                    <Link to={SIGNUP_ROUTE}>Регистрация</Link>
                </div>
            }
        </div>
    </div >
);

User.propTypes = {
    displayName: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default User;