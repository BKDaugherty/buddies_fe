import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { buddiesActionGenerator, BuddiesActions } from "../../redux/Buddies";

import { Buddy, PendingBuddy } from "..";

export const BuddyList = () => {
	const dispatch = useDispatch();
	const handleBuddyCreation = (e) => {
		e.preventDefault();
		// This feels very brittle
		const name = e.target.elements[0].value;
		const notes = e.target.elements[1].value;
		const birthday = e.target.elements[2].value;

		const buddyCreationThunk = buddiesActionGenerator[
			BuddiesActions.createBuddy
		]({
			name,
			notes,
			birthday,
		});
		dispatch(buddyCreationThunk);
		// We also want to somehow set that we are no longer pending on successful
		// completion. Perhaps pending should be in redux store?
	};

	const buddies = useSelector((state) => state.buddies.buddies);
	const buddyPending = useSelector((state) => state.buddies.buddyPending);
	return (
		<div className={"container buddy-list"}>
			{!buddyPending && (
				<button
					className={"button"}
					onClick={() => {
						dispatch({ type: BuddiesActions.startCreateBuddy });
					}}
				>
					Create Buddy
				</button>
			)}
			{buddyPending && (
				<PendingBuddy handleSubmit={handleBuddyCreation} />
			)}
			{Object.values(buddies).map((buddyData) => (
				<Buddy key={buddyData.id} {...buddyData} />
			))}
		</div>
	);
};
