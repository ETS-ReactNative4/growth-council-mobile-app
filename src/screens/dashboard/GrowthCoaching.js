import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthCoaching from './components/GrowthCoaching';
import {
  fetchAllgrowthCoachings,
  resetgrowthCoaching,
} from './slice/growthCoachingSlice';
import {
  fetchAllgrowthCoachingMemberContents,
  resetgrowthCoachingMemberContent,
} from './slice/growthCoachingMemberContentSlice';

const GrowthCoachingScreen = props => {
  const dispatch = useDispatch();

  const {growthCoachings, growthCoachingLoading, growthCoachingError} =
    useSelector(state => state.growthCoachings);
  const {
    growthCoachingMemberContents,
    growthCoachingMemberContentLoading,
    growthCoachingMemberContentError,
  } = useSelector(state => state.growthCoachingMemberContents);

  const fetchAllgrowthCoaching = () => {
    dispatch(fetchAllgrowthCoachings());
  };

  const fetchAllgrowthCoachingMemberContent = () => {
    dispatch(fetchAllgrowthCoachingMemberContents());
  };

  const cleangrowthCoaching = () => {
    dispatch(resetgrowthCoaching());
  };

  const cleangrowthCoachingMemberContent = () => {
    dispatch(resetgrowthCoachingMemberContent());
  };

  return (
    <GrowthCoaching
      {...props}
      growthCoachings={growthCoachings}
      growthCoachingLoading={growthCoachingLoading}
      growthCoachingError={growthCoachingError}
      fetchAllgrowthCoaching={fetchAllgrowthCoaching}
      cleangrowthCoaching={cleangrowthCoaching}
      growthCoachingMemberContents={growthCoachingMemberContents}
      growthCoachingMemberContentLoading={growthCoachingMemberContentLoading}
      growthCoachingMemberContentError={growthCoachingMemberContentError}
      fetchAllgrowthCoachingMemberContent={fetchAllgrowthCoachingMemberContent}
      cleangrowthCoachingMemberContent={cleangrowthCoachingMemberContent}
    />
  );
};

export default GrowthCoachingScreen;
