import React from 'react';
import {useSelector, useDispatch} from 'react-redux';


import ChangePasswordForm from './components/ChangePassword';
import {updateCustomerByID, resetCustomerPassword} from './slice/passwordSlice';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';

const ChangePasswordScreen = (props) => {

    const dispatch = useDispatch();

	const {profile, profileLoading, profileError} = useSelector((state) => state.profile);
    const {entities, loading, error} = useSelector((state) => state.password);



	const fetchProfileByIdentifier = () => {
        dispatch(fetchProfileByID());
    };

    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    /**
     * Update customer data.
     * @param {object} formData
     *
     */
    const updateCustomerPassword = formData => {
        return dispatch(updateCustomerByID(formData));
    };

    const cleanCustomerPassword = () => {
        dispatch(resetCustomerPassword());
    };

    return (
        <ChangePasswordForm
            {...props}
            {...props}
            password={entities}
            loading={loading}
            error={error}
            updateCustomerPassword={updateCustomerPassword}
            cleanCustomerPassword={cleanCustomerPassword}

			profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            cleanProfile={cleanProfile}
        />
    );

};

export default ChangePasswordScreen;
