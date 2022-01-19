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

import {fetchAllPOEEvents, resetPOEEvent} from './slice/poeEventListSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';

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

  const {poeEvents, poeEventLoading, poeEventError} = useSelector(
    state => state.poeEvents,
  );

  const {
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
  } = useSelector(state => state.pillarMemberContents);

  /**
   * Fetch event data.
   * @param {string} identifier
   *
   */
  /**
   * Fetch event data.
   * @param {string} poeId
   *
   */
  const fetchSessionDetailByIdentifier = identifier => {
    dispatch(fetchSessionDetailByID(identifier));
  };

  const fetchAllPOEEvent = poeId => {
    dispatch(fetchAllPOEEvents(poeId));
  };

  const fetchAllPillarMemberContent = () => {
    dispatch(fetchAllPillarMemberContents());
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

  const cleanPOEEvent = () => {
    dispatch(resetPOEEvent());
  };

  const cleanPillarMemberContent = () => {
    dispatch(resetPillarMemberContent());
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
      poeEvents={poeEvents}
      poeEventLoading={poeEventLoading}
      poeEventError={poeEventError}
      fetchAllPOEEvent={fetchAllPOEEvent}
      cleanPOEEvent={cleanPOEEvent}
      pillarMemberContents={pillarMemberContents}
      pillarMemberContentLoading={pillarMemberContentLoading}
      pillarMemberContentError={pillarMemberContentError}
      fetchAllPillarMemberContent={fetchAllPillarMemberContent}
      cleanPillarMemberContent={cleanPillarMemberContent}
    />
  );
};

export default CommunityDetailScreen;
