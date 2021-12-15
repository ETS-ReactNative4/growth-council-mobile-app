import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CouncilDetail from './components/CouncilDetail';

const CouncilDetailScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <CouncilDetail
            {...props}
        />
    );
};

export default CouncilDetailScreen;
