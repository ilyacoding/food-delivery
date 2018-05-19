import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { LOGIN_ROUTE } from "/constants";

import { getIsAuthenticated } from "./selectors";

const redirectUnauthenticated = Component => {
    const RedirectUnauthenticated = ({ isAuthenticated, ...restProps }) => {
        if (!isAuthenticated) {
            return (<Redirect to={LOGIN_ROUTE} />);
        }
        return (<Component {...restProps} />);
    };

    RedirectUnauthenticated.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    const mapStateToProps = state => ({
        isAuthenticated: getIsAuthenticated(state)
    });

    return connect(mapStateToProps)(RedirectUnauthenticated);
};

export default redirectUnauthenticated;