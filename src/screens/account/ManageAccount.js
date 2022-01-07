import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import ManageAccount from './components/ManageAccount';
import {fetchProfileByID, fetchProfiles,updateUserByID, resetProfile} from './slice/profileSlice';


const ManageAccountScreen = (props) => {

    const dispatch = useDispatch();
	const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

	
	const fetchProfile =() =>{
		dispatch(fetchProfiles());
	}

	const updateUser = formData => {
        return dispatch(updateUserByID(formData));
    };


    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    return (
        <ManageAccount
            {...props}
			profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            // fetchProfileByIdentifier={fetchProfileByIdentifier}
			fetchProfile={fetchProfile}
			updateUser={updateUser}
            cleanProfile={cleanProfile}
		/>
    )
};

export default ManageAccountScreen
