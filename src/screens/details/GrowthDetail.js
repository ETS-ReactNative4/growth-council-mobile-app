import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthDetail from './components/GrowthDetail';

import {
  fetchAllgrowthCoachings,
  resetgrowthCoaching,
} from '../dashboard/slice/growthCoachingSlice';
import {
  fetchAllgrowthCoachingMemberContents,
  resetgrowthCoachingMemberContent,
} from '../dashboard/slice/growthCoachingMemberContentSlice';

const GrowthDetailScreen = props => {
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
    <GrowthDetail
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

export default GrowthDetailScreen;
