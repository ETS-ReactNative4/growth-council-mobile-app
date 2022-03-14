import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LibraryDetail from './component/libraryDetails';

const LibraryDetailScreen = props => {
  const dispatch = useDispatch();

  return <LibraryDetail {...props} />;
};

export default LibraryDetailScreen;
