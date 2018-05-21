import { List } from "immutable";

import { createActions } from "/utils/redux";
import OAuthService from "/utils/oauth/oAuthService";

import { SET_CURRENT_USER, LOGOUT } from "./actionTypes";
import UserRecord from "./UserRecord";

export const { setCurrentUser, logout } = createActions({
    [SET_CURRENT_USER]: decodedToken => {
        const user = new UserRecord({
            id: decodedToken.id,
            email: decodedToken.sub,
            displayName: decodedToken.name,
            roles: new List(decodedToken.scopes)
        });
        return ({ user });
    },

    [LOGOUT]: () => { }
});

export const logoutUser = () => dispatch => {
    const service = new OAuthService();
    service.logout();
    dispatch(logout());
};
