import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

import {setAsyncStorage, clearAsyncStorage} from '../../utils/storageUtil';
import {JWT_TOKEN, API_URL} from '../../constants';
import {navigate} from '../../utils/navigationUtil';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    return (
        <AuthContext.Provider value={{
            loading,
            message,
            setMessage,
            setLoading,
            signIn: async (fromData) => {
                setLoading(true);
                try {
                    const response = await axios.post(API_URL + '/jwt-auth/v1/token', fromData, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }, responseType: 'json',
                    });
                    // if (response.data.success) {
                    if (response.data.data.token) {
                        await setAsyncStorage(JWT_TOKEN, response.data.data.token);
                        navigate('Dashboard');
                    } else {
                        setLoading(false);
                        setMessage(response?.data?.message);
                    }
                } catch (error) {
                    setLoading(false);
                    setMessage(error.response.data);
                }
            },
            signOut: async () => {
                await clearAsyncStorage(JWT_TOKEN);
                navigate('SignIn');
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('You forgot to implement the auth provider.');
    }

    return context;
};
