import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UserList from './components/UserList';

const UserListScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <UserList
            {...props}
        />
    );
};

export default UserListScreen;
