import React from "react";
import { Route } from "react-router-dom";

import { MAIN_ROUTE, SURVEYS_ROUTE, LOGIN_ROUTE, USERS_ROUTE, SIGNUP_ROUTE } from "/constants";
import { LoginForm, SignupForm } from "/auth";
import UsersContainer from "/users";
import SidebarContainer from "/containers/SidebarContainer";
import SurveyList from "/surveys";

import "./Main.scss";

const Main = () => (
    <main className="main">
        <div className="main__sidebar">
            <SidebarContainer />
        </div>
        <section className="main__content">
            <Route path={MAIN_ROUTE} />
            <Route path={SURVEYS_ROUTE} component={SurveyList} />

            <Route path={LOGIN_ROUTE} component={LoginForm} />
            <Route path={SIGNUP_ROUTE} component={SignupForm} />
            <Route path={`${USERS_ROUTE}/:page`} component={UsersContainer} />
            <Route exact path={USERS_ROUTE} component={UsersContainer} />
        </section>
    </main>
);

export default Main;
