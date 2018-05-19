import { createActions, createErrorActions } from "/utils/redux";

import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actionTypes";
import { loginUser } from "../login/actions";
import SignupService from "./signupService";

export const { signupStart, signupSuccess } = createActions({
    [SIGNUP_START]: (email, password, birthday, phoneNumber, firstName, lastName, role) => ({ email, password, birthday, phoneNumber, firstName, lastName, role }),

    [SIGNUP_SUCCESS]: () => { }

    // [CHECK_IS_EMAIL_OCCUPIED_START]: email => ({ email }),

    // [CHECK_IS_EMAIL_OCCUPIED_SUCCESS]: () => { }
});

export const { signupError } = createErrorActions({
    [SIGNUP_ERROR]: error => error});

export const signupUser = ({ email, password, birthday, phoneNumber, firstName, lastName, role }) => async (dispatch) => {
    dispatch(signupStart(email, password, birthday, phoneNumber, firstName, lastName, role));
    // const errorTracker = errorTrackerFactory(getState());
    const service = new SignupService();
    console.log(`role in actions ${role}`);
    const result = await service.signup(email, password, birthday, phoneNumber, firstName, lastName, role);

    if (!result.isSuccess) {
        dispatch(signupError(result.error));
        return;
    }
    console.log(`${email} ${password} in actions `);
    // dispatch(signupSuccess());
    dispatch(loginUser({ email: email, password: password }));
};

// export const checkIsEmailOccupied = (email) => async (dispatch, getState, { errorTrackerFactory }) => {
//     dispatch(checkIsEmailOccupiedStart(email));
//     const errorTracker = errorTrackerFactory(getState());
//     const service = new SignupService(errorTracker);
//     const result = await service.checkIsEmailOccupied(email);
//
//     if (!result.isSuccess) {
//         dispatch(checkIsEmailOccupiedError(result.error));
//         return;
//     }
//
//     dispatch(checkIsEmailOccupiedSuccess());
// };
