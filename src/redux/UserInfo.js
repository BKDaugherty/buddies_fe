import {
	createReducer,
	asyncStateRequest,
	asyncStateSuccess,
	asyncStateFailure,
	createAsyncActionInitialState,
} from "./common";
import { buddiesService } from "../api";

// Defines the high level intent of actions that are possible on
// the userInfo slice of the redux store.
export const UserInfoActions = {
	login: "user/login",
};

// Defines the initial state of the user Info slice of the state
const userInfoInitialState = {
	// State controlling the login intent
	login: createAsyncActionInitialState(),
	// Information related to authentication
	authentication: {
		// Whether or not the user is authenticated
		is_authenticated: false,
		// The JWT of the user for the current session
		jwt: "",
		// The user's id
		id: "",
	},
	// Information about the user
	user_info: {
		// The user's email
		email: "",
	},
};

// Given an action name, returns a function that can dispatch an action
// to perform the work associated with an action.
// TODO: Make this generic.
export const userActionGenerator = {
	// Here's an example of this defined literally. Can we generate this?
	[UserInfoActions.login]: (email, password) => (dispatch) => {
		// Let the redux store know that we are requesting to login
		dispatch({ type: UserInfoActions.login + "/request" });
		buddiesService
			.login(email, password)
			.then((payload) => {
				// Pass whatever the REST API gave to the corresponding reducer
				dispatch({
					type: UserInfoActions.login + "/success",
					payload,
				});
			})
			.catch((error) => {
				// How do I surface this error to the user in a unified and
				// helpful way?  Should the most recent error message should be
				// stored? Also there should be a utility to process this
				// error. Do we decide this is an error based on  status code?
				dispatch({
					type: UserInfoActions.login + "/failure",
					payload: error,
				});
				console.error("Something went wrong: " + error);
			});
	},
};

// Maps an action name to the update logic that should be performed
// when an action has been completed.
const userInfoActionStateUpdateMap = {
	[UserInfoActions.login + "/request"]: (state, action) => {
		state.login = asyncStateRequest(state.login);
		return state;
	},
	[UserInfoActions.login + "/failure"]: (state, action) => {
		state.login = asyncStateFailure(state.login);
		state.authenticated = false;
		return state;
	},
	[UserInfoActions.login + "/success"]: (state, action) => {
		state.login = asyncStateSuccess(state.login);
		state.authentication.is_authenticated = true;
		state.authentication.jwt = action.payload.jwt;
		state.authentication.id = action.payload.user.id;
		state.user_info.email = action.payload.user.email;
		return state;
	},
};

// Exports the reducer to the root reducers module.
export const userInfoReducer = createReducer(
	userInfoInitialState,
	userInfoActionStateUpdateMap
);
