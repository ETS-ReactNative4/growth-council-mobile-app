import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Idea from './components'

import { fetchIdeas,resetIdea } from './slice/ideaSlice';

const IdeasScreen = (props) => {
	const dispatch = useDispatch();

	const {idea, ideaLoading, ideaError} = useSelector((state) => state.idea);

	// fetch feedback data
	const fetchIdea = () => {
		dispatch(fetchIdeas());
	}

	//clear feedback data
	const cleanIdea = () => {
		dispatch(resetIdea());
	}
  return (
	<Idea
		{...props}
		idea={idea}
		ideaLoading={ideaLoading}
		ideaError={ideaError}
		fetchIdea={fetchIdea}
		cleanIdea={cleanIdea}
	/>
  )
}

export default IdeasScreen;

