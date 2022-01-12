import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BestPractice from './components/BestPractice';

import {
  fetchAllbestPractices,
  resetbestPractice,
} from './slice/bestPracticesSlice';
import {
  fetchAllbestPracticesMemberContents,
  resetbestPracticesMemberContent,
} from './slice/bestPracticesMemberContentSlice';

const BestPracticeScreen = props => {
  const dispatch = useDispatch();

  const {bestPractices, bestPracticeLoading, bestPracticeError} = useSelector(
    state => state.bestPractices,
  );
  const {pointOfEngagements, pointOfEngagementLoading, pointOfEngagementError} =
    useSelector(state => state.pointOfEngagements);
  const {
    bestPracticesMemberContents,
    bestPracticesMemberContentLoading,
    bestPracticesMemberContentError,
  } = useSelector(state => state.bestPracticesMemberContents);

  const fetchAllbestPractice = () => {
    dispatch(fetchAllbestPractices());
  };

  const cleanbestPractice = () => {
    dispatch(resetbestPractice());
  };

  const fetchAllbestPracticesMemberContent = () => {
    dispatch(fetchAllbestPracticesMemberContents());
  };

  const cleanbestPracticesMemberContent = () => {
    dispatch(resetbestPracticesMemberContent());
  };

  return (
    <BestPractice
      {...props}
      bestPractices={bestPractices}
      bestPracticeLoading={bestPracticeLoading}
      bestPracticeError={bestPracticeError}
      fetchAllbestPractice={fetchAllbestPractice}
      cleanbestPractice={cleanbestPractice}
      bestPracticesMemberContents={bestPracticesMemberContents}
      bestPracticesMemberContentLoading={bestPracticesMemberContentLoading}
      bestPracticesMemberContentError={bestPracticesMemberContentError}
      fetchAllbestPracticesMemberContent={fetchAllbestPracticesMemberContent}
      cleanbestPracticesMemberContent={cleanbestPracticesMemberContent}
    />
  );
};

export default BestPracticeScreen;
