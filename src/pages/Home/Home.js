import React, { Fragment, useEffect } from "react";
import { Dashboard, BuddyList } from "../../components";
import { useDispatch } from "react-redux";
import { buddiesActionGenerator, BuddiesActions } from "../../redux/Buddies";

export const Home = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const getUserData =
			buddiesActionGenerator[BuddiesActions.getUserData]();
		dispatch(getUserData);
	}, [dispatch]);
	return (
		<Fragment>
			<Dashboard />
			<BuddyList />
		</Fragment>
	);
};
