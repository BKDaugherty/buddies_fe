import React from "react";
import { debugService, buddiesService } from "../../api";

export const AdminControls = () => {
	return (
		<div>
			<p>
				{" "}
				Running this example currently requires disabling web security.
				See the README for how to do so. Also I don't know how to do
				that in Safari so you might have to install Chrome Porter :P
			</p>
			<button
				onClick={() => {
					const userEmail = "spiderman@gmail.com";
					debugService
						.setupFakeData(userEmail, "this is secure")
						.then((response) => {
							console.log(
								"Sent fake data to backend for user: " +
									userEmail
							);
							console.log(response);
						});
				}}
			>
				Generate Fake Data
			</button>
			<button
				onClick={() => {
					const userEmail = "spiderman@gmail.com";
					buddiesService
						.login(userEmail, "this is secure")
						.then((response) => {
							const jwt = response.jwt;
							console.log("Logged in User", response.user);
							const userId = response.user.id;
							buddiesService
								.getUserData(jwt)(userId)
								.then((response) => {
									console.log(
										userEmail + " 's data",
										response
									);
								});
						});
				}}
			>
				Log Test User Data
			</button>
		</div>
	);
};
