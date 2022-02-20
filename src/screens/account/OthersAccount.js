import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import OthersAccount from './components/OthersAccount';
import {fetchOtherProfileByID, resetProfile} from './slice/otherProfileSlice';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';


const OtherAccountScreen = props => {

    const dispatch = useDispatch();

    const {otherProfiles, otherProfileLoading, otherProfileError} = useSelector(state => state.otherProfiles);


    /**
     * Fetch other member profile data.
     * @param {string} identifier
     *
     */
    const fetchOtherProfileByIdentifier = identifier => {
        dispatch(fetchOtherProfileByID(identifier));
    };

    const cleanProfile = () => {
        dispatch(resetProfile());
    };

	
    return (
        <OthersAccount
            {...props}
            otherProfiles={otherProfiles}
            otherProfileLoading={otherProfileLoading}
            otherProfileError={otherProfileError}
            fetchOtherProfileByIdentifier={fetchOtherProfileByIdentifier}
            cleanProfile={cleanProfile}

        />
    );
};

export default OtherAccountScreen;
