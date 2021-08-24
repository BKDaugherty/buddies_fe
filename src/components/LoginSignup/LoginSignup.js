import React, { useState } from "react";

export const LoginSignup = (props) => {
	const Mode = {
		LOGIN: "login",
		SIGNUP: "signup",
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [mode, setMode] = useState(Mode.LOGIN);

	const titleToggle = (type) => {
		let classNames = ["title"];
		type === mode && classNames.push("active");
		return (
			<h3 className={classNames.join(" ")} onClick={() => setMode(type)}>
				{type}
			</h3>
		);
	};

	return (
		<form
			onSubmit={
				mode === Mode.LOGIN ? props.handleLogin : props.handleSignup
			}
		>
			<div>
				{titleToggle(Mode.LOGIN)}
				{titleToggle(Mode.SIGNUP)}
			</div>
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
			{mode === Mode.SIGNUP && (
				<input
					className={"field"}
					type="password"
					value={confirmPassword}
					placeholder={"confirm password"}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			)}
			<input className={"button"} type="submit" value="submit" />
		</form>
	);
};
