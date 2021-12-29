import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './upcomingEventSlice';

const DashboardScreen = (props) => {

    const dispatch = useDispatch();

    const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);

    /**
     * Fetch all upcoming events data.
     *
     */
    const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };

    /**
     * Clear upcoming event data.
     *
     */
    const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };
    return (
        <Dashboard
            {...props}
            upcomingEvents={upcomingEvents}
            upcomingEventLoading={upcomingEventLoading}
            upcomingEventError={upcomingEventError}
            fetchAllUpcomingEvent={fetchAllUpcomingEvent}
            cleanUpcomingEvent={cleanUpcomingEvent}
        />
    );
};

export default DashboardScreen;
