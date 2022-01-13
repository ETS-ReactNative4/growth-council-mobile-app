import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EditProfileForm from './components/EditProfile';
import {fetchEmployeeByID, updateEmployeeByID, resetProfile} from './profileSlice';

const EditProfileFormScreen = (props) => {

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
     * Update employee data.
     * @param {object} formData
     *
     */
    const updateEmployee = formData => {
        return dispatch(updateEmployeeByID(formData));
    };

    /**
     * Clear employee data.
     *
     */
    const cleanEmployee = () => {
        dispatch(resetProfile());
    };

    return (
        <EditProfileForm
            {...props}
            profile={profile}
            loading={loading}
            error={error}
            fetchEmployeeByIdentifier={fetchEmployeeByIdentifier}
            updateEmployee={updateEmployee}
            cleanEmployee={cleanEmployee}
        />
    );

};

export default EditProfileFormScreen;
