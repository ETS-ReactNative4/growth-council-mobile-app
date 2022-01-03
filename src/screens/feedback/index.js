import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feedback from './component';

import { fetchFeedbacks,resetFeedback } from './slice/feedbackSlice';

const FeedbackScreen = (props) => {
	const dispatch = useDispatch();

	const {feedback, feedbackLoading, feedbackError} = useSelector((state) => state.feedback);

	// fetch feedback data
	const fetchFeedback = () => {
		dispatch(fetchFeedbacks());
	}

	//clear feedback data
	const cleanFeedback = () => {
		dispatch(resetFeedback());
	}
  return (
	<Feedback
		{...props}
		feedback={feedback}
		feedbackLoading={feedbackLoading}
		feebackError={feedbackError}
		fetchFeedback={fetchFeedback}
		cleanFeedback={cleanFeedback}
	/>
  )
}

export default FeedbackScreen;

