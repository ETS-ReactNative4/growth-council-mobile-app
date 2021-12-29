import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';
import {fetchAllPointOfEngagements, resetPointOfEngagement} from './slice/pointOfEngagementSlice';
import {fetchAllCommunityMembers, resetCommunityMember} from './slice/communityMemberSlice';

const DashboardScreen = (props) => {

    const dispatch = useDispatch();

    const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);
    const {pointOfEngagements, pointOfEngagementLoading, pointOfEngagementError} = useSelector((state) => state.pointOfEngagements);
    const {communityMembers, communityMemberLoading, communityMemberError} = useSelector((state) => state.communityMembers);

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
        />
    );
};

export default DashboardScreen;
