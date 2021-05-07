import React from "react"
import {debug_service, buddies_service} from "../../api/api"

export const AdminControls = () => {
	return (
	    <button onClick={() => {
		const user_id = "70fad1fa-835c-4a4f-8704-e37edadb74e1";
		debug_service.setup_fake_data(user_id).then(response => {
		    console.log("Sent fake data to backend for user: " + user_id);
		    buddies_service.get_user_data(user_id).then(console.log)
		});
	    }}>
		Generate Fake Data
	    </button>
	);
};
