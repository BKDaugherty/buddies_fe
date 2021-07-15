import React from "react";

import { connect } from "react-redux";

import { Buddy } from "..";

const BuddyContainer = (props) => {
	// Ignore pending_buddies for now
	const { buddies } = props;
	return buddies.map((buddy_data) => (
		<Buddy key={buddy_data.id} {...buddy_data} />
	));
};

// Connects the BuddyList to the redux store to get all buddies
export const BuddyList = connect((state, ownProps) => {
	return state.buddy_list;
}, null)(BuddyContainer);
