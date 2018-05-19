import { createStore } from "redux";

import rootReducer from "./rootReducer";

const configureStore = ({ initialState, middleware }) => {
    return createStore(rootReducer, initialState, middleware);
};

export default configureStore;