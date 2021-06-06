import React from "react"
import {debug_service, buddies_service} from "../../api/api"

export const AdminControls = () => {
  return (
    <div>
	<p> Running this example currently requires disabling web security. See the README for how to do so. Also I don't know how to do that in Safari so you might have to install Chrome Porter :P</p>
	<button onClick={() => {
	  const user_email = "spiderman@gmail.com";
	  debug_service.setup_fake_data(user_email, "this is secure").then(response => {
	    console.log("Sent fake data to backend for user: " + user_email);
	    console.log(response);
	    
	  });
	}}>
	    Generate Fake Data
	</button>
	<button onClick={() => {
	  const user_email = "spiderman@gmail.com";
	  buddies_service.login(user_email, "this is secure").then(response => {
	    const jwt = response.jwt;
	    console.log("Logged in User", response.user);
	    const user_id = response.user.id;
	    buddies_service.get_user_data(jwt)(user_id).then(response => {
	      console.log(user_email + " 's data", response);
	    });
	  });
	}}>
	    Log Test User Data
	</button>
    </div>
	);
};
