import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CoachingSession from './component';
import { fetchAllTraits, resetTraits } from './slice/sessionTraitsSlice';
import {fetchSessionByID, resetSession} from '../sessions/slice/sessionSlice';
import {registerSessionByID, resetSessionRegister} from '../sessions/slice/sessionRegister';

const CoachingSessionDetailScreen = props => {

    const dispatch = useDispatch();
	const {traits,traitsLoading,traitsError}= useSelector(state => state.traits);
	const {sessions, sessionLoading, sessionError} = useSelector((state) => state.sessions);
	const {sessionRegisters, sessionRegisterLoading, sessionRegisterError} = useSelector((state) => state.sessionRegisters);


	const fetchAllTraits = sessionId =>{
		dispatch(fetchAllTraits(sessionId));
	}

	const cleanTraits =()=>{
		dispatch(resetTraits());
	};

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
        <CoachingSession
            {...props}

			traits={traits}
			traitsLoading={traitsLoading}
			traitsError={traitsError}
			fetchAllTraits={fetchAllTraits}
			cleanTraits={cleanTraits}

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
    )
};

export default CoachingSessionDetailScreen;
