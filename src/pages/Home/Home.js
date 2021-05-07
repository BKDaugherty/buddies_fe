import React, { Fragment } from "react";
import { Dashboard, BuddyList } from "../../components"

export const Home = () => {
	return (
		<Fragment>
			<Dashboard/>
			{/*<Search/>*/}
			<BuddyList/>
		</Fragment>
	);
};
