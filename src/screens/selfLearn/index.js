import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SelfLearn from './component';


const SelfLearnDetailScreen = props => {

    const dispatch = useDispatch();

    return (
        <SelfLearn
            {...props}
        />
    )
};

export default SelfLearnDetailScreen;