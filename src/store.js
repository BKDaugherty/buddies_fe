import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composedEnhancer = composeWithDevTools(
	// Add thunk middleware to allow for asynchronous dispatch via the store.
	// Also, pass every thunk the buddies_service API
	applyMiddleware(thunk)
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
