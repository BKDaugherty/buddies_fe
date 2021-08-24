import React, { useState } from "react";

export const PendingBuddy = (props) => {
	const [name, setName] = useState("");
	const [notes, setNotes] = useState("");
	const [birthday, setBirthday] = useState("");
	return (
		<div className={"panel buddy"}>
			<form onSubmit={props.handleSubmit}>
				<input
					className={"field"}
					type="text"
					value={name}
					placeholder={"name"}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className={"field"}
					type="text"
					value={notes}
					placeholder={"notes"}
					onChange={(e) => setNotes(e.target.value)}
				/>

				<input
					className={"field"}
					type="text"
					value={birthday}
					placeholder={"10-02-1997"}
					onChange={(e) => setBirthday(e.target.value)}
				/>
				<input className={"button"} type="submit" value="submit" />
			</form>
		</div>
	);
};
