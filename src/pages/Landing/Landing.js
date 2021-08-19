import React from "react";
import { useDispatch } from "react-redux";
import { userActionGenerator, UserInfoActions } from "../../redux/UserInfo";
import { LoginSignup } from "../../components/LoginSignup"

export const Landing = () => {
	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();

		const email = e.target.elements[0].value;
		const password = e.target.elements[1].value;

		const loginThunk = userActionGenerator[UserInfoActions.login]({
			email,
			password,
		});

		dispatch(loginThunk);
	};

	const handleSignup = (e) => {
		e.preventDefault();

		const email = e.target.elements[0].value;
		const password = e.target.elements[1].value;
		const confirmPassword = e.target.elements[2].value;

		if (!signupFieldsValid(email, password, confirmPassword)) {
			// toast that shit
			console.log("wrong");
			return;
		}

		const signupThunk = userActionGenerator[UserInfoActions.signup]({
			email,
			password,
		});

		dispatch(signupThunk);
	};

	const signupFieldsValid = (email, password, confirmPassword) => {
		return email.includes("@") && password === confirmPassword;
	};

	return (
		<div id={ "landing" }>
			<LoginSignup
				handleLogin={handleLogin}
				handleSignup={handleSignup}
			/>
		</div>
	);
};
