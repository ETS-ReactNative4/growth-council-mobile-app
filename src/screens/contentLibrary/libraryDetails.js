import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LibraryDetail from './component/libraryDetails';

import {
  fetchAllLibraryDetails,
  resetLibraryDetails,
} from './slice/libraryDetailSlice';

const LibraryDetailScreen = props => {
  const dispatch = useDispatch();

  const {libraryDetails, libraryDetailsLoading, libraryDetailsError} =
    useSelector(state => state.libraryDetails);

  const fetchLibraryDetail = resourceId => {
    dispatch(fetchAllLibraryDetails(resourceId));
  };

  const cleanLibraryDetail = () => {
    dispatch(resetLibraryDetails());
  };

  return (
    <LibraryDetail
      {...props}
      libraryDetails={libraryDetails}
      libraryDetailsLoading={libraryDetailsLoading}
      libraryDetailsError={libraryDetailsError}
      fetchLibraryDetail={fetchLibraryDetail}
      cleanLibraryDetail={cleanLibraryDetail}
    />
  );
};

export default LibraryDetailScreen;
