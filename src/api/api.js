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

const getUserData = (jwt) => async (userId) => {
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
					buddyToInteractionMap.get(participantId).push(interaction);
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

const signup = (email, password) => {
	return apiPostCall("sign_up")()({
		email: email,
		password: password,
	});
};

const login = (email, password) => {
	return apiPostCall("login")()({
		email: email,
		password: password,
	});
};

const createBuddy =
	(jwt) => (userId, name, notes, birthday, cadence, location) => {
		return authApiPostCall("buddy/create")(jwt)({
			user_id: userId,
			name: name,
			notes: notes,
			birthday: birthday,
			cadence: cadence,
			location: location,
		});
	};

const createInteraction = (jwt) => (userId, notes, participants, date) => {
	return authApiPostCall("interaction/create")(jwt)({
		user_id: userId,
		notes: notes,
		participants: participants,
		date: date,
	});
};

const archiveBuddy = (jwt) => (userId, buddyId) =>
	authApiPostCall(jwt)("buddy/archive")({
		user_id: userId,
		buddy_id: buddyId,
	});

const archiveInteractions = (jwt) => (userId, interactionId) =>
	authApiPostCall(jwt)("interaction/archive")({
		user_id: userId,
		interaction_id: interactionId,
	});

// The main endpoints of the buddy service coupled into one object
const buddiesService = {
	archiveBuddy: archiveBuddy,
	archiveInteraction: archiveInteractions,
	createBuddy: createBuddy,
	createInteraction: createInteraction,
	updateBuddy: (jwt) => authApiPostCall("buddy/update")(jwt),
	updateInteraction: (jwt) => authApiPostCall("interaction/update")(jwt),
	getUserData: getUserData,
	login: login,
	signup: signup,
};

// Debug function to call the API and generate some fake data
const setupFakeData = async (fakeUserEmail, fakeUserPassword) => {
	let resp = await buddiesService.login(fakeUserEmail, fakeUserPassword);
	let user = resp.user;
	let jwt = resp.jwt;

	console.log("Created User", user);
	const userId = resp.user.id;

	const fakeBuddies = [
		// userId, name, notes, birthday (MM-DD-YYYY)
		[
			userId,
			"Brendon Daugherty",
			"Brendon (also known as Ken) plays bass",
			"10-02-1997",
		],
		[
			userId,
			"Porter Sherman",
			"Porter is the lead guitarist of 'The Band'",
			"07-21-1997",
		],
		[userId, "Charlie Coburn", "Charlie is a noodly boi", "07-01-1997"],
		[
			userId,
			"Hannah Brenchley",
			"Hannah is an absolute pal, and knows the best muzak like parcels",
			"12-23-1997",
		],
		[
			userId,
			"Miela Mayer",
			"Miela is a hectic human being that we all know and love",
			"07-17-1996",
		],
	];

	const fakeInteractions = [
		// userId, notes, participants, Option<date>
		[userId, "Told me that they are quitting their job", [0], "10-02-2021"],
		[
			userId,
			"Told me they are stoked for their sister's wedding",
			[2],
			"07-03-2020",
		],
		[userId, "Told me they started dating some new guy named jeremy", [3]],
		[userId, "Told me they are going to visit their pal", [2, 4]],
	];

	let buddies = [];
	for (const fakeBuddy of fakeBuddies) {
		let [userId, name, notes, birthday] = fakeBuddy;
		console.log(buddiesService.createBuddy(jwt));
		let resp = await buddiesService.createBuddy(jwt)(
			userId,
			name,
			notes,
			birthday
		);
		console.log(resp);
		buddies.push(resp.buddy);
	}

	for (const fakeInteraction of fakeInteractions) {
		let [userId, notes, participantIndices, date] = fakeInteraction;
		let participants = [];
		for (const index in participantIndices) {
			participants.push(buddies[index].id);
		}
		await buddiesService.createInteraction(jwt)(
			userId,
			notes,
			participants,
			date
		);
	}
	return buddiesService.getUserData(jwt)(userId);
};

const debugService = {
	setupFakeData: setupFakeData,
};

export { buddiesService, debugService };
