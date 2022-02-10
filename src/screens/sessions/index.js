import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Session from './component';

import {fetchSessionByID, resetSession} from './slice/sessionSlice';
import {registerSessionByID, resetSessionRegister} from './slice/sessionRegister';

const SessionDetailScreen = props => {
    const dispatch = useDispatch();

    const {sessions, sessionLoading, sessionError} = useSelector(( state) => state.sessions
    );
    const {sessionRegisters, sessionRegisterLoading, sessionRegisterError} =
        useSelector((state) => state.sessionRegisters);

    const fetchSessionByIdentifier = identifier => {
        dispatch(fetchSessionByID(identifier));
    };

    const registerSessionByIdentifier = formData => {
        return dispatch(registerSessionByID(formData));
    };

    const cleanSession = () => {
        dispatch(resetSession());
    };

    const cleanSessionRegister = () => {
        dispatch(resetSessionRegister());
    };

    return (
        <Session
            {...props}
            sessions={sessions}
            sessionLoading={sessionLoading}
            sessionError={sessionError}
            fetchSessionByIdentifier={fetchSessionByIdentifier}
            cleanSession={cleanSession}
            sessionRegisters={sessionRegisters}
            sessionRegisterLoading={sessionRegisterLoading}
            sessionRegisterError={sessionRegisterError}
            registerSessionByIdentifier={registerSessionByIdentifier}
            cleanSessionRegister={cleanSessionRegister}
        />
    );
};

export default SessionDetailScreen;
