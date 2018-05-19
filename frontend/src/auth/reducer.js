import { Record } from "immutable";

import { handleActions } from "/utils/redux";
import { TypedErrorDescription } from "/utils/serviceResult";

import UserRecord from "./UserRecord";
import { SET_CURRENT_USER, LOGOUT } from "./actionTypes";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "./login/actionTypes";
import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./signup/actionTypes";

export const AuthStateRecord = Record({
    user: new UserRecord(),
    isAuthenticated: false,
    loginError: new TypedErrorDescription(),
    signupError: new TypedErrorDescription()
});

export const authReducer = handleActions({
    [SET_CURRENT_USER]: (state, { payload: { user } }) =>
        state.set("user", user).set("isAuthenticated", true),

    [LOGOUT]: state =>
        state.clear(),

    [LOGIN_START]: state =>
        state.set("loginError", state.loginError.clear()),

    [LOGIN_SUCCESS]: state =>
        state.set("loginError", state.loginError.clear()),

    [LOGIN_ERROR]: (state, { payload }) =>
        state.set("loginError", payload.errorDescription),

    [SIGNUP_START]: state =>
        state.set("signupError", state.signupError.clear()),

    [SIGNUP_SUCCESS]: state =>
        state.set("signupError", state.signupError.clear()),

    [SIGNUP_ERROR]: (state, { payload }) =>
        state.set("signupError", payload.errorDescription)
}, AuthStateRecord);

export default { defaultState: AuthStateRecord, reducer: authReducer };
