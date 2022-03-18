import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Content from './component';
import {fetchAllContent, resetContent} from './slice/contentSlice';

const ContentScreen = props => {
  const dispatch = useDispatch();

  const {content, contentLoading, contentError} = useSelector(
    state => state.content,
  );

  const fetchContent = () => {
    dispatch(fetchAllContent());
  };

  const cleanContent = () => {
    dispatch(resetContent());
  };

  return (
    <Content
      {...props}
      content={content}
      contentLoading={contentLoading}
      contentError={contentError}
      fetchContent={fetchContent}
      cleanContent={cleanContent}
    />
  );
};

export default ContentScreen;
