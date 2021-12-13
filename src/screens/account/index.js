import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Profile from './components';
import {fetchEmployeeByID} from './profileSlice';

const ProfileScreen = (props) => {

    const dispatch = useDispatch();

    const {profile, loading, error} = useSelector((state) => state.profile);

    /**
     * Fetch employee data.
     * @param {string} identifier
     *
     */
    const fetchEmployeeByIdentifier = identifier => {
        dispatch(fetchEmployeeByID(identifier));
    };
    return (
        <Profile
            {...props}
            profile={profile}
            loading={loading}
            error={error}
            fetchEmployeeByIdentifier={fetchEmployeeByIdentifier}
        />
    );

};

export default ProfileScreen;
