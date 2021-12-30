import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SignUpForm from './components/SignUp';
import {signUpCustomer, resetCustomer} from './authSlice';

const SignUpScreen = props => {
  
    const dispatch = useDispatch();

    const {entities, loading, error} = useSelector(state => state.auth);

    /**
     * Sign up customer data.
     * @param {object} formData
     *
     */
    const registerCustomer = formData => {
        return dispatch(signUpCustomer(formData));
    };

    /**
     * Clear customer data.
     *
     */
    const cleanCustomer = () => {
        dispatch(resetCustomer());
    };

    return (
        <SignUpForm
            {...props}
            customers={entities}
            loading={loading}
            error={error}
            registerCustomer={registerCustomer}
            cleanCustomer={cleanCustomer}
        />
    );
};

export default SignUpScreen;
