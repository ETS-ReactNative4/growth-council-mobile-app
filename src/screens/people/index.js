import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';

const PeopleScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <People
            {...props}
        />
    );
};

export default PeopleScreen;
