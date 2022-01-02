import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';

import {fetchAllCommunityMembers, resetCommunityMember} from './slice/communityMemberSlice';


const HomeCommunityScreen = (props) => {

	const dispatch = useDispatch();

	const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);

	const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };
	const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };

	
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
		<HomeCommunity
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
}

export default HomeCommunityScreen;

const styles = StyleSheet.create({})
