import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Event from './components';

import {fetchEventByID, resetEvent} from './eventSlice';

const EventDetailScreen = props => {

    const dispatch = useDispatch();

    const {events, eventLoading, eventError} = useSelector((state) => state.events);

    /**
     * Fetch event data.
     * @param {string} identifier
     *
     */
    const fetchEventByIdentifier = identifier => {
        dispatch(fetchEventByID(identifier));
    };

    /**
     * Clear event data.
     *
     */
    const cleanEvent = () => {
        dispatch(resetEvent());
    };

    return (
        <Event
            {...props}
            events={events}
            eventLoading={eventLoading}
            eventError={eventError}
            fetchEventByIdentifier={fetchEventByIdentifier}
            cleanEvent={cleanEvent}
        />
    )
};

export default EventDetailScreen;
