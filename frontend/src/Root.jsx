import React from "react";
import { Provider } from "react-redux";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";

//import { createLogger } from "redux-logger";

import App from "./App";
import configureStore from "./configureStore";
// import refreshAccessTokenMiddleware from "./utils/oauth/refreshAccessTokenMiddleware";
import userInitializationMiddleware from "/auth/userInitializationMiddleware";
import { INITIAL_ACTION } from "./constants";
import { logoutUser } from "./auth/actions";
import oauthHttpFetcherFactory from "./utils/oauth/oauthHttpFetcherFactory";
// import errorTracker from "./utils/errorTracking";
// import * as config from "./config";
// import { getEmail } from "./auth/selectors";
// import { UnsuccessfulFetchError } from "/utils/http";

const routerMiddleware = createRouterMiddleware(history);
//const loggerMiddleware = createLogger();

// errorTracker.setup(config);
// function contextualErrorTrackerFactory(state) {
//     const email = getEmail(state);
//     const currentUserContext = {
//         email
//     };
//
//     return ({
//         trackMessage: function (message) {
//             errorTracker.trackMessage(message, currentUserContext);
//         },
//         trackError: function (error) {
//             errorTracker.trackError(error, currentUserContext);
//         },
//         trackUnsuccessfulResponse: function (response) {
//             const error = new UnsuccessfulFetchError(response);
//             this.trackError(error);
//         }
//     });
// }

const store = configureStore({
    middleware: applyMiddleware(
        userInitializationMiddleware,
        routerMiddleware,
        // refreshAccessTokenMiddleware(logoutUser, contextualErrorTrackerFactory),
        thunkMiddleware.withExtraArgument({
            fetcherFactory: oauthHttpFetcherFactory(logoutUser)//,
            //errorTrackerFactory: contextualErrorTrackerFactory
        }),
        //loggerMiddleware,
    )
});

store.dispatch({ type: INITIAL_ACTION });

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Root;
