import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CommunityDetail from './components/CommunityDetail';

import {
  fetchSessionDetailByID,
  resetSessionDetail,
} from './slice/sesssionDetailSlice';

import {
  fetchAllbestPractices,
  resetbestPractice,
} from '../dashboard/slice/bestPracticesSlice';
import {
  fetchAllbestPracticesMemberContents,
  resetbestPracticesMemberContent,
} from '../dashboard/slice/bestPracticesMemberContentSlice';

const CommunityDetailScreen = props => {
  const dispatch = useDispatch();

  const {sessionDetails, sessionDetailLoading, sessionDetailError} =
    useSelector(state => state.sessionDetails);

  const {bestPractices, bestPracticeLoading, bestPracticeError} = useSelector(
    state => state.bestPractices,
  );

  const {
    bestPracticesMemberContents,
    bestPracticesMemberContentLoading,
    bestPracticesMemberContentError,
  } = useSelector(state => state.bestPracticesMemberContents);

  /**
   * Fetch event data.
   * @param {string} identifier
   *
   */
  const fetchSessionDetailByIdentifier = identifier => {
    dispatch(fetchSessionDetailByID(identifier));
  };

  /**
   * Clear event data.
   *
   */
  const cleanSessionDetail = () => {
    dispatch(resetSessionDetail());
  };

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
    <CommunityDetail
      {...props}
      sessionDetails={sessionDetails}
      sessionDetailLoading={sessionDetailLoading}
      sessionDetailError={sessionDetailError}
      fetchSessionDetailByIdentifier={fetchSessionDetailByIdentifier}
      cleanSessionDetail={cleanSessionDetail}
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

export default CommunityDetailScreen;
