import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import ChangePasswordForm from './components/ChangePassword';
import {updateEmployeeByID, resetEmployeePassword} from './passwordSlice';

const ChangePasswordScreen = (props) => {

    const dispatch = useDispatch();

    const {entities, loading, error} = useSelector((state) => state.password);

    /**
     * Update employee data.
     * @param {object} formData
     *
     */
    const updateEmployee = formData => {
        return dispatch(updateEmployeeByID(formData));
    };

    /**
     * Clear employee data.
     *
     */
    const cleanEmployeePassword = () => {
        dispatch(resetEmployeePassword());
    };

    return (
        <ChangePasswordForm
            {...props}
            {...props}
            password={entities}
            loading={loading}
            error={error}
            updateEmployee={updateEmployee}
            cleanEmployeePassword={cleanEmployeePassword}
        />
    );

};

export default ChangePasswordScreen;
