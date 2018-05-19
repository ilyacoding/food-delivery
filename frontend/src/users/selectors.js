import { createSelector } from "reselect";

export const getUsersFromState = state => state.users;

export const getIsLoading = createSelector(
    getUsersFromState,
    users => users.isLoading
);

export const getUsers = createSelector(
    getUsersFromState,
    users => users.users
);

export const getTotalUsersCount = createSelector(
    getUsersFromState,
    users => users.totalUsersCount
);