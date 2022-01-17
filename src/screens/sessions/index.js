import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Session from './component';



const SessionDetailScreen = props => {

    const dispatch = useDispatch();

    return (
        <Session
            {...props}
           
        />
    )
};

export default SessionDetailScreen;
