import React from "react";
import { Provider } from "react-redux";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";
import userInitializationMiddleware from "/auth/userInitializationMiddleware";
import { INITIAL_ACTION } from "./constants";
import { logoutUser } from "./auth/actions";
import oauthHttpFetcherFactory from "./utils/oauth/oauthHttpFetcherFactory";

const routerMiddleware = createRouterMiddleware(history);

const store = configureStore({
    middleware: applyMiddleware(
        userInitializationMiddleware,
        routerMiddleware,
        thunkMiddleware.withExtraArgument({
            fetcherFactory: oauthHttpFetcherFactory(logoutUser)//,
        }),
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
