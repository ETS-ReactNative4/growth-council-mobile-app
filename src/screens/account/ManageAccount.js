import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import ManageAccount from './components/ManageAccount';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';
import {updateUserByID, resetUser} from './slice/userSlice';

const ManageAccountScreen = (props) => {

    const dispatch = useDispatch();

    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);
    const {users, userLoading, userError} = useSelector((state) => state.users);


    const fetchProfileByIdentifier = () => {
        dispatch(fetchProfileByID());
    };

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
            fetchProfileByIdentifier={fetchProfileByIdentifier}
            updateUser={updateUser}
            cleanProfile={cleanProfile}
        />
    )
};

export default ManageAccountScreen
