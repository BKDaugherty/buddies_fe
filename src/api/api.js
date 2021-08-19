// Run the frontend against the prod API
const BUDDIES_API = "https://buddies-backend.herokuapp.com/";

// Run the frontend against a local instance of the buddies backend
// const BUDDIES_API = 'http://localhost:9001/';

const getAuthHeader = (jwt, headers = {}) => {
	headers["Authorization"] = "Bearer " + jwt;
	return headers;
};

const authApiPostCall = (endpoint) => (jwt) => async (body) => {
	return apiPostCall(endpoint)(getAuthHeader(jwt))(body);
};

// Curried function to share functionality between POST requests. Will be more
// useful when we add security
const apiPostCall =
	(endpoint) =>
	(additionalHeaders = {}) =>
	async (body) => {
		const url = BUDDIES_API + endpoint;
		additionalHeaders["Content-Type"] = "application/json";
		return fetch(url, {
			method: "POST",
			headers: additionalHeaders,
			body: JSON.stringify(body),
		}).then((response) => {
			return response.json();
		});
	};

const getUserData =
	(jwt) =>
	async ({ userId }) => {
		const headers = getAuthHeader(jwt);

		return fetch(BUDDIES_API + "user/" + userId, {
			headers: headers,
			method: "GET",
		}).then((response) => {
			return response.json().then((data) => {
				let buddyToInteractionMap = new Map();
				for (const interaction of Object.values(data.interactions)) {
					for (const participantId of Object.values(
						interaction.participants
					)) {
						if (!buddyToInteractionMap.has(participantId)) {
							buddyToInteractionMap.set(participantId, []);
						}
						buddyToInteractionMap
							.get(participantId)
							.push(interaction);
					}
				}
				return {
					buddies: data.buddies,
					interactions: data.interactions,
					buddyToInteractionMap: buddyToInteractionMap,
				};
			});
		});
	};

const authEndpoint = (endpoint) => (jwt) => authApiPostCall(jwt)(endpoint);

// The main endpoints of the buddy service coupled into one object
// Checkout https://github.com/BKDaugherty/buddies/blob/main/src/lib/types.rs
// for the interface
const buddiesService = {
	archiveBuddy: authEndpoint("buddy/archive"),
	archiveInteraction: authEndpoint("interaction/archive"),
	createBuddy: authEndpoint("buddy/create"),
	createInteraction: authEndpoint("interaction/create"),
	updateBuddy: authEndpoint("buddy/update"),
	updateInteraction: authEndpoint("interaction/update"),
	getUserData: getUserData,
	login: apiPostCall("login")(),
	signup: apiPostCall("sign_up")(),
};

export { buddiesService };
