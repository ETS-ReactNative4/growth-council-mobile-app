import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import GrowthDetail from './components/GrowthDetail';

const GrowthDetailScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <GrowthDetail
            {...props}
        />
    );

};

export default GrowthDetailScreen
