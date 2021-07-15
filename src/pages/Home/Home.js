import React, { Fragment } from "react";
import { AdminControls, Dashboard, BuddyList } from "../../components";

export const Home = () => {
	return (
		<Fragment>
			<Dashboard />
			<BuddyList />
			<AdminControls />
		</Fragment>
	);
};
