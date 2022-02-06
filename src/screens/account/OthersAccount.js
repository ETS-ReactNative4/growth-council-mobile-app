import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import OthersAccount from './components/OthersAccount';
import {fetchOtherProfileByID, resetProfile} from './slice/otherProfileSlice';
import {fetchAllExpertise, resetExpertise} from '../people/slice/expertiseSlice';

const OtherAccountScreen = props => {

    const dispatch = useDispatch();

    const {otherProfiles, otherProfileLoading, otherProfileError} = useSelector(state => state.otherProfiles);
	const {expertise, expertiseLoading, expertiseError} = useSelector((state) => state.expertise);

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

	const fetchAllExpertises = () => {
        dispatch(fetchAllExpertise());
    };
    return (
        <OthersAccount
            {...props}
            otherProfiles={otherProfiles}
            otherProfileLoading={otherProfileLoading}
            otherProfileError={otherProfileError}
            fetchOtherProfileByIdentifier={fetchOtherProfileByIdentifier}
            cleanProfile={cleanProfile}

			expertise={expertise}
            expertiseLoading={expertiseLoading}
            expertiseError={expertiseError}
            fetchAllExpertises={fetchAllExpertises}
        />
    );
};

export default OtherAccountScreen;
