import { combineReducers } from "redux-immutable";
import { Record } from "immutable";

import auth from "./auth/reducer";

const FoodDeliveryState = Record({
    auth: auth.defaultState()
});

const rootReducer = combineReducers({
    auth: auth.reducer
}, FoodDeliveryState);

export default rootReducer;
