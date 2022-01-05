import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthCoaching from './components/GrowthCoaching';
import {fetchAllCommunityMembers, resetCommunityMember} from './slice/communityMemberSlice';

const GrowthCoachingScreen = (props) => {
	const dispatch = useDispatch();

    const {communityMembers, communityMemberLoading, communityMemberError} = useSelector((state) => state.communityMembers);

	const fetchAllCommunityMember = () => {
        dispatch(fetchAllCommunityMembers());
    };

	const cleanCommunityMember = () => {
        dispatch(resetCommunityMember());
    };

    return (
        <GrowthCoaching
            {...props}
			communityMembers={communityMembers}
            communityMemberLoading={communityMemberLoading}
            communityMemberError={communityMemberError}
            fetchAllCommunityMember={fetchAllCommunityMember}
            cleanCommunityMember={cleanCommunityMember}
        />
    )
};

export default GrowthCoachingScreen
