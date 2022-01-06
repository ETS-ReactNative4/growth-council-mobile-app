import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EditProfileForm from './components/EditProfile';
import {fetchProfileByID, updateUserByID, resetProfile} from './slice/profileSlice';

const EditProfileFormScreen = (props) => {

    const dispatch = useDispatch();

    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

    /**
     * Fetch user data.
     * @param {string} identifier
     *
     */
    const fetchProfileByIdentifier = identifier => {
        dispatch(fetchProfileByID(identifier));
    };


    /**
     * Update user data.
     * @param {object} formData
     *
     */
    const updateUser = formData => {
        return dispatch(updateUserByID(formData));
    };

    /**
     * Clear employee data.
     *
     */
    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    return (
        <EditProfileForm
            {...props}
            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            updateUser={updateUser}
            cleanProfile={cleanProfile}
        />
    );

};

export default EditProfileFormScreen;
