import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {
  setAsyncStorage,
  clearAsyncStorage,
  getAsyncStorage,
} from '../../utils/storageUtil';
import {JWT_TOKEN, API_URL, USER_NAME, USER_AVATAR} from '../../constants';
import {navigate} from '../../utils/navigationUtil';
import {auth} from '../../utils/firebaseUtil';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const isUserAlreadyLoggedIn = async () => {
      const token = await getAsyncStorage(JWT_TOKEN);
      if (token) navigate('Dashboard');
    };
    isUserAlreadyLoggedIn();
  });

  return (
    <AuthContext.Provider
      value={{
        loading,
        message,
        setMessage,
        setLoading,
        signIn: async fromData => {
          setLoading(true);
          try {
            const response = await axios.post(
              API_URL + '/jwt-auth/v1/token',
              fromData,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                responseType: 'json',
              },
            );
            if (response.data.token) {
              // console.log("abcd",response)
              await setAsyncStorage(JWT_TOKEN, response.data.token);
              await setAsyncStorage(USER_NAME, response.data.user_display_name);
              await setAsyncStorage(USER_AVATAR, response.data.avatar);

              const firebaseResponse = await signInWithEmailAndPassword(
                auth,
                response?.data?.user_email,
                response?.data?.firebase_password,
				console.log("password",response.data.firebase_password),

                // await setAsyncStorage(
                //   USER_PASSWORD,
                //   response.data.firebase_password,
                // ),
               
              );
              const token = await firebaseResponse.user;
			  const password = await firebaseResponse.firebase_password
              console.log("token",password);
              if (token) navigate('Dashboard');
            } else {
              setLoading(false);
              setMessage(response?.data?.message);
            }
          } catch (error) {
            console.log({error});
            setLoading(false);
            setMessage(error?.response?.data);
          }
        },
        signOut: async () => {
          await clearAsyncStorage(JWT_TOKEN);
          await clearAsyncStorage(USER_NAME);
          await clearAsyncStorage(USER_AVATAR);
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
