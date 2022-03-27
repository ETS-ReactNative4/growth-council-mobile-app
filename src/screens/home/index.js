import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Home from './components';

import {fetchAllPillarSliders, resetPillarSlider} from './slice/pillarSliderSlice';

const HomeScreen = (props) => {

    const dispatch = useDispatch();

    const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector((state) => state.pillarSliders);

    /**
     * Fetch all pillar slider data.
     *
     */
    const fetchAllPillarSlider = () => {
        dispatch(fetchAllPillarSliders());

    };

    /**
     * Clear pillar slider data.
     *
     */
    const cleanPillarSlider = () => {
        dispatch(resetPillarSlider());
    };

    return (
        <Home
            {...props}
            pillarSliders={pillarSliders}
            pillarSliderLoading={pillarSliderLoading}
            pillarSliderError={pillarSliderError}
            fetchAllPillarSlider={fetchAllPillarSlider}
            cleanPillarSlider={cleanPillarSlider}
        />
    );
};

export default HomeScreen;
