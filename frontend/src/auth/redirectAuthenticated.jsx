import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { MAIN_ROUTE } from "/constants";

import { getIsAuthenticated } from "./selectors";

const redirectAuthenticated = Component => {
    const RedirectAuthenticated = ({ isAuthenticated, ...restProps }) => {
        if (isAuthenticated) {
            return (<Redirect to={MAIN_ROUTE} />);
        }
        return (<Component {...restProps} />);
    };

    RedirectAuthenticated.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    const mapStateToProps = state => ({
        isAuthenticated: getIsAuthenticated(state)
    });

    return connect(mapStateToProps)(RedirectAuthenticated);
};

export default redirectAuthenticated;