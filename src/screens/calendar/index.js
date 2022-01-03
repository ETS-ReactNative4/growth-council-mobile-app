import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EventCalendar from './components';

const EventCalendarScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <EventCalendar
            {...props}
        />
    );
};

export default EventCalendarScreen;
