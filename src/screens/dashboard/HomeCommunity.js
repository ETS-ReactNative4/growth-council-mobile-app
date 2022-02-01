import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';

import {fetchAllCommunities, resetCommunity} from './slice/communitySlice';
import {
  fetchAllCommunityMemberContents,
  resetCommunityMemberContent,
} from './slice/communityMemberContentSlice';

import {
  fetchAllPillarSliders,
  resetPillarSlider,
} from '../home/slice/pillarSliderSlice';

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/pillarPOESlice';

const HomeCommunityScreen = props => {
  const dispatch = useDispatch();
  const [pillarId, setPillarId] = useState();
  const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
    state => state.pillarSliders,
  );

  const {communities, communityLoading, communityError} = useSelector(
    state => state.communities,
  );

  const {
    communityMemberContents,
    communityMemberContentLoading,
    communityMemberContentError,
  } = useSelector(state => state.communityMemberContents);

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  const fetchAllCommunity = () => {
    dispatch(fetchAllCommunities());
  };

  const fetchAllCommunityMemberContent = () => {
    dispatch(fetchAllCommunityMemberContents());
  };

  const fetchAllPillarSlider = () => {
    dispatch(fetchAllPillarSliders());
  };

  const cleanCommunity = () => {
    dispatch(resetCommunity());
  };

  const cleanCommunityMemberContent = () => {
    dispatch(resetCommunityMemberContent());
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
      if (slug == 'community') {
        setPillarId(value?.term_id);
      }
    });
  }, []);

  return (
    <HomeCommunity
      {...props}
      communities={communities}
      communityLoading={communityLoading}
      communityError={communityError}
      fetchAllCommunity={fetchAllCommunity}
      cleanCommunity={cleanCommunity}
      communityMemberContents={communityMemberContents}
      communityMemberContentLoading={communityMemberContentLoading}
      communityMemberContentError={communityMemberContentError}
      fetchAllCommunityMemberContent={fetchAllCommunityMemberContent}
      cleanCommunityMemberContent={cleanCommunityMemberContent}
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
      pillarId={pillarId}
    />
  );
};

export default HomeCommunityScreen;
