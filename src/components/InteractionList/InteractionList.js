import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Interaction } from "..";

export const InteractionList = (props) => {
	const { buddy_id } = props;

	const interactions = useSelector((state) =>
		state.buddies.buddyToInteractionMap.get(buddy_id)
	);

	if (interactions) {
		return interactions.map((interaction) => (
			<Interaction key={interaction.id} {...interaction} />
		));
	} else {
		return <Fragment />;
	}
};
