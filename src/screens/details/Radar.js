import React from 'react';
import Radar from './components/Radar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRadarMemberDetails, resetRadarMemberDetails} from './slice/radarSlice';

const RadarScreen = props => {

  const {radarMemberDetails, radarMemberDetailsLoading, radarMemberDetailsError} = useSelector(
    state => state.radarMemberDetails,
  );

  const dispatch = useDispatch();

  const fetchRadarMemberDetail = () => {
    dispatch(fetchRadarMemberDetails());
  };

  const cleanPOEDetail = () => {
    dispatch(resetRadarMemberDetails());
  };

  return (
    <Radar
      {...props}   
      radarMemberDetails={radarMemberDetails}
      radarMemberDetailsLoading={radarMemberDetailsLoading}
      radarMemberDetailsError={radarMemberDetailsError}
      fetchRadarMemberDetail={fetchRadarMemberDetail}
      cleanPOEDetail={cleanPOEDetail}  
    />
  );
};

export default RadarScreen;
