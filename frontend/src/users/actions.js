import { createActions, createErrorActions } from "/utils/redux";

import { REQUEST_USERS_START, REQUEST_USERS_SUCCESS, REQUEST_USERS_ERROR } from "./actionTypes";
import UsersService from "./usersService";

export const { requestUsersStart, requestUsersSuccess } = createActions({
    [REQUEST_USERS_START]: (skip, top) => ({ skip, top }),

    [REQUEST_USERS_SUCCESS]: users => ({ users })
});

export const { requestUsersError } = createErrorActions({
    [REQUEST_USERS_ERROR]: error => error
});

export const fetchUsers = (skip, top) => async (dispatch, getState, { errorTrackerFactory, fetcherFactory }) => {
    dispatch(requestUsersStart(skip, top));
    const errorTracker = errorTrackerFactory(getState());
    const fetcher = fetcherFactory(dispatch, getState);
    const service = new UsersService(errorTracker, fetcher);
    const result = await service.fetchUsers(skip, top);

    if (!result.isSuccess) {
        dispatch(requestUsersError(result.error));
        return;
    }

    dispatch(requestUsersSuccess(result.data));
};