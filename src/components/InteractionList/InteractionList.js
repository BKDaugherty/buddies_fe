import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buddiesActionGenerator, BuddiesActions } from "../../redux/Buddies";
import { Interaction, PendingInteraction } from "..";

export const InteractionList = (props) => {
	const dispatch = useDispatch();
	const { buddy_id } = props;

	const interactionPending = useSelector((state) => {
		if (buddy_id in state.buddies.pendingInteractions) {
			return state.buddies.pendingInteractions[buddy_id];
		} else {
			return false;
		}
	});

	const interactions = useSelector((state) =>
		state.buddies.buddyToInteractionMap.get(buddy_id)
	);

	const handleCreateInteraction = (buddyId) => (e) => {
		e.preventDefault();
		// This feels very brittle
		const notes = e.target.elements[0].value;
		const other_participants = e.target.elements[1].value;
		// Ignore other_particpants for now since it's not setup
		const participants = [buddyId]; //+ other_particpants
		const date = e.target.elements[2].value;

		const interactionCreationThunk = buddiesActionGenerator[
			BuddiesActions.createInteraction
		]({
			notes,
			participants,
			date,
		});
		dispatch(interactionCreationThunk);
	};

	return (
		<Fragment>
			{!interactionPending && (
				<button
					className={"button"}
					onClick={() => {
						dispatch({
							type: BuddiesActions.startCreateInteraction,
							payload: { buddyId: buddy_id },
						});
					}}
				>
					Create Interaction
				</button>
			)}
			{interactionPending && (
				<PendingInteraction
					handleSubmit={handleCreateInteraction(buddy_id)}
				/>
			)}
			{interactions &&
				interactions.map((interaction) => (
					<Interaction key={interaction.id} {...interaction} />
				))}
		</Fragment>
	);
};
