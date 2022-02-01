import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BestPractice from './components/BestPractice';

import {
  fetchAllbestPractices,
  resetbestPractice,
} from './slice/bestPracticesSlice';
import {
  fetchAllPillarSliders,
  resetPillarSlider,
} from '../home/slice/pillarSliderSlice';
import {
  fetchAllbestPracticesMemberContents,
  resetbestPracticesMemberContent,
} from './slice/bestPracticesMemberContentSlice';

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/pillarPOESlice';

const BestPracticeScreen = props => {
  const dispatch = useDispatch();
  // const {pillarId} = props;
  const [pillarId, setPillarId] = useState();

  const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
    state => state.pillarSliders,
  );

  const {bestPractices, bestPracticeLoading, bestPracticeError} = useSelector(
    state => state.bestPractices,
  );

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

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

  const fetchAllPillarSlider = () => {
    dispatch(fetchAllPillarSliders());
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
  const cleanPillarSlider = () => {
    dispatch(resetPillarSlider());
  };

  useEffect(() => {
    let content = pillarSliders.flatMap((value, key) => {
      const slug = value?.slug;
      if (slug == 'best-practices') {
        setPillarId(value?.term_id);
      }
    });
  }, []);

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
      pillarId={pillarId}
    />
  );
};

export default BestPracticeScreen;
