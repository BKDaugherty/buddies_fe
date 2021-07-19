import React, { Fragment, useEffect } from "react";
import { AdminControls, Dashboard, BuddyList } from "../../components";
import { useDispatch, useSelector } from "react-redux";

export const Home = (props) => {
	const dispatch = useDispatch();
	// TODO: This should be a part of an authenticated framework instead of having to do
	// it in every Component that wants this information
	const authInfo = useSelector((state) => state.user.authentication);
	useEffect(() => {
		// TODO - Actually implement this
		const get_buddies = async () => {
			await dispatch({
				type: "buddies/get",
				payload: "you really can put anything here",
			});
		};
		get_buddies();
	}, [dispatch]);
	return (
		<Fragment>
			<Dashboard />
			<BuddyList />
		</Fragment>
	);
};
