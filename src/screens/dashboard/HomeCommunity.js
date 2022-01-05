import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';

import {fetchAllsessions, resetsession} from './slice/sessionSlice';
import {
  fetchAllCommunityMembers,
  resetCommunityMember,
} from './slice/communityMemberSlice';

const HomeCommunityScreen = props => {
  const dispatch = useDispatch();

  const {sessions, sessionLoading, sessionError} = useSelector(
    state => state.sessions,
  );
  const {communityMembers, communityMemberLoading, communityMemberError} =
    useSelector(state => state.communityMembers);

  const fetchAllsession = () => {
    dispatch(fetchAllsessions());
  };

  const fetchAllCommunityMember = () => {
    dispatch(fetchAllCommunityMembers());
  };

  const cleansession = () => {
    dispatch(resetsession());
  };

  const cleanCommunityMember = () => {
    dispatch(resetCommunityMember());
  };

  return (
    <HomeCommunity
      {...props}
      sessions={sessions}
      sessionLoading={sessionLoading}
      sessionError={sessionError}
      fetchAllsession={fetchAllsession}
      cleansession={cleansession}
      communityMembers={communityMembers}
      communityMemberLoading={communityMemberLoading}
      communityMemberError={communityMemberError}
      fetchAllCommunityMember={fetchAllCommunityMember}
      cleanCommunityMember={cleanCommunityMember}
    />
  );
};

export default HomeCommunityScreen;
