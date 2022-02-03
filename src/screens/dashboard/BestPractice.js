import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BestPractice from './components/BestPractice';
import {
  fetchAllPillarEvents,
  resetPillarEvent,
} from './slice/pillarEventsSlice';
import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from '../details/slice/pillarMembersContentsSlice';

// import {
//   fetchAllPillarSliders,
//   resetPillarSlider,
// } from '../home/slice/pillarSliderSlice';

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/pillarPOESlice';

const BestPracticeScreen = props => {
  const dispatch = useDispatch();
  const {pillarEvents, pillarEventLoading, pillarEventError} = useSelector(
    state => state.pillarEvents,
  );
  const {
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
  } = useSelector(state => state.pillarMemberContents);
  //const {pillarId} = props;
  //const [pillarId, setPillarId] = useState();

  // const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
  //   state => state.pillarSliders,
  // );

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  // const fetchAllPillarSlider = () => {
  //   dispatch(fetchAllPillarSliders());
  // };

  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };
  // const cleanPillarSlider = () => {
  //   dispatch(resetPillarSlider());
  // };

  const fetchAllPillarEvent = pillarId => {
    dispatch(fetchAllPillarEvents(pillarId));
  };

  const cleanPillarEvent = () => {
    dispatch(resetPillarEvent());
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  const cleanPillarMemberContent = () => {
    dispatch(resetPillarMemberContent());
  };

  // useEffect(() => {
  //   let content = pillarSliders.flatMap((value, key) => {
  //     const slug = value?.slug;
  //     if (slug == 'best-practices') {
  //       setPillarId(value?.term_id);
  //     }
  //   });
  // }, []);

  return (
    <BestPractice
      {...props}
      pillarEvents={pillarEvents}
      pillarEventLoading={pillarEventLoading}
      pillarEventError={pillarEventError}
      fetchAllPillarEvent={fetchAllPillarEvent}
      cleanPillarEvent={cleanPillarEvent}
      pillarMemberContents={pillarMemberContents}
      pillarMemberContentLoading={pillarMemberContentLoading}
      pillarMemberContentError={pillarMemberContentError}
      fetchAllPillarMemberContent={fetchAllPillarMemberContent}
      cleanPillarMemberContent={cleanPillarMemberContent}
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
      // pillarId={pillarId}
    />
  );
};

export default BestPracticeScreen;
