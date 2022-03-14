import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ContentLibrary from './component/contentDetails';

const ContentLibraryScreen = props => {
  const dispatch = useDispatch();

  return <ContentLibrary {...props} />;
};

export default ContentLibraryScreen;
