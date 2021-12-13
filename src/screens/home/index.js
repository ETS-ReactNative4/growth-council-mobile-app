import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Home from './components';
import {fetchEmployeeByID, resetProfile} from '../account/profileSlice';

const HomeScreen = (props) => {

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

    /**
     * Clear employee data.
     *
     */
    const cleanEmployee = () => {
        dispatch(resetProfile());
    };

    return (
        <Home
            {...props}
            profile={profile}
            loading={loading}
            error={error}
            fetchEmployeeByIdentifier={fetchEmployeeByIdentifier}
            cleanEmployee={cleanEmployee}
        />
    );
};

export default HomeScreen;
