import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import OthersAccount from './components/OthersAccount';
import {fetchOtherProfileByID, resetProfile} from './slice/otherProfileSlice';
import {fetchProfileByID,} from './slice/profileSlice';
import {
	connectMemberByID,
	resetConnectMember,
  } from '../people/slice/memberConnectionSlice';


const OtherAccountScreen = props => {

    const dispatch = useDispatch();

    const {otherProfiles, otherProfileLoading, otherProfileError} = useSelector(state => state.otherProfiles);
	const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);

    /**
     * Fetch other member profile data.
     * @param {string} identifier
     *
     */
    const fetchOtherProfileByIdentifier = identifier => {
        dispatch(fetchOtherProfileByID(identifier));
    };
	const connectMemberByIdentifier = formData => {
		return dispatch(connectMemberByID(formData));
	  };
	

    const cleanProfile = () => {
        dispatch(resetProfile());
    };
	const cleanConnectMember = () => {
		dispatch(resetConnectMember());
	  };
	
    return (
        <OthersAccount
            {...props}
            otherProfiles={otherProfiles}
            otherProfileLoading={otherProfileLoading}
            otherProfileError={otherProfileError}
            fetchOtherProfileByIdentifier={fetchOtherProfileByIdentifier}
            cleanProfile={cleanProfile}

			memberConnections={memberConnections}
			memberConnectionLoading={memberConnectionLoading}
			memberConnectionError={memberConnectionError}
			connectMemberByIdentifier={connectMemberByIdentifier}
			cleanConnectMember={cleanConnectMember}
        />
    );
};

export default OtherAccountScreen;
