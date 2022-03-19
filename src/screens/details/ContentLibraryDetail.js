import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ContentLibraryDetail from './components/ContentLibraryDetail';

import { fetchAllContentLibraryDetails, resetContentLibraryDetails} from './slice/contentLibraryDetailSlice';

const ContentLibraryDetailScreen = props => {
	const dispatch = useDispatch();

	const {contentLibraryDetails, contentLibraryDetailsLoading, contentLibraryDetailsError} =
	  useSelector(state => state.contentLibraryDetails);
  
	const fetchContentLibraryDetail = () => {
	  dispatch(fetchAllContentLibraryDetails());
	};
  
	const cleanContentLibraryDetail = () => {
	  dispatch(resetContentLibraryDetails());
	};

  return( <ContentLibraryDetail {...props} 
	contentLibraryDetails={contentLibraryDetails}
	contentLibraryDetailsLoading={contentLibraryDetailsLoading}
	contentLibraryDetailsError={contentLibraryDetailsError}
	fetchContentLibraryDetail={fetchContentLibraryDetail}
	cleanContentLibraryDetail={cleanContentLibraryDetail}
  />)
};

export default ContentLibraryDetailScreen;
