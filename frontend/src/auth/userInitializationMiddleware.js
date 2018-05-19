import { accessTokenStore } from "/utils/oauth/authTokenStores";

import { setCurrentUser } from "./actions";
import { getIsAuthenticated } from "./selectors";

const userInitializationMiddleware = store => next => action => {
    if (getIsAuthenticated(store.getState())) {
        return next(action);
    }

    const decoded = accessTokenStore.getDecoded();
    if (decoded) {
        next(setCurrentUser(decoded));
    }

    return next(action);
};

export default userInitializationMiddleware;
