import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';


const HomeCommunityScreen = (props) => {
	const dispatch = useDispatch();
	const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);

	const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };
	const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };
	return (
		<HomeCommunity
			{...props}
			upcomingEvents={upcomingEvents}
			upcomingEventLoading={upcomingEventLoading}
			upcomingEventError={upcomingEventError}
			fetchAllUpcomingEvent={fetchAllUpcomingEvent}
			cleanUpcomingEvent={cleanUpcomingEvent}
		/>
	)
}

export default HomeCommunityScreen;

const styles = StyleSheet.create({})
