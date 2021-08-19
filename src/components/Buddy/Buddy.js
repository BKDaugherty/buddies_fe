import React, { Fragment } from "react";
import { InteractionList } from "..";

export const Buddy = (props) => {
	const { name, birthday, cadence, notes, last_contacted, id } = props;
	return (
		<div className={"panel buddy"}>
			<h1>{name}</h1>
			<p>{notes}</p>
			<InteractionList buddy_id={id} />
		</div>
	);
};
