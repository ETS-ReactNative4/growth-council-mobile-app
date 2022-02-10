import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';
import {fetchEventsByUserID, resetProfileEvent} from './slice/profileEventSlice';
import {fetchSessionsByUserID, resetprofileSession} from './slice/profileSessionSlice';

const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    const {profileEvent, profileEventLoading, profileEventError} = useSelector((state) => state.profileEvent);	
    const {profileSession, profileSessionLoading, profileSessionError} = useSelector((state) => state.profileSession);
    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

    /**
     * Fetch profile data.
     *
     *
     */
    const fetchProfileByIdentifier = () => {
        dispatch(fetchProfileByID());
    };

    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    const fetchEventsByUserIdentifier = identifier => {
        dispatch(fetchEventsByUserID(identifier));
    };

    const cleanProfileEvent = () => {
        dispatch(resetProfileEvent());
    };

	const fetchSessionsByUserIdentifier = identifier => {
        dispatch(fetchSessionsByUserID(identifier));
    };

	const cleanProfileSession =() =>{
		dispatch(resetprofileSession());
	}
    return (
        <Profile
            {...props}

            profileEvent={profileEvent}
            profileEventLoading={profileEventLoading}
            profileEventError={profileEventError}
            fetchEventsByUserIdentifier={fetchEventsByUserIdentifier}
            cleanProfileEvent={cleanProfileEvent}

			profileSession={profileSession}
			profileSessionLoading={profileSessionLoading}
			profileSessionError={profileSessionError}
			fetchSessionsByUserIdentifier={fetchSessionsByUserIdentifier}
			cleanProfileSession={cleanProfileSession}
	
            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            cleanProfile={cleanProfile}
        />
    );

};

export default ProfileScreen;
