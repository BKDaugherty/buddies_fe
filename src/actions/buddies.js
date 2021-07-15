// This file creates a mapping of actions
const actions = {
	create_buddy: "buddy/create",
};

// This function takes advantage of functional patterns to give a nice API for dispatching
// actions. (Unsure if this is actually useful yet...)
const action_generator = (action) => (data) => {
	// The action generator will rely on Redux Thunk Middleware to pass it these arguments
	// It certainly doesn't do anything useful now.
	// return (dispatch, getState) => {
	//  return dispatch({})
	//   * }; */
};
