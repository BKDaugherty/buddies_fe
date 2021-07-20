import {
	createReducer,
	asyncStateRequest,
	asyncStateSuccess,
	asyncStateFailure,
	createAsyncActionInitialState,
	selectAuthInfo,
} from "./common";
import { buddiesService } from "../api";

// Defines the high level intent of actions that are possible on
// the userInfo slice of the redux store.
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

// Almost an exact copy pasta of userActionGenerator. You can do betterrrrr
export const buddiesActionGenerator = {
	[BuddiesActions.getUserData]: () => (dispatch, getState) => {
		// Get the active User Id, and JWT
		const { jwt, user_id } = selectAuthInfo(getState());

		dispatch({ type: BuddiesActions.getUserData + "/request" });
		buddiesService
			.getUserData(jwt)(user_id)
			.then((payload) => {
				dispatch({
					type: BuddiesActions.getUserData + "/success",
					payload,
				});
			})
			.catch((error) => {
				dispatch({
					type: BuddiesActions.getUserData + "/failure",
					payload: error,
				});
				console.error("Something went wrong: " + error);
			});
	},
};

// This feels like it can be generated to. Pass in a fn to do on success and failure.
// Or should this be middleware?
const buddiesActionStateUpdateMap = {
	[BuddiesActions.getUserData + "/request"]: (state, action) => {
		state.getUserData = asyncStateRequest(state.getUserData);
		return state;
	},
	[BuddiesActions.getUserData + "/failure"]: (state, action) => {
		state.getUserData = asyncStateFailure(state.getUserData);
		return state;
	},
	[BuddiesActions.getUserData + "/success"]: (state, action) => {
		state.getUserData = asyncStateSuccess(state.getUserData);
		state.buddies = action.payload.buddies;
		state.interactions = action.payload.interactions;
		state.buddyToInteractionMap = action.payload.buddyToInteractionMap;
		return state;
	},
};

// Exports the reducer to the root reducers module.
export const buddiesReducer = createReducer(
	buddiesInitialState,
	buddiesActionStateUpdateMap
);
