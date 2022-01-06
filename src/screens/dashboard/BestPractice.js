import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import BestPractice from './components/BestPractice';
import {fetchAllCommunityMembers, resetCommunityMember} from './slice/communityMemberSlice';


const BestPracticeScreen = (props) => {
	const dispatch = useDispatch();

    const {communityMembers, communityMemberLoading, communityMemberError} = useSelector((state) => state.communityMembers);

	const fetchAllCommunityMember = () => {
        dispatch(fetchAllCommunityMembers());
    };

	const cleanCommunityMember = () => {
        dispatch(resetCommunityMember());
    };
    
    return (
        <BestPractice
            {...props}
			communityMembers={communityMembers}
            communityMemberLoading={communityMemberLoading}
            communityMemberError={communityMemberError}
            fetchAllCommunityMember={fetchAllCommunityMember}
            cleanCommunityMember={cleanCommunityMember}
        />
    )
};

export default BestPracticeScreen

