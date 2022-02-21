import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ForgotForm from './components/Forgot';
import {forgotCustomerPassword} from './authSlice';

const ForgotScreen = (props) => {

    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);

    const forgotPassword = formData => {
        return dispatch(forgotCustomerPassword(formData));
    };

    return (
        <ForgotForm
            {...props}
            loading={loading}
            forgotPassword={forgotPassword}
        />
    );
};

export default ForgotScreen;
