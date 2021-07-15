import React, { Fragment } from "react";

export const Buddy = (props) => {
	const { name } = props;

	return (
		<Fragment>
			<h1> {name} </h1>
		</Fragment>
	);
};
