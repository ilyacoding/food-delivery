import { createActions, createErrorAction } from "/utils/redux";
import OAuthService from "/utils/oauth/oAuthService";

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "./actionTypes";

export const { loginStart, loginSuccess } = createActions({
    [LOGIN_START]: (email, password) => ({ email, password }),

    [LOGIN_SUCCESS]: () => { }
});

export const loginError = createErrorAction(LOGIN_ERROR);

export const loginUser = ({ email, password }) => async (dispatch) => {
    // email = "hui@h.ui";
    // password = "qwerty"
    console.log(`${email} ${password} logined`);
    dispatch(loginStart(email, password));
    const service = new OAuthService();
    const result = await service.getAccessToken(email, password);
    console.log(`${result} taken`);
    if (!result.isSuccess) {
        dispatch(loginError(result.error));
        return;
    }
    dispatch(loginSuccess());
};
