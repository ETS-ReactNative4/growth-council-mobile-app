import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthDetail from './components/GrowthDetail';

import {fetchAllPOEEvents, resetPOEEvent} from './slice/poeEventListSlice';

import {fetchAllPOEDetails, resetPOEDetail} from './slice/poeDetailSlice';

import {
  fetchPoeSelfLearns,
  resetPoeSelfLearn,
} from '../selfLearn/slice/poeSelfLearnSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';

const GrowthDetailScreen = props => {
  const dispatch = useDispatch();

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

  const {poeSelfLearns, poeSelfLearnLoading, poeSelfLearnError} = useSelector(
    state => state.poeSelfLearns,
  );

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

  const fetchAllPOEDetail = poeId => {
    dispatch(fetchAllPOEDetails(poeId));
  };

  const fetchAllPOEEvent = poeId => {
    dispatch(fetchAllPOEEvents(poeId));
  };

  const fetchPoeSelfLearn = poeId => {
    dispatch(fetchPoeSelfLearns(poeId));
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
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

  const cleanPoeSelfLearn = () => {
    dispatch(resetPoeSelfLearn());
  };

  return (
    <GrowthDetail
      {...props}
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
      poeSelfLearns={poeSelfLearns}
      poeSelfLearnLoading={poeSelfLearnLoading}
      poeSelfLearnError={poeSelfLearnError}
      fetchPoeSelfLearn={fetchPoeSelfLearn}
      cleanPoeSelfLearn={cleanPoeSelfLearn}
    />
  );
};

export default GrowthDetailScreen;
