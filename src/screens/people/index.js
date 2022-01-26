import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';
<<<<<<< HEAD
=======
import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';
import {connectMemberByID, resetConnectMember} from './slice/memberConnectionSlice';
>>>>>>> qa

const PeopleScreen = (props) => {

    const dispatch = useDispatch();

<<<<<<< HEAD
    return (
        <People
            {...props}
=======
    const {users, userLoading, userError} = useSelector((state) => state.users);
    const {memberConnections, memberConnectionLoading, memberConnectionError} = useSelector((state) => state.memberConnections);

    const fetchAllUsers = (formData) => {
        dispatch(fetchUsersByKey(formData));
    };

    /**
     * Connect member.
     * @param {object} formData
     *
     */
    const connectMemberByIdentifier = formData => {
        return dispatch(connectMemberByID(formData));
    };

    const cleanUser = () => {
        dispatch(resetUser());
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
            users={users}
            userLoading={userLoading}
            userError={userError}
            fetchAllUsers={fetchAllUsers}
            cleanUser={cleanUser}

            memberConnections={memberConnections}
            memberConnectionLoading={memberConnectionLoading}
            memberConnectionError={memberConnectionError}
            connectMemberByIdentifier={connectMemberByIdentifier}
            cleanConnectMember={cleanConnectMember}

>>>>>>> qa
        />
    );
};

export default PeopleScreen;
