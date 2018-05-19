import React from "react";
import { Link } from "react-router-dom";

import { MAIN_ROUTE, SURVEYS_ROUTE, ABOUT_ROUTE } from "/constants";
import User from "/containers/UserContainer";

import logo from "./logo.png";
import "./Header.scss";

const Header = () => (
    <header className="header">
        <div className="header__logo header__block" >
            <Link to={MAIN_ROUTE} className="header__link">
                <img src={logo} alt="logo" />
            </Link>
        </div>

        <div className="header__block">
            <div className="header__item">
                <Link to={SURVEYS_ROUTE} className="header__link">Опросы</Link>
            </div>

            <div className="header__item">
                <Link to={ABOUT_ROUTE} className="header__link">О компании</Link>
            </div>

            <div className="header__item">
                <User />
            </div>
        </div>
    </header>
);

export default Header;
