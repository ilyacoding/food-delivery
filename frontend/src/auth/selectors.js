import { createSelector } from "reselect";
import arrayIntersection from "lodash.intersection";

export const getAuthFromState = state => state.auth;

export const getAuthState = createSelector(
    getAuthFromState,
    auth => auth
);

export const getIsAuthenticated = createSelector(
    getAuthFromState,
    auth => auth.isAuthenticated
);

export const getUser = createSelector(
    getAuthFromState,
    auth => auth.user
);

export const getEmail = createSelector(
    getAuthFromState,
    auth => auth.user.email
);

export const getDisplayName = createSelector(
    getAuthFromState,
    auth => auth.user.displayName
);

export const getRoles = createSelector(
    getAuthFromState,
    auth => auth.user.roles
);

export const getUserHasRequiredRoles = createSelector(
    (state, requiredRoles) => ({
        roles: getRoles(state),
        requiredRoles
    }),
    ({ roles, requiredRoles }) => {
        const userRolesUpper = roles.map(x => x.toUpperCase()).toArray();
        const requiredRolesUpper = requiredRoles.map(x => x.toUpperCase());
        const rolesIntersection = arrayIntersection(userRolesUpper, requiredRolesUpper);

        return rolesIntersection.length > 0;
    }
);

export const getLoginError = createSelector(
    getAuthFromState,
    auth => auth.loginError
);

export const getSignupError = createSelector(
    getAuthFromState,
    auth => auth.signupError
);