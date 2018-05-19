import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NoAccess from "/components/Layout/NoAccess";

import redirectUnauthenticated from "./redirectUnauthenticated";
import { getUserHasRequiredRoles } from "./selectors";

const roleBasedAuthorize = (...requiredRoles) => Component => {
    const RoleBasedAuthorize = ({ userHasRequiredRoles, ...restProps }) => {
        if (!userHasRequiredRoles) {
            return (<NoAccess />);
        }
        return (<Component {...restProps} />);
    };

    RoleBasedAuthorize.propTypes = {
        userHasRequiredRoles: PropTypes.bool.isRequired
    };

    const mapStateToProps = state => ({
        userHasRequiredRoles: getUserHasRequiredRoles(state, requiredRoles)
    });

    return connect(mapStateToProps)(redirectUnauthenticated(RoleBasedAuthorize));
};

export default roleBasedAuthorize;