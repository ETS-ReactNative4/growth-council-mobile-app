import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';

const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);
    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

    /**
     * Fetch profile data.
     * @param {string} identifier
     *
     */
    const fetchProfileByIdentifier = identifier => {
        dispatch(fetchProfileByID(identifier));
    };

    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };

    const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };

    return (
        <Profile
            {...props}

            upcomingEvents={upcomingEvents}
            upcomingEventLoading={upcomingEventLoading}
            upcomingEventError={upcomingEventError}
            fetchAllUpcomingEvent={fetchAllUpcomingEvent}
            cleanUpcomingEvent={cleanUpcomingEvent}

            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            cleanProfile={cleanProfile}
        />
    );

};

export default ProfileScreen;
