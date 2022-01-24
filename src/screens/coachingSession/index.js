import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CoachingSession from './component';


const CoachingSessionDetailScreen = props => {

    const dispatch = useDispatch();

    return (
        <CoachingSession
            {...props}
        />
    )
};

export default CoachingSessionDetailScreen;
