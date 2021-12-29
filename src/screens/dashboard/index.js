import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './upcomingEventSlice';
import { fetchAllPointOfEngagements, resetPointOfEngagement } from './slice/PointOfEngagementSlice';
import {fetchAllCommunityMembers, resetCommunityMember} from './slice/CommunityMemberSlice';
const DashboardScreen = (props) => {

    const dispatch = useDispatch();

    const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);
	const {PointOfEngagement,PointOfEngagementLoading, PointOfEngagementError} = useSelector((state) => state.PointOfEngagement);
	const {CommunityMember,CommunityMemberLoading, CommunityMemberError} = useSelector((state) => state.CommunityMember);

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

			PointOfEngagement={PointOfEngagement}
			PointOfEngagementLoading={PointOfEngagementLoading}
			PointOfEngagementError={PointOfEngagementError}
			fetchAllPointOfEngagement={fetchAllPointOfEngagement}
			cleanPointOfEngagement={cleanPointOfEngagement}

			CommunityMember={CommunityMember}
			CommunityMemberLoading={CommunityMemberLoading}
			CommunityMemberError={CommunityMemberError}
			fetchAllCommunityMember={fetchAllCommunityMember}
			cleanCommunityMember={cleanCommunityMember}
        />
    );
};

export default DashboardScreen;
