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

import {fetchAllPOEDetails, resetPOEDetail} from './slice/poeDetailSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';

const CommunityDetailScreen = props => {
  const dispatch = useDispatch();

  const {sessionDetails, sessionDetailLoading, sessionDetailError} =
    useSelector(state => state.sessionDetails);

  const {poeDetails, poeDetailLoading, poeDetailError} = useSelector(
    state => state.poeDetails,
  );

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
  /**
   * Fetch event data.
   * @param {string} pillarId
   *
   */
  const fetchSessionDetailByIdentifier = identifier => {
    dispatch(fetchSessionDetailByID(identifier));
  };

  const fetchAllPOEDetail = poeId => {
    dispatch(fetchAllPOEDetails(poeId));
  };

  const fetchAllPOEEvent = poeId => {
    dispatch(fetchAllPOEEvents(poeId));
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  /**
   * Clear event data.
   *
   */
  const cleanSessionDetail = () => {
    dispatch(resetSessionDetail());
  };

  const cleanPOEDetail = () => {
    dispatch(resetPOEDetail());
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
      poeDetails={poeDetails}
      poeDetailLoading={poeDetailLoading}
      poeDetailError={poeDetailError}
      fetchAllPOEDetail={fetchAllPOEDetail}
      cleanPOEDetail={cleanPOEDetail}
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
