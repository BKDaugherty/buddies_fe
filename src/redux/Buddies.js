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
	createBuddy: "buddies/create",
	createInteraction: "buddies/create_interaction",
	startCreateBuddy: "buddies/start_create",
	startCreateInteraction: "buddies/start_create_interaction",
	completeCreateInteraction: "buddies/complete_create_interaction",
};

const buddiesInitialState = {
	getUserData: createAsyncActionInitialState(),
	// Dictionary from buddy-id to buddy
	buddies: {},
	// Dictionary from interaction-id to interaction
	interactions: {},
	// Dictionary from buddy-id to an array of interactions they are associated with
	buddyToInteractionMap: {},
	// Whether or not the user is creating a buddy
	buddyPending: false,
	createBuddy: createAsyncActionInitialState(),
	// A map from buddy-id to the pending interaction for that buddy
	pendingInteractions: {},
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

const createBuddyAction = asyncActionGenerator(
	BuddiesActions.createBuddy,
	(args, dispatch, getState) => {
		const { jwt, user_id } = selectAuthInfo(getState());
		// We are calling the backend directly here. Important
		// that all keys are snake case
		// TODO: Add validation to API call to check this somehow?
		return buddiesService.createBuddy(jwt)({
			user_id,
			...args,
		});
	},
	{
		success_logic: (payload, { args, dispatch, getState }) => {
			// After successful creation, refresh user data
			dispatch(buddiesActionGenerator[BuddiesActions.getUserData]());
		},
		failure_logic: (error, { args, dispatch, getState }) => {},
	}
);

const createBuddyStateUpdateMap = asyncActionStateUpdateMapGenerator(
	BuddiesActions.createBuddy,
	"createBuddy",
	{
		success_logic: (state, action) => {
			state.buddyPending = false;
			return state;
		},
		request_logic: (state, action) => {
			return state;
		},
		failure_logic: (state, action) => {
			return state;
		},
	}
);

const createInteractionAction = asyncActionGenerator(
	BuddiesActions.createInteraction,
	(args, dispatch, getState) => {
		const { jwt, user_id } = selectAuthInfo(getState());
		// We are calling the backend directly here. Important
		// that all keys are snake case
		// TODO: Add validation to API call to check this somehow?
		return buddiesService.createInteraction(jwt)({
			user_id,
			...args,
		});
	},
	{
		success_logic: (payload, { args, dispatch, getState }) => {
			// After successful creation, refresh user data
			dispatch(buddiesActionGenerator[BuddiesActions.getUserData]());
			dispatch({
				type: BuddiesActions.completeCreateInteraction,
				// TODO: Find a less brittle way to do this
				payload: { buddyId: args.participants[0] },
			});
		},
		failure_logic: (error, { args, dispatch, getState }) => {},
	}
);

const createInteractionStateUpdateMap = asyncActionStateUpdateMapGenerator(
	BuddiesActions.createInteraction,
	"createInteraction",
	{
		success_logic: (state, action) => {
			return state;
		},
		request_logic: (state, action) => {
			return state;
		},
		failure_logic: (state, action) => {
			return state;
		},
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
	...createBuddyStateUpdateMap,
	[BuddiesActions.startCreateBuddy]: (state) => {
		state.buddyPending = true;
		return state;
	},
	[BuddiesActions.startCreateInteraction]: (state, action) => {
		const { buddyId } = action.payload;
		state.pendingInteractions[buddyId] = true;
		return state;
	},
	[BuddiesActions.completeCreateInteraction]: (state, action) => {
		console.log(action);
		const { buddyId } = action.payload;
		state.pendingInteractions[buddyId] = false;
		return state;
	},
};

export const buddiesActionGenerator = {
	...getUserDataAction,
	...createBuddyAction,
	...createInteractionAction,
};

// Exports the reducer to the root reducers module.
export const buddiesReducer = createReducer(
	buddiesInitialState,
	buddiesActionStateUpdateMap,
	createInteractionStateUpdateMap
);
