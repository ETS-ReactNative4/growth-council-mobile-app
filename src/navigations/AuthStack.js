import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Platform} from 'react-native';

import HomeScreen from '../screens/home';
import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={70}
              color={'white'}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              }}
              onPress={() => navigation.navigate('Home')}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={80}
              color={'white'}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              }}
              onPress={() => navigation.goBack()}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Screen
        name="Forgot"
        component={ForgotScreen}
        options={{
          headerTitle: 'Forget',
        }}
      />
    </Navigator>
  );
};

export default AuthStack;
