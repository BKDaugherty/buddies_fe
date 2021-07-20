import {
	createReducer,
	createAsyncActionInitialState,
	selectAuthInfo,
	asyncActionStateUpdateMapGenerator,
	asyncActionGenerator,
} from "./common";
import { buddiesService } from "../api";

// Defines the high level intent of actions that are possible on
// the buddies slice of the redux store.
export const BuddiesActions = {
	getUserData: "buddies/get",
};

const buddiesInitialState = {
	getUserData: createAsyncActionInitialState(),
	// Dictionary from buddy-id to buddy
	buddies: {},
	// Dictionary from interaction-id to interaction
	interactions: {},
	// Dictionary from buddy-id to an array of interactions they are associated with
	buddyToInteractionMap: {},
};

const getUserDataAction = asyncActionGenerator(
	BuddiesActions.getUserData,
	(args, dispatch, getState) => {
		const { jwt, user_id } = selectAuthInfo(getState());
		return buddiesService.getUserData(jwt)({ userId: user_id });
	},
	{
		success_logic: (payload, dispatch, getState) => {},
		failure_logic: (error, dispatch, getState) => {},
	}
);

const getUserDataStateUpdateMap = asyncActionStateUpdateMapGenerator(
	BuddiesActions.getUserData,
	"getUserData",
	{
		success_logic: (state, action) => {
			state.buddies = action.payload.buddies;
			state.interactions = action.payload.interactions;
			state.buddyToInteractionMap = action.payload.buddyToInteractionMap;
			return state;
		},
		request_logic: (state, action) => state,
		failure_logic: (state, action) => state,
	}
);

export const buddiesActionStateUpdateMap = {
	...getUserDataStateUpdateMap,
};

export const buddiesActionGenerator = {
	...getUserDataAction,
};

// Exports the reducer to the root reducers module.
export const buddiesReducer = createReducer(
	buddiesInitialState,
	buddiesActionStateUpdateMap
);
