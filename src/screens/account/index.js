import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchProfileByID, fetchProfiles, resetProfile} from './slice/profileSlice';
import {fetchProfileEvents, resetProfileEvent} from './slice/profileEventSlice';

const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    const {profileEvent, profileEventLoading, profileEventError} = useSelector((state) => state.profileEvent);
    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

    /**
     * Fetch profile data.
     * @param {string} identifier
     *
     */

	const fetchProfile=()=>{
		dispatch(fetchProfiles());
	}
    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    const fetchProfileEventIdentifier = identifier => {
        dispatch(fetchProfileEvents(identifier));
    };

    const cleanProfileEvent = () => {
        dispatch(resetProfileEvent());
    };

    return (
        <Profile
            {...props}

            profileEvent={profileEvent}
            profileEventLoading={profileEventLoading}
            profileEventError={profileEventError}
            fetchProfileEventIdentifier={fetchProfileEventIdentifier}
            cleanProfileEvent={cleanProfileEvent}

            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
			fetchProfile={fetchProfile}
            cleanProfile={cleanProfile}
        />
    );

};

export default ProfileScreen;
