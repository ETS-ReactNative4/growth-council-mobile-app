import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import ManageAccount from './components/ManageAccount';

const ManageAccountScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <ManageAccount
            {...props}/>
    )
};

export default ManageAccountScreen
