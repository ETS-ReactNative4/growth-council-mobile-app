import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';

const DashboardScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Dashboard
            {...props}
        />
    );
};

export default DashboardScreen;
