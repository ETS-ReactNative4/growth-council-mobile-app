import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CouncilDetail from './components/CouncilDetail';

import {fetchPillarByID, resetPillar} from './pillarSlice';


const CouncilDetailScreen = (props) => {

    const dispatch = useDispatch();

    const {pillars, pillarLoading, pillarError} = useSelector((state) => state.pillars);


    /**
     * Fetch pillar data.
     * @param {string} identifier
     *
     */
    const fetchPillarByIdentifier = identifier => {
        dispatch(fetchPillarByID(identifier));
    };

	

    /**
     * Clear pillar data.
     *
     */
    const cleanPillar = () => {
        dispatch(resetPillar());
    };
	

    return (
        <CouncilDetail
            {...props}
            pillars={pillars}
            pillarLoading={pillarLoading}
            pillarError={pillarError}
            fetchPillarByIdentifier={fetchPillarByIdentifier}
            cleanPillar={cleanPillar}

			
        />
    );
};

export default CouncilDetailScreen;
