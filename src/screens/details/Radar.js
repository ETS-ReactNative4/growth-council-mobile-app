import React from 'react';
import Radar from './components/Radar';
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
