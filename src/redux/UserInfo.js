import {
	createReducer,
	createAsyncActionInitialState,
	asyncActionStateUpdateMapGenerator,
	asyncActionGenerator,
} from "./common";
import { buddiesService } from "../api";

// Defines the high level intent of actions that are possible on
// the userInfo slice of the redux store.
export const UserInfoActions = {
	login: "user/login",
	signUp: "user/sign_up",
};

// Defines the initial state of the user Info slice of the state
const userInfoInitialState = {
	// State controlling the login intent
	login: createAsyncActionInitialState(),
	signUp: createAsyncActionInitialState(),
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

const loginAction = asyncActionGenerator(
	UserInfoActions.login,
	(args, dispatch, getState) => buddiesService.login(args),
	{
		success_logic: (payload, { args, dispatch, getState }) => {},
		failure_logic: (error, { args, dispatch, getState }) => {},
	}
);

const signUpAction = asyncActionGenerator(
	UserInfoActions.signUp,
	(args, dispatch, getState) => buddiesService.signUp(args),
	{
		success_logic: (payload, { args, dispatch, getState }) => {
			// On sign up success, call login
			const loginThunk = userActionGenerator[UserInfoActions.login]({
				email: args.email,
				password: args.password,
			});
			dispatch(loginThunk);
		},
		failure_logic: (error, { args, dispatch, getState }) => {},
	}
);

const signUpActionStateUpdateMap = asyncActionStateUpdateMapGenerator(
	UserInfoActions.signUp,
	"signUp"
);

const loginActionStateUpdateMap = asyncActionStateUpdateMapGenerator(
	UserInfoActions.login,
	"login",
	{
		success_logic: (state, action) => {
			state.authentication.is_authenticated = true;
			state.authentication.jwt = action.payload.jwt;
			state.authentication.id = action.payload.user.id;
			state.user_info.email = action.payload.user.email;
			return state;
		},
		request_logic: (state, action) => state,
		failure_logic: (state, action) => {
			state.authenticated = false;
			return state;
		},
	}
);

export const userActionGenerator = {
	...loginAction,
	...signUpAction,
};

export const userInfoActionStateUpdateMap = {
	...loginActionStateUpdateMap,
	...signUpActionStateUpdateMap,
};

// Exports the reducer to the root reducers module.
export const userInfoReducer = createReducer(
	userInfoInitialState,
	userInfoActionStateUpdateMap
);
