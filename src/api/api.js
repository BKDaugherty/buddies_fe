// Run the frontend against the prod API
const BUDDIES_API = "https://buddies-backend.herokuapp.com/";

// Run the frontend against a local instance of the buddies backend
// const BUDDIES_API = 'http://localhost:9001/';

const get_auth_header = (jwt, headers={}) => {
  headers['Authorization'] = "Bearer " + jwt;
  return headers;
}

const auth_api_post_call = (endpoint) => (jwt) => async(body) => {
  return api_post_call(endpoint)(get_auth_header(jwt))(body);
}

// Curried function to share functionality between POST requests. Will be more
// useful when we add security
const api_post_call = (endpoint) => (additional_headers={}) => async (body) => {
    const url = BUDDIES_API + endpoint;
    additional_headers['Content-Type'] = 'application/json';
    return fetch(url, {
	method: "POST",
	headers: additional_headers,
	body: JSON.stringify(body)
    }).then(response => {
	return response.json();
    });
};

const get_user_data = (jwt) => async (user_id) => {
  const headers = get_auth_header(jwt);
    
  return fetch(BUDDIES_API + "user/" + user_id, {
    headers: headers,
    method: "GET"
  }).then(response => {
    return response.json().then(
      data => {
	let buddy_to_interaction_map = new Map();
	for (const interaction of Object.values(data.interactions)) {
	  for (const participant_id of Object.values(interaction.participants)) {
	    if (!buddy_to_interaction_map.has(participant_id)) {
	      buddy_to_interaction_map.set(participant_id, []);
	    }
	    buddy_to_interaction_map.get(participant_id).push(interaction);
	  }
	}
	return {
	  buddies: data.buddies,
	  interactions: data.interactions,
	  buddy_to_interaction_map: buddy_to_interaction_map,
	};
    });
  });
}

const sign_up = (email, password) => {
  return api_post_call("sign_up")()({
    email: email,
    password: password,
  });
}

const login = (email, password) => {
  return api_post_call("login")()({
    email: email,
    password: password,
  });
}

const create_buddy = (jwt) => (user_id, name, notes, birthday, cadence, location) => {
    return auth_api_post_call("buddy/create")(jwt)({
	user_id: user_id,
	name: name,
	notes: notes,
	birthday: birthday,
	cadence: cadence,
	location: location
    });
}

const create_interaction = (jwt) => (user_id, notes, participants, date) => {
    return auth_api_post_call("interaction/create")(jwt)({
	user_id: user_id,
	notes: notes,
	participants: participants,
	date: date,
    });
}

const archive_buddy = (jwt) => (user_id, buddy_id) => auth_api_post_call(jwt)("buddy/archive")({
    user_id: user_id,
    buddy_id: buddy_id,
});

const archive_interaction = (jwt) => (user_id, interaction_id) => auth_api_post_call(jwt)("interaction/archive")({
    user_id: user_id,
    interaction_id: interaction_id,
});

// The main endpoints of the buddy service coupled into one object
const buddies_service = {
    archive_buddy: archive_buddy,
    archive_interaction: archive_interaction,
    create_buddy: create_buddy,
    create_interaction: create_interaction,
    update_buddy: (jwt) => auth_api_post_call("buddy/update")(jwt),
    update_interaction: (jwt) => auth_api_post_call("interaction/update")(jwt),
    get_user_data: get_user_data,
    login: login,
    sign_up: sign_up,
};

// Debug function to call the API and generate some fake data
const setup_fake_data =  async (fake_user_email, fake_user_password) => {
  let resp = await buddies_service.login(fake_user_email, fake_user_password);
  let user = resp.user;
  let jwt = resp.jwt;

  console.log("Created User", user);
  const user_id = resp.user.id;
  
    const fake_buddies = [
	// user_id, name, notes, birthday (MM-DD-YYYY)
	[user_id, "Brendon Daugherty", "Brendon (also known as Ken) plays bass", "10-02-1997"],
	[user_id, "Porter Sherman", "Porter is the lead guitarist of 'The Band'", "07-21-1997"],
	[user_id, "Charlie Coburn", "Charlie is a noodly boi", "07-01-1997"],
	[user_id, "Hannah Brenchley", "Hannah is an absolute pal, and knows the best muzak like parcels", "12-23-1997"],
	[user_id, "Miela Mayer", "Miela is a hectic human being that we all know and love", "07-17-1996"],
    ];

    const fake_interactions = [
	// user_id, notes, participants, Option<date>
	[user_id, "Told me that they are quitting their job", [0], "10-02-2021"],
	[user_id, "Told me they are stoked for their sister's wedding", [2], "07-03-2020"],
	[user_id, "Told me they started dating some new guy named jeremy", [3]],
	[user_id, "Told me they are going to visit their pal", [2,4]],
    ];
    let buddies = [];
    for (const fake_buddy of fake_buddies) {
      let [user_id, name, notes, birthday] = fake_buddy;
      console.log(buddies_service.create_buddy(jwt));
      let resp = await buddies_service.create_buddy(jwt)(user_id, name, notes, birthday);
      console.log(resp);
	buddies.push(resp.buddy);
    }

    for (const fake_interaction of fake_interactions) {
	let [user_id, notes, participant_indices, date] = fake_interaction;
	let participants = [];
	for (const index in participant_indices) {
	    participants.push(buddies[index].id);
	}
	await buddies_service.create_interaction(jwt)(user_id, notes, participants, date);
    }
    return buddies_service.get_user_data(jwt)(user_id)
}

const debug_service = {
    setup_fake_data: setup_fake_data,
};

export {
    buddies_service,
    debug_service,
}

