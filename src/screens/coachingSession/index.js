import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Text} from 'react-native';

import CoachingSession from './component';
import {fetchAllTraits, resetTraits} from './slice/sessionTraitsSlice';
import {fetchSessionByID, resetSession} from '../sessions/slice/sessionSlice';
import {
  registerSessionByID,
  resetSessionRegister,
} from '../sessions/slice/sessionRegister';

const CoachingSessionDetailScreen = props => {
  const dispatch = useDispatch();
  const {route} = props;
  const {traits, traitsLoading, traitsError} = useSelector(
    state => state.traits,
  );
  const {sessions, sessionLoading, sessionError} = useSelector(
    state => state.sessions,
  );
  const {sessionRegisters, sessionRegisterLoading, sessionRegisterError} =
    useSelector(state => state.sessionRegisters);

  useEffect(() => {
    fetchSessionByIdentifier(route.params.id);
    return () => {
      cleanSession();
    };
  }, []);

  useEffect(() => {
    fetchAllTraitBySessionId(sessions.ID);
    return () => {
      cleanTraits();
    };
  }, [sessions]);

  const fetchAllTraitBySessionId = sessionId => {
    dispatch(fetchAllTraits(sessionId));
  };

  const cleanTraits = () => {
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

  if (traitsLoading && sessionLoading) {
    return null;
  }

  return (
    <CoachingSession
      {...props}
      traits={traits}
      traitsLoading={traitsLoading}
      traitsError={traitsError}
      fetchAllTraits={fetchAllTraits}
      cleanTraits={cleanTraits}
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

export default CoachingSessionDetailScreen;
