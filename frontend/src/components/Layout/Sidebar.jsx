import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import { DownloadUsersDoc, DownloadMenusDoc, DownloadOrdersDoc, DownloadCategoriesDoc, DownloadDurationsDoc } from "./constants";
import Spinner from "/components/Spinner/Spinner";

import "./Sidebar.scss";

const Sidebar = ({ isAuthenticated }) => {
    return (
        isAuthenticated ? (
            <aside className="sidebar">
                <a  className="sidebar__item"
                    href={DownloadUsersDoc}>
                    Мои пользователи
                </a>
                <a  className="sidebar__item"
                    href={DownloadMenusDoc}>
                    Мои меню
                </a>
                <a  className="sidebar__item"
                    href={DownloadOrdersDoc}>
                    Мои заказы
                </a>
                <a  className="sidebar__item"
                    href={DownloadCategoriesDoc}>
                    Мои категории
                </a>
                <a  className="sidebar__item"
                    href={DownloadDurationsDoc}>
                    Мои длительности заказов
                </a>
            </aside>
        ) : (
            <Spinner />
        )
    );
};

Sidebar.propTypes = {
    roles: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Sidebar;
