import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ContactTags from './component/contentTags';

import {
	fetchAllContentTags,
	resetcontentTags,
} from './slice/contentTagsSlice';

const ContentTagsScreen = props => {
  const dispatch = useDispatch();

  const {contentTags, contentTagsLoading, contentTagsError} =
    useSelector(state => state.contentTags);

  const fetchContentTags = id => {
    dispatch(fetchAllContentTags(id));
  };

  const cleanContentTags = () => {
    dispatch(resetcontentTags());
  };

  return (
    <ContactTags
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
