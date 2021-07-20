import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActionGenerator, UserInfoActions } from "../../redux/UserInfo";

export const Landing = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (evt) => {
		// Ensure that we don't refresh page on submit
		evt.preventDefault();
		console.log("Doing work " + email + " " + password);
		const loginThunk = userActionGenerator[UserInfoActions.login](
			email,
			password
		);
		dispatch(loginThunk);
	};

	return (
		<div id={ "landing" }>
			<form onSubmit={handleSubmit}>
				<h3 className={"title"}>login</h3>
				<input
					className={"field"}
					type="email"
					value={email}
					placeholder={"email"}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className={"field"}
					type="password"
					value={password}
					placeholder={"password"}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input className={"button"} type="submit" value="submit" />
			</form>
		</div>
	);
};
