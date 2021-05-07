import React, { Fragment } from "react";
import { Dashboard, BuddyList } from "../../components"

const Home = () => {
	return (
		<Fragment>
			<Dashboard/>
			{/*<Search/>*/}
			<BuddyList/>
		</Fragment>
	);
};

export default Home;
