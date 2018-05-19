import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";

import { USERS_ROUTE, LOGIN_ROUTE, SURVEYS_ROUTE } from "/constants";
import hasAdminRole from "/utils/authorization/hasAdminRole";

import "./Sidebar.scss";

const Sidebar = ({ roles, isAuthenticated }) => {
    let usersButton = null;
    if (hasAdminRole(roles)) {
        usersButton =
            <Link
                className="sidebar__item"
                to={`${USERS_ROUTE}/1`}>
                Пользователи
            </Link>;
    }
    return (
        isAuthenticated ? (
            <aside className="sidebar">
                <Link
                    className="sidebar__item"
                    to={SURVEYS_ROUTE}>
                    Новый опрос
                </Link>
                <Link
                    className="sidebar__item"
                    to={SURVEYS_ROUTE}>
                    Мои опросы
                </Link>
                <Link
                    className="sidebar__item"
                    to={SURVEYS_ROUTE}>
                    Шаблоны опросов
                </Link>
                {usersButton}
            </aside>
        ) : (
            <aside className="sidebar">
                <Link
                    className="sidebar__item"
                    to={LOGIN_ROUTE}>
                    Новый опрос
                </Link>
                <Link
                    className="sidebar__item"
                    to={LOGIN_ROUTE}>
                        Мои опросы
                </Link>
                <Link
                    className="sidebar__item"
                    to={LOGIN_ROUTE}>
                        Шаблоны опросов
                </Link>
            </aside>
        )
    );
};

Sidebar.propTypes = {
    roles: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Sidebar;