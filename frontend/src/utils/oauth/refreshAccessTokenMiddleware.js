// import throttle from "lodash.throttle";

// import systemClock from "/utils/systemClock";

// import { accessTokenStore } from "./authTokenStores";
//import OAuthService, { RefreshAccessTokenErrorType } from "./oAuthService";

export default () => () => next => {
    // const msPerSec = 1000;
    // const secPerMin = 60;

    // const throttlePeriodicityInMinutes = 1;

    // const throttledUpdate = throttle(async () => {
    //     const decoded = accessTokenStore.getDecoded();
    //     const tokenExpirationTicks = decoded.exp * msPerSec;

    //     const thresholdMinutes = 5;
    //     const now = systemClock.now();
    //     const timeThresholdTicks = now.setMinutes(now.getMinutes() + thresholdMinutes);

    //     if (tokenExpirationTicks - timeThresholdTicks <= 0) {
    //         const errorTracker = errorTrackerFactory(getState());
    //         const service = new OAuthService(errorTracker);
    //         const result = await service.refreshAccessToken();
    //         if (!result.isSuccess
    //             && result.error.type === RefreshAccessTokenErrorType.INVALID_REFRESH_TOKEN) {
    //             next(logoutUser());
    //         }
    //     }
    // }, throttlePeriodicityInMinutes * secPerMin * msPerSec);

    return async action => {
        // const accessToken = accessTokenStore.get();
        // if (!accessToken) {
        //     return next(action);
        // }

        // throttledUpdate();

        return next(action);
    };
};
