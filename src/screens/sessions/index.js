import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Session from './component';

import {fetchSessionByID, resetSession} from './slice/sessionSlice';

const SessionDetailScreen = props => {

    const dispatch = useDispatch();

	const {sessions, sessionLoading, sessionError} = useSelector((state) => state.sessions);

	const fetchSessionByIdentifier = identifier => {
        dispatch(fetchSessionByID(identifier));
    };

	const cleanSession = () => {
        dispatch(resetSession());
    };


    return (
        <Session
            {...props}
			sessions={sessions}
			sessionLoading={sessionLoading}
			sessionError={sessionError}
			fetchSessionByIdentifier={fetchSessionByIdentifier}
			cleanSession={cleanSession}
           
        />
    )
};

export default SessionDetailScreen;
