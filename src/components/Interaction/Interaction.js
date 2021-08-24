import React, { Fragment } from "react";

export const Interaction = (props) => {
	const { notes, date, particpants } = props;
	return (
		<Fragment>
			<h4>{date}</h4>
			<p>{notes}</p>
		</Fragment>
	);
};
