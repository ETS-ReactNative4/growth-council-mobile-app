import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';

import {fetchAllCommunities, resetCommunity} from './slice/communitySlice';
import {
  fetchAllCommunityMemberContents,
  resetCommunityMemberContent,
} from './slice/communityMemberContentSlice';

const HomeCommunityScreen = props => {
  const dispatch = useDispatch();

  const {communities, communityLoading, communityError} = useSelector(
    state => state.communities,
  );
  const {
    communityMemberContents,
    communityMemberContentLoading,
    communityMemberContentError,
  } = useSelector(state => state.communityMemberContents);

  const fetchAllCommunity = () => {
    dispatch(fetchAllCommunities());
  };

  const fetchAllCommunityMemberContent = () => {
    dispatch(fetchAllCommunityMemberContents());
  };

  const cleanCommunity = () => {
    dispatch(resetCommunity());
  };

  const cleanCommunityMemberContent = () => {
    dispatch(resetCommunityMemberContent());
  };

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
    />
  );
};

export default HomeCommunityScreen;
