import React from "react";

import { useSelector } from "react-redux";

import { Buddy } from "..";

export const BuddyList = () => {
	// Ignore pending_buddies for now
	const buddies = useSelector((state) => state.buddy_list.buddies);
	return buddies.map((buddy_data) => (
		<Buddy key={buddy_data.id} {...buddy_data} />
	));
};
