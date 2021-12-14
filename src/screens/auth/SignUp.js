import React from 'react';

import SignUpForm from './components/SignUp';

const SignUpScreen = (props) => {

    return (
        <SignUpForm
            {...props}
        />
    );
};

export default SignUpScreen;
