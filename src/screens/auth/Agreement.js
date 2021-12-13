import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import AgreementForm from './components/Agreement';
import {signUpCustomer, resetCustomer} from './authSlice';

const AgreementScreen = (props) => {

    const dispatch = useDispatch();

    const {entities, loading, error} = useSelector((state) => state.auth);

    /**
     * Customer Sign Up.
     * @param {object} formData
     *
     */
    const customerSignUp = formData => {
        dispatch(signUpCustomer(formData));
    };

    /**
     * Clean customer record.
     *
     */
    const cleanCustomer = () => {
        dispatch(resetCustomer());
    };

    return (
        <AgreementForm
            {...props}
            auths={entities}
            loading={loading}
            error={error}
            customerSignUp={customerSignUp}
            cleanCustomer={cleanCustomer}
        />
    );
};

export default AgreementScreen;
