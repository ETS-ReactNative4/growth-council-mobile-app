import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CriticalIssue from './component';
import {
  fetchAllCriticalIssue,
  resetCriticalIssue,
} from './slice/criticalIssueSlice';

const CriticalIssueScreen = props => {
  const dispatch = useDispatch();

  const {criticalIssue, criticalIssueLoading, criticalIssueError} = useSelector(
    state => state.criticalIssue,
  );

  const fetchCritcalIssue = () => {
    dispatch(fetchAllCriticalIssue());
  };

  const cleanCriticalIssue = () => {
    dispatch(resetCriticalIssue());
  };

  return (
    <CriticalIssue
      {...props}
      criticalIssue={criticalIssue}
      criticalIssueLoading={criticalIssueLoading}
      criticalIssueError={criticalIssueError}
      fetchCritcalIssue={fetchCritcalIssue}
      cleanCriticalIssue={cleanCriticalIssue}
    />
  );
};

export default CriticalIssueScreen;
