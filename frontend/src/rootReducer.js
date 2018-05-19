import { combineReducers } from "redux-immutable";
import { Record } from "immutable";

//import surveysReducer from "./surveys/reducer";
//import users from "./users/reducer";
import auth from "./auth/reducer";

const FoodDeliveryState = Record({
    //surveys: List(),
    //users: users.defaultState(),
    auth: auth.defaultState()
});

const rootReducer = combineReducers({
    // surveys: surveysReducer,
    auth: auth.reducer//,
    //users: users.reducer
}, FoodDeliveryState);

export default rootReducer;