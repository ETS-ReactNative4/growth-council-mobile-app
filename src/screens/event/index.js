import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Event from './component';

const EventDetailScreen = props => {
  const dispatch = useDispatch();

  return <Event {...props} />;
};

export default EventDetailScreen;
