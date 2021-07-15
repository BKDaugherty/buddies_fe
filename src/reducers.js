import { combineReducers } from "redux";

// A helper function to create uniform reducers and to avoid switch statements
const createReducer =
	(initialState, actionStateUpdateMap) =>
	(state = initialState, action) => {
		if (!(action.type in actionStateUpdateMap)) {
			console.warn(
				"Action Type " +
					action.type +
					" was not found in the reducer. Returning default state."
			);
			return state;
		} else {
			return actionStateUpdateMap[action.type](state, action);
		}
	};

// Defines all actions that can come from a buddy list
const BuddyActions = {
	create: "buddy/create",
	get_all: "buddy/get_all",
};

// Creates a mapping from the action type to the way in which the action's payload should
// be merged into the state
const buddyActionStateUpdateMap = {
	[BuddyActions.create]: (state, action) => {
		state.pending_buddies.append(action.payload);
	},
	[BuddyActions.get_all]: (state, action) => {
		state.buddies = action.payload;
	},
};

const fakeBuddy = {
	id: "i-am-a-uuid",
	name: "Brendon Daugherty",
	birthday: "10-02-1997",
	notes: "He is my friend",
	location: "San Francisco",
	last_contacted: "07-06-2021",
	user_id: "i-am-the-users-uuid",
};

const fakeBuddy1 = {
	id: "i-am-also-a-uuid",
	name: "Porter Sherman",
	birthday: "10-02-1997",
	notes: "He is my friend",
	location: "San Francisco",
	last_contacted: "07-06-2021",
	user_id: "i-am-the-users-uuid",
};

// Defines the initial application state
const buddyListInitialState = {
	buddies: [fakeBuddy, fakeBuddy1],
	pending_buddies: [],
};

// Handles all actions coming from the buddy list
const buddyListReducer = createReducer(
	buddyListInitialState,
	buddyActionStateUpdateMap
);

// Combine all existing reducers into one that will be applied to the store
const rootReducer = combineReducers({
	buddy_list: buddyListReducer,
});

export default rootReducer;
