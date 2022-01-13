import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Detail from './components/Detail';

const DetailScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Detail
            {...props}
        />
    );
};

export default DetailScreen;
