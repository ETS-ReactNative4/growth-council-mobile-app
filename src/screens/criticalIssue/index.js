import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CriticalIssue from './component';

const CriticalIssueScreen = props => {
  const dispatch = useDispatch();

  return <CriticalIssue {...props} />;
};

export default CriticalIssueScreen;