import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Calendar from './components';

const CalendarScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Calendar
            {...props}
        />
    );
};

export default CalendarScreen;
