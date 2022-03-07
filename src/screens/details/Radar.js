import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const RadarScreen = props => {
  const dispatch = useDispatch();

  return (
    <Radar
      {...props}
     
    />
  );
};

export default RadarScreen;
