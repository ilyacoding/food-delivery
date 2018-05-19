import { handleActions } from "redux-actions";
import { List, Record } from "immutable";

import mapJsonArrayToListOfRecords from "/utils/mapping/mapJsonArrayToListOfRecords";
import { TypedErrorDescription } from "/utils/serviceResult";

import { REQUEST_USERS_SUCCESS, REQUEST_USERS_START, REQUEST_USERS_ERROR } from "./actionTypes";
import UserRecord from "./UserRecord";

export const UsersStateRecord = Record({
    totalUsersCount: 0,
    users: new List(),
    isLoading: false,
    error: new TypedErrorDescription()
});

export const usersReducer = handleActions({
    [REQUEST_USERS_START]: state =>
        state.set("isLoading", true).set("error", state.error.clear()),

    [REQUEST_USERS_SUCCESS]: (state, { payload: { users } }) => {
        const usersList = mapJsonArrayToListOfRecords(users.data, UserRecord);
        return state.set("totalUsersCount", users.totalItemsCount).set("users", usersList)
            .set("isLoading", false).set("error", state.error.clear());
    },

    [REQUEST_USERS_ERROR]: (state, { payload }) => 
        state.set("isLoading", false).set("error", payload.errorDescription)
}, {});

export default { defaultState: UsersStateRecord, reducer: usersReducer };