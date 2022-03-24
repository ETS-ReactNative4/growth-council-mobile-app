import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LibraryDetail from './component/libraryDetails';

import {
	fetchAllContentTags,
	resetcontentTags,
} from './slice/contentTagsSlice';

const ContentTagsScreen = props => {
  const dispatch = useDispatch();

  const {contentTags, contentTagsLoading, contentTagsError} =
    useSelector(state => state.contentTags);

  const fetchContentTags = resourceId => {
    dispatch(fetchAllContentTags(resourceId));
  };

  const cleanContentTags = () => {
    dispatch(resetcontentTags());
  };

  return (
    <LibraryDetail
      {...props}
      contentTags={contentTags}
      contentTagsLoading={contentTagsLoading}
      contentTagsError={contentTagsError}
      fetchContentTags={fetchContentTags}
      cleanContentTags={cleanContentTags}
    />
  );
};

export default ContentTagsScreen;
