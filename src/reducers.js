import { combineReducers } from "redux";
import { buddiesReducer, userInfoReducer } from "./redux";

// Combine all existing reducers into one that will be applied to the store
const rootReducer = combineReducers({
	buddies: buddiesReducer,
	user: userInfoReducer,
});

export default rootReducer;
