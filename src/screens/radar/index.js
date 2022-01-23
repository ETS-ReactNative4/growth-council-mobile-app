import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import FrostRadar from './components';

const FrostRadarScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <FrostRadar
            {...props}/>
    )
};

export default FrostRadarScreen;
