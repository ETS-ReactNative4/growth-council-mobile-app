import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UserList from './components/UserList';

import {fetchAllConnections, resetConnection} from './slice/connetionSlice';

const UserListScreen = (props) => {

    const dispatch = useDispatch();

    const {connection, connectionLoading, connectionError} = useSelector((state) => state.connection);

    const fetchAllConnection = () => {
        dispatch(fetchAllConnections());
    };

    const cleanConnection = () => {
        dispatch(resetConnection());
    };

    return (
        <UserList
            {...props}
            connection={connection}
            connectionLoading={connectionLoading}
            connectionError={connectionError}
            fetchAllConnection={fetchAllConnection}
            cleanConnection={cleanConnection}
        />
    );
};

export default UserListScreen;
