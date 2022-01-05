import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchEmployeeByID} from './profileSlice';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from './slice/upcomingEventSlice';
import {fetchProfilesByID, resetProfile} from './slice/profileSlice';


const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    // const {profile, loading, error} = useSelector((state) => state.profile);
	const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);
	const {profile, profileLoading, profileError} = useSelector((state) => state.profile);
    /**
     * Fetch profile data.
     * @param {string} identifier
     *
     */
    // const fetchEmployeeByIdentifier = identifier => {
    //     dispatch(fetchEmployeeByID(identifier));
    // };

	const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };
	const fetchProfileIdentifier = identifier =>{
		dispatch(fetchProfilesByID(identifier));
	}

	const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };
	const cleanProfile =() =>{
		dispatch(resetProfile());
	};
    return (
        <Profile
            {...props}
            // profile={profile}
            // loading={loading}
            // error={error}
            // fetchEmployeeByIdentifier={fetchEmployeeByIdentifier}

			upcomingEvents={upcomingEvents}
            upcomingEventLoading={upcomingEventLoading}
            upcomingEventError={upcomingEventError}
            fetchAllUpcomingEvent={fetchAllUpcomingEvent}
            cleanUpcomingEvent={cleanUpcomingEvent}

			profile={profile}
			profileLoading={profileLoading}
			profileError={profileError}
			fetchProfileIdentifier={fetchProfileIdentifier}
			cleanProfile={cleanProfile}
        />
    );

};

export default ProfileScreen;
