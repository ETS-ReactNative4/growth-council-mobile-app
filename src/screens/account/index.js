import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';
import {fetchEventsByUserID, resetProfileEvent} from './slice/profileEventSlice';

const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    const {profileEvent, profileEventLoading, profileEventError} = useSelector((state) => state.profileEvent);
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

    return (
        <Profile
            {...props}

            profileEvent={profileEvent}
            profileEventLoading={profileEventLoading}
            profileEventError={profileEventError}
            fetchEventsByUserIdentifier={fetchEventsByUserIdentifier}
            cleanProfileEvent={cleanProfileEvent}

            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            cleanProfile={cleanProfile}
        />
    );

};

export default ProfileScreen;
