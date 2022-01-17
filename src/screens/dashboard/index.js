import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';

import {
  fetchAllUpcomingEvents,
  resetUpcomingEvent,
} from '../home/slice/upcomingEventSlice';
import {
  fetchAllPillarSliders,
  resetPillarSlider,
} from '../home/slice/pillarSliderSlice';
import {
  fetchAllPointOfEngagements,
  resetPointOfEngagement,
} from './slice/pointOfEngagementSlice';
import {
  fetchAllCommunityMembers,
  resetCommunityMember,
} from './slice/communityMemberSlice';

const DashboardScreen = props => {
  const dispatch = useDispatch();

  const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
    state => state.pillarSliders,
  );

  const {upcomingEvents, upcomingEventLoading, upcomingEventError} =
    useSelector(state => state.upcomingEvents);
  const {pointOfEngagements, pointOfEngagementLoading, pointOfEngagementError} =
    useSelector(state => state.pointOfEngagements);
  const {communityMembers, communityMemberLoading, communityMemberError} =
    useSelector(state => state.communityMembers);

  /**
   * Fetch all upcoming events data.
   *
   */
  const fetchAllUpcomingEvent = () => {
    dispatch(fetchAllUpcomingEvents());
  };

  const fetchAllPointOfEngagement = () => {
    dispatch(fetchAllPointOfEngagements());
  };

  const fetchAllCommunityMember = () => {
    dispatch(fetchAllCommunityMembers());
  };

  const fetchAllPillarSlider = () => {
    dispatch(fetchAllPillarSliders());
  };

  /**
   * Clear upcoming event data.
   *
   */
  const cleanUpcomingEvent = () => {
    dispatch(resetUpcomingEvent());
  };

  const cleanPointOfEngagement = () => {
    dispatch(resetPointOfEngagement());
  };

  const cleanCommunityMember = () => {
    dispatch(resetCommunityMember());
  };
  const cleanPillarSlider = () => {
    dispatch(resetPillarSlider());
  };

  return (
    <Dashboard
      {...props}
      upcomingEvents={upcomingEvents}
      upcomingEventLoading={upcomingEventLoading}
      upcomingEventError={upcomingEventError}
      fetchAllUpcomingEvent={fetchAllUpcomingEvent}
      cleanUpcomingEvent={cleanUpcomingEvent}
      pointOfEngagements={pointOfEngagements}
      pointOfEngagementLoading={pointOfEngagementLoading}
      pointOfEngagementError={pointOfEngagementError}
      fetchAllPointOfEngagement={fetchAllPointOfEngagement}
      cleanPointOfEngagement={cleanPointOfEngagement}
      communityMembers={communityMembers}
      communityMemberLoading={communityMemberLoading}
      communityMemberError={communityMemberError}
      fetchAllCommunityMember={fetchAllCommunityMember}
      cleanCommunityMember={cleanCommunityMember}
      pillarSliders={pillarSliders}
      pillarSliderLoading={pillarSliderLoading}
      pillarSliderError={pillarSliderError}
      fetchAllPillarSlider={fetchAllPillarSlider}
      cleanPillarSlider={cleanPillarSlider}
    />
  );
};

export default DashboardScreen;
