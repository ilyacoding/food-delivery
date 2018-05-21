import { createActions, createErrorActions } from "/utils/redux";

import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actionTypes";
import { loginUser } from "../login/actions";
import SignupService from "./signupService";

export const { signupStart, signupSuccess } = createActions({
    [SIGNUP_START]: (email, password, birthday, phoneNumber, firstName, lastName, role) => ({ email, password, birthday, phoneNumber, firstName, lastName, role }),

    [SIGNUP_SUCCESS]: () => { }
});

export const { signupError } = createErrorActions({
    [SIGNUP_ERROR]: error => error});

export const signupUser = ({ email, password, birthday, phoneNumber, firstName, lastName, role }) => async (dispatch) => {
    dispatch(signupStart(email, password, birthday, phoneNumber, firstName, lastName, role));
    const service = new SignupService();
    const result = await service.signup(email, password, birthday, phoneNumber, firstName, lastName, role);

    if (!result.isSuccess) {
        dispatch(signupError(result.error));
        return;
    }
    dispatch(loginUser({ email: email, password: password }));
};
