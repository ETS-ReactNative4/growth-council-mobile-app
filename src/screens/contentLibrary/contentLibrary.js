import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ContentLibrary from './component/contentDetails';
import {
  fetchAllContentLibrary,
  resetContentLibrary,
} from './slice/contentLibrarySlice';

const ContentLibraryScreen = props => {
  const dispatch = useDispatch();

  const {contentLibrary, contentLibraryLoading, contentLibraryError} =
    useSelector(state => state.contentLibrary);

  const fetchContentLibrary = resourceId => {
    dispatch(fetchAllContentLibrary(resourceId));
  };

  const cleanContentLibrary = () => {
    dispatch(resetContentLibrary());
  };

  return (
    <ContentLibrary
      {...props}
      contentLibrary={contentLibrary}
      contentLibraryLoading={contentLibraryLoading}
      contentLibraryError={contentLibraryError}
      fetchContentLibrary={fetchContentLibrary}
      cleanContentLibrary={cleanContentLibrary}
    />
  );
};

export default ContentLibraryScreen;
