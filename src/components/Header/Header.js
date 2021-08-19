import React, { Fragment } from "react";
import { useSelector } from "react-redux"

export const Header = () => {
	const { user_info, authentication } = useSelector(state => state.user);

	return (
		<Fragment>
			<div id={"header"}>
				<div className={"container header centered"}>
					<h2>buddies.</h2>
					{ authentication.is_authenticated ? <p>hi, {user_info.email}!</p> : false }
				</div>
			</div>
		</Fragment>
	);
};
