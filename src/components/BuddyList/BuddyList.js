import React from "react";

import { useSelector } from "react-redux";

import { Buddy } from "..";

export const BuddyList = () => {

	const buddies = useSelector(state => state.buddies.buddies);

	return (
		<div className={"container buddy-list"}>
			{
				Object.values(buddies).map((buddyData) => (
					<Buddy key={buddyData.id} {...buddyData} />
				))
			}
		</div>
	);
};
