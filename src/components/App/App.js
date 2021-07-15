import React, { Fragment } from "react";
import { Home } from "../../pages";
import { Header, Footer } from "..";

export const App = () => {
	return (
		<Fragment>
			<Header/>
			<Home />
			<Footer />
		</Fragment>
	);
};
