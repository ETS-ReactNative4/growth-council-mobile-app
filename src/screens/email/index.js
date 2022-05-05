import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Email from './component';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const EmailScreen = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <Email
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
    />
  );
};

export default EmailScreen;
