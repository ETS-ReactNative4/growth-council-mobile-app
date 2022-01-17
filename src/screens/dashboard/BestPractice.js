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

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/pillarPOESlice';

const BestPracticeScreen = props => {
  const dispatch = useDispatch();

  const {bestPractices, bestPracticeLoading, bestPracticeError} = useSelector(
    state => state.bestPractices,
  );

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  // const {bestPracticesPOEs, bestPracticesPOELoading, bestPracticesPOEError} =
  //   useSelector(state => state.bestPracticesPOEs);

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

  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
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
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
    />
  );
};

export default BestPracticeScreen;
