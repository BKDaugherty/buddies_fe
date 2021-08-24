import React, { useState } from "react";

export const PendingInteraction = (props) => {
	const [notes, setNotes] = useState("");
	const [participants, setParticipants] = useState("");
	const [date, setDate] = useState("");
	return (
		<div classNames={"panel buddy"}>
			<form onSubmit={props.handleSubmit}>
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
					value={participants}
					placeholder={"participants"}
					onChange={(e) => setParticipants(e.target.value)}
				/>

				<input
					className={"field"}
					type="text"
					value={date}
					placeholder={"08-24-2021"}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input className={"button"} type="submit" value="submit" />
			</form>
		</div>
	);
};
