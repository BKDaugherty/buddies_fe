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

// Takes in a mapping of actions to the logic that should be done
export const asyncActionStateUpdateMapGenerator = (
	action_name,
	action_store_key,
	logic = {}
) => {
	// TODO: Validate input
	const { success_logic, request_logic, failure_logic } = logic;
	return {
		[action_name + "/request"]: (state, action) => {
			state[action_store_key] = asyncStateRequest(
				state[action_store_key]
			);
			if (request_logic) {
				return request_logic(state, action);
			} else {
				return state;
			}
		},
		[action_name + "/success"]: (state, action) => {
			state[action_store_key] = asyncStateSuccess(
				state[action_store_key]
			);
			if (success_logic) {
				return success_logic(state, action);
			} else {
				return state;
			}
		},
		[action_name + "/failure"]: (state, action) => {
			state[action_store_key] = asyncStateFailure(
				state[action_store_key]
			);
			if (failure_logic) {
				return failure_logic(state, action);
			} else {
				return state;
			}
		},
	};
};

export const asyncActionGenerator = (
	action_name,
	request_logic,
	logic = {}
) => {
	const { success_logic, failure_logic } = logic;
	// TODO: Validate input
	return {
		[action_name]: (args) => (dispatch, getState) => {
			// Let the redux store know that we are requesting to perform an asynchronous action
			dispatch({ type: action_name + "/request" });
			request_logic(args, dispatch, getState)
				.then((payload) => {
					// Let the redux store know we've been successful, and give the payload to the reducer
					dispatch({
						type: action_name + "/success",
						payload,
					});
					// Allow the user to run a callback on success
					if (success_logic) {
						return success_logic(payload, {
							args,
							dispatch,
							getState,
						});
					}
				})
				.catch((error) => {
					// Let the redux store know we've failed and give the error to the reducer
					dispatch({
						type: action_name + "/failure",
						payload: error,
					});
					if (failure_logic) {
						// Allow the user to run a callback on failure
						return failure_logic(error, {
							args,
							dispatch,
							getState,
						});
					}
				});
		},
	};
};

// State that exists for asynchronous actions
export const createAsyncActionInitialState = () => {
	return {
		pending: false,
	};
};
