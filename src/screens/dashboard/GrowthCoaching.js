import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthCoaching from './components/GrowthCoaching';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';
import {fetchAllCommunityMembers, resetCommunityMember} from './slice/communityMemberSlice';

const GrowthCoachingScreen = (props) => {
	const dispatch = useDispatch();

	const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);
    const {communityMembers, communityMemberLoading, communityMemberError} = useSelector((state) => state.communityMembers);

	const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };

	const fetchAllCommunityMember = () => {
        dispatch(fetchAllCommunityMembers());
    };

	const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };

	const cleanCommunityMember = () => {
        dispatch(resetCommunityMember());
    };

    return (
        <GrowthCoaching
            {...props}
			upcomingEvents={upcomingEvents}
            upcomingEventLoading={upcomingEventLoading}
            upcomingEventError={upcomingEventError}
            fetchAllUpcomingEvent={fetchAllUpcomingEvent}
            cleanUpcomingEvent={cleanUpcomingEvent}
			
			communityMembers={communityMembers}
            communityMemberLoading={communityMemberLoading}
            communityMemberError={communityMemberError}
            fetchAllCommunityMember={fetchAllCommunityMember}
            cleanCommunityMember={cleanCommunityMember}
        />
    )
};

export default GrowthCoachingScreen
