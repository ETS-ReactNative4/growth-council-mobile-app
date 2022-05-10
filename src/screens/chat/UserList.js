import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UserList from './components/UserList';
import firestore from '@react-native-firebase/firestore'
import {fetchAllConnections, resetConnection} from './slice/connetionSlice';
import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';
import {
  connectMemberByID,
  resetConnectMember,
} from '../people/slice/memberConnectionSlice';

const UserListScreen = props => {
  const dispatch = useDispatch();
  const [_users, setUsers] = useState([]);

  const {users, userLoading, userError} = useSelector(state => state.users);


  // getActualUsersFromFirebase
  const getFirebaseUsers = async () => {
   try {
    const __users = await firestore().collection("rooms").get();


    const actualUsers = users.map(item => {
       const user = __users.docs.find(usr => usr.id.includes(item.ID));

       if(user){
         return {...item, lastUpdated: user.data().lastUpdated ?? Number.NEGATIVE_INFINITY}
       } else {
         return {...item, lastUpdated: Number.NEGATIVE_INFINITY}
       }

     })

   setUsers(actualUsers);
   } catch(error){
     console.log(error);
   }
    
  }

  useEffect(() => {
    getFirebaseUsers();
  }, [])



  const {connection, connectionLoading, connectionError} = useSelector(
    state => state.connection,
  );
  const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);

  const fetchAllConnection = () => {
    dispatch(fetchAllConnections());
  };

  const cleanConnection = () => {
    dispatch(resetConnection());
  };

  const fetchAllUsers = formData => {
    dispatch(fetchUsersByKey(formData));
  };

  const cleanUser = () => {
    dispatch(resetUser());
  };

  const connectMemberByIdentifier = formData => {
    return dispatch(connectMemberByID(formData));
  };
  const cleanConnectMember = () => {
    dispatch(resetConnectMember());
  };

  return  (
    <UserList
      {...props}
      connection={connection}
      connectionLoading={connectionLoading}
      connectionError={connectionError}
      fetchAllConnection={fetchAllConnection}
      cleanConnection={cleanConnection}
      users={_users}
      userLoading={userLoading}
      userError={userError}
      fetchAllUsers={fetchAllUsers}
      cleanUser={cleanUser}
      memberConnections={memberConnections}
      memberConnectionLoading={memberConnectionLoading}
      memberConnectionError={memberConnectionError}
      connectMemberByIdentifier={connectMemberByIdentifier}
      cleanConnectMember={cleanConnectMember}
    />
  );
};

export default UserListScreen;
