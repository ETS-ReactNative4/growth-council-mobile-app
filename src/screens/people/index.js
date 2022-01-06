import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';
import {fetchAllConnections, resetConnection} from './slice/connetionSlice';


const PeopleScreen = (props) => {

    const dispatch = useDispatch();
    const {connection, connectionLoading, connectionError} = useSelector((state) => state.connection);

    const fetchAllConnection = () => {
        dispatch(fetchAllConnections());
    };

    const cleanConnection = () => {
        dispatch(resetConnection());
    };

    return (
        <People
            {...props}
            connection={connection}
            connectionLoading={connectionLoading}
            connectionError={connectionError}
            fetchAllConnection={fetchAllConnection}
            cleanConnection={cleanConnection}
        />
    );
};

export default PeopleScreen;
