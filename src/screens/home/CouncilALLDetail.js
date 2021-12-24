import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CouncilAllDetail from './components/CouncilAllDetail';

const CouncilAllDetailScreen = props => {
  const dispatch = useDispatch();

  return <CouncilAllDetail {...props} />;
};

export default CouncilAllDetailScreen;
