import React, { Fragment } from "react";
import { Home, Landing } from "../../pages";
import { Header, Footer } from "..";
import { useSelector } from "react-redux";

export const App = () => {
	const authenticated = useSelector(
		(state) => state.user.authentication.is_authenticated
	);
	return (
		<Fragment>
			<Header />
			{/* TeRnArY oPeRaToRs ArEn'T rEaDaBlE */}
			{authenticated ? <Home /> : <Landing />}
			<Footer />
		</Fragment>
	);
};
