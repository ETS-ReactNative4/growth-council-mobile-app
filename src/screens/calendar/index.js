import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EventCalendar from './components';
import {fetchAllCalendarEvents, resetCalendarEvent,} from './calendarEventSlice';

const EventCalendarScreen = (props) => {

    const dispatch = useDispatch();

    const {calendarEvents, calendarEventLoading, calendarEventError} = useSelector(state => state.calendarEvents);

    /**
     * Fetch all calendar events data.
     *
     */
    const fetchAllCalendarEvent = (formData) => {
       return dispatch(fetchAllCalendarEvents(formData));
    };

    /**
     * Clear calendar event data.
     *
     */
    const cleanCalendarEvent = () => {
        dispatch(resetCalendarEvent());
    };

    return (
        <EventCalendar
            {...props}
            calendarEvents={calendarEvents}
            calendarEventLoading={calendarEventLoading}
            calendarEventError={calendarEventError}
            fetchAllCalendarEvent={fetchAllCalendarEvent}
            cleanCalendarEvent={cleanCalendarEvent}
        />
    );
};

export default EventCalendarScreen;
