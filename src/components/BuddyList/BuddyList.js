import React from "react";

import { useSelector } from "react-redux";

import { Buddy } from "..";

export const BuddyList = () => {
	// Ignore pending_buddies for now
	const buddies = useSelector((state) => state.buddies.buddies);
	// I don't know how to iterate over a JS object lol. SHould this be a map?
	return Object.values(buddies).map((buddy_data) => (
		<Buddy key={buddy_data.id} {...buddy_data} />
	));
};
