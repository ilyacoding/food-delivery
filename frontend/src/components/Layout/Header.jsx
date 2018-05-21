import React from "react";
import { Link } from "react-router-dom";

import { MAIN_ROUTE } from "/constants";
import User from "/containers/UserContainer";

import logo from "./logo.png";
import "./Header.scss";

const Header = () => (
    <header className="header">
        <div className="header__logo header__block" >
            <Link to={MAIN_ROUTE} className="header__link">
                <img src={logo} alt="logo" width="70" height="70"/>
            </Link>
        </div>

        <div className="header__block">
            <div className="header__item">
                <User />
            </div>
        </div>
    </header>
);

export default Header;
