import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';
import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';
import {connectMemberByID, resetConnectMember} from './slice/memberConnectionSlice';
import { fetchAllExpertise, resetExpertise } from './slice/expertiseSlice';

const PeopleScreen = (props) => {

    const dispatch = useDispatch();

    const {users, userLoading, userError} = useSelector((state) => state.users);
    const {memberConnections, memberConnectionLoading, memberConnectionError} = useSelector((state) => state.memberConnections);
	const {expertise, expertiseLoading, expertiseError} = useSelector((state)=>state.expertise)

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

	const fetchAllExpertises =()=>{
		dispatch(fetchAllExpertise());
	}

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
	
	const cleanExperties =() =>{
		dispatch(resetExpertise());
	}

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

			expertise={expertise}
			expertiseLoading={expertiseLoading}
			expertiseError={expertiseError}
			fetchAllExpertises={fetchAllExpertises}
			cleanExperties={cleanExperties}

        />
    );
};

export default PeopleScreen;
