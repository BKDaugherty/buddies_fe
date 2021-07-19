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
