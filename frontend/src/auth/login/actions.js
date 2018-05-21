import { createActions, createErrorAction } from "/utils/redux";
import OAuthService from "/utils/oauth/oAuthService";

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "./actionTypes";

export const { loginStart, loginSuccess } = createActions({
    [LOGIN_START]: (email, password) => ({ email, password }),

    [LOGIN_SUCCESS]: () => { }
});

export const loginError = createErrorAction(LOGIN_ERROR);

export const loginUser = ({ email, password }) => async (dispatch) => {
    dispatch(loginStart(email, password));
    const service = new OAuthService();
    const result = await service.getAccessToken(email, password);
    if (!result.isSuccess) {
        dispatch(loginError(result.error));
        return;
    }
    dispatch(loginSuccess());
};
