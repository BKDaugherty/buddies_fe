// A helper function to create uniform reducers and to avoid switch statements
export const createReducer =
	(initialState, actionStateUpdateMap) =>
	(state = initialState, action) => {
		if (!(action.type in actionStateUpdateMap)) {
			// Actions are sent to all reducers, so there's no way from a single reducer
			// to tell that you've missed the reducer
			return state;
		} else {
			return actionStateUpdateMap[action.type](state, action);
		}
	};

// Define one place to select authentication information from store
// I wish I could make it private somehow
export const selectAuthInfo = (state) => {
	return {
		jwt: state.user.authentication.jwt,
		user_id: state.user.authentication.id,
	};
};

// Helper methods for reducing asyncStateMethods
export const asyncStateRequest = (state) => {
	state.pending = true;
	return state;
};

export const asyncStateSuccess = (state) => {
	state.pending = false;
	return state;
};

export const asyncStateFailure = (state) => {
	state.pending = false;
	return state;
};

// State that exists for asynchronous actions
export const createAsyncActionInitialState = () => {
	return {
		pending: false,
	};
};
