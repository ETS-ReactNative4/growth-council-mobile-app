import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CommunityDetail from './components/CommunityDetail';

import {
  fetchSessionDetailByID,
  resetSessionDetail,
} from './slice/sesssionDetailSlice';

const CommunityDetailScreen = props => {
  const dispatch = useDispatch();

  const {sessionDetails, sessionDetailLoading, sessionDetailError} =
    useSelector(state => state.CommunityDetail);

  /**
   * Fetch event data.
   * @param {string} identifier
   *
   */
  const fetchSessionDetailByIdentifier = identifier => {
    dispatch(fetchSessionDetailByID(identifier));
  };

  /**
   * Clear event data.
   *
   */
  const cleanSessionDetail = () => {
    dispatch(resetSessionDetail());
  };

  return (
    <CommunityDetail
      {...props}
      sessionDetails={sessionDetails}
      sessionDetailLoading={sessionDetailLoading}
      sessionDetailError={sessionDetailError}
      fetchSessionDetailByIdentifier={fetchSessionDetailByIdentifier}
      cleanSessionDetail={cleanSessionDetail}
    />
  );
};

export default CommunityDetailScreen;
