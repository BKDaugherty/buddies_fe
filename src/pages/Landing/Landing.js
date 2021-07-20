import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { userActionGenerator, UserInfoActions } from "../../redux/UserInfo";

export const Landing = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (evt) => {
		// Ensure that we don't refresh page on submit
		evt.preventDefault();
		const loginThunk = userActionGenerator[UserInfoActions.login]({
			email,
			password,
		});
		dispatch(loginThunk);
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit}>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		</Fragment>
	);
};
