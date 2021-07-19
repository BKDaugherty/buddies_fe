import { combineReducers } from "redux";
// TODO -> Make this follow the index.js pattern
import { userInfoReducer } from "./redux/UserInfo";
import { createReducer } from "./redux/common";

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
		return state;
	},
	[BuddyActions.get_all]: (state, action) => {
		state.buddies = action.payload;
		return state;
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

// This is hard. Requires me to know arguments of internal function.
// Should they all just take kwargs objects?
// Or maybe I could pass it in?
/* const create_work = () => {
 *
 * } */

// Combine all existing reducers into one that will be applied to the store
const rootReducer = combineReducers({
	buddy_list: buddyListReducer,
	user: userInfoReducer,
});

export default rootReducer;
