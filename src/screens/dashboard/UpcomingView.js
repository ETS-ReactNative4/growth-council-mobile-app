import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UpcomingView from './components/upcomingView';

import {fetchAllUpcomingEvents, resetUpcomingEvent} from '../home/slice/upcomingEventSlice';


const UpcomingScreen = (props) => {

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
        <UpcomingView
            {...props}
            upcomingEvents={upcomingEvents}
            upcomingEventLoading={upcomingEventLoading}
            upcomingEventError={upcomingEventError}
            fetchAllUpcomingEvent={fetchAllUpcomingEvent}
            cleanUpcomingEvent={cleanUpcomingEvent}

        />
    );
};

export default UpcomingScreen;
