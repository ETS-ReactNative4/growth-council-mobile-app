import React from 'react';
import {useDispatch, useSelector} from 'react-redux';


import PrivacyDetails from './component/privacy';

import {fetchPrivacy, resetPrivacy} from './slice/privacySlice';

const PrivacyScreen = props => {
  const dispatch = useDispatch();

  const {privacy, privacyLoading, privacyError} = useSelector(
    state => state.privacy,
  );

  const fetchPrivacyPolicy = () => {
    dispatch(fetchPrivacy());
  };

  const cleanPrivacy = () => {
    dispatch(resetPrivacy());
  };

  return (
 

	<PrivacyDetails
      {...props}
      privacy={privacy}
      privacyLoading={privacyLoading}
      privacyError={privacyError}
      fetchPrivacyPolicy={fetchPrivacyPolicy}
      cleanPrivacy={cleanPrivacy}
    />
  );
};

export default PrivacyScreen;