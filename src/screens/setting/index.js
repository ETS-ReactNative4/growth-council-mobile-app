import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import Setting from './components';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const SettingScreen = (props) => {
    const dispatch = useDispatch();

    const {profile, profileLoading, profileError} = useSelector((state) => state.profile);

    const fetchProfile = () => {
        dispatch(fetchProfileByID());
    };

    const cleanProfile = () => {
        dispatch(resetProfile());
    };

    return (
        <Setting
            {...props}

            profile={profile}
            profileLoading={profileLoading}
            profileError={profileError}
            fetchProfile={fetchProfile}
            cleanProfile={cleanProfile}
        />
    )
};

export default SettingScreen;
