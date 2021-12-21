import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Community from './components';

const CommunityScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Community
            {...props}
        />
    );
};

export default CommunityScreen;
