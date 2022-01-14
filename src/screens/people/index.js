import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';
import {fetchAllConnections, resetConnection} from './slice/connetionSlice';
import {connectMemberByID, resetConnectMember} from './slice/memberConnectionSlice';

const PeopleScreen = (props) => {

    const dispatch = useDispatch();

    const {connection, connectionLoading, connectionError} = useSelector((state) => state.connection);
    const {memberConnections, memberConnectionLoading, memberConnectionError} = useSelector((state) => state.memberConnections);

    const fetchAllConnection = () => {
        dispatch(fetchAllConnections());
    };

    /**
     * Connect member.
     * @param {object} formData
     *
     */
    const connectMemberByIdentifier = formData => {
        return dispatch(connectMemberByID(formData));
    };

    const cleanConnection = () => {
        dispatch(resetConnection());
    };

    /**
     * Clear connect member data.
     *
     */
    const cleanConnectMember = () => {
        dispatch(resetConnectMember());
    };

    return (
        <People
            {...props}
            connection={connection}
            connectionLoading={connectionLoading}
            connectionError={connectionError}
            fetchAllConnection={fetchAllConnection}
            cleanConnection={cleanConnection}

            memberConnections={memberConnections}
            memberConnectionLoading={memberConnectionLoading}
            memberConnectionError={memberConnectionError}
            connectMemberByIdentifier={connectMemberByIdentifier}
            cleanConnectMember={cleanConnectMember}

        />
    );
};

export default PeopleScreen;
