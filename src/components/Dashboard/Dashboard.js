import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
	const user_info = useSelector((state) => state.user.user_info);
	const buddies = useSelector((state) => state.buddies.buddies);
	const interactions = useSelector((state) => state.buddies.interactions);

	return (
		<div className={"container dashboard"}>
			<div className={"panel half"}>
				<p>profile</p>
				<h1>{user_info.email}</h1>
			</div>
			<div className={"panel quarter"}>
				<p>buddies</p>
				<h1>{Object.keys(buddies).length}</h1>
			</div>
			<div className={"panel quarter"}>
				<p>interactions</p>
				<h1>{Object.keys(interactions).length}</h1>
			</div>
		</div>
	);
};
