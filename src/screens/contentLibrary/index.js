import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Content from './component';

const ContentScreen = props => {
  const dispatch = useDispatch();

  return <Content {...props} />;
};

export default ContentScreen;
