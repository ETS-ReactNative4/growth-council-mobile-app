import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import OthersAccount from './components/OthersAccount';
import {fetchOtherProfileByID, resetProfile} from './slice/otherProfileSlice';

const OtherAccountScreen = props => {
  const dispatch = useDispatch();

  const {otherProfile, otherProfileLoading, otherProfileError} = useSelector(
    state => state.otherProfile,
  );

  const fetchOtherProfileByIdentifier = identifier => {
    dispatch(fetchOtherProfileByID(identifier));
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <OthersAccount
      {...props}
      otherProfile={otherProfile}
      otherProfileLoading={otherProfileLoading}
      otherProfileError={otherProfileError}
      fetchOtherProfileByIdentifier={fetchOtherProfileByIdentifier}
      cleanProfile={cleanProfile}
    />
  );
};

export default OtherAccountScreen;
