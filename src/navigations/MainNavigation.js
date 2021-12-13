import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

import BottomTabNavigation from '../navigations/BottomTabNavigation';
import ModelNavigation from '../navigations/ModelNavigation';

import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';

import EditProfileScreen from '../screens/account/EditProfile';
import ChangePasswordScreen from '../screens/setting/ChangePassword';

const Stack = createStackNavigator();

const MainNavigation = () => {

    const isHeaderShown = (route) => {
        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, it's "Home" as that's the first screen inside the navigator
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        switch (routeName) {
            case 'Home':
                return false;
            default:
                return true;
        }
    };

    const headerTitle = (route) => {
        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, it's "Home" as that's the first screen inside the navigator
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        switch (routeName) {
            case 'Home':
                return '';
            case 'History':
                return 'History';
            case 'Account':
                return 'Account';
            default:
                return '';
        }
    };


    return (
        <Stack.Navigator detachInactiveScreens={false} screenOptions={({route}) => ({
            headerTitleAlign: 'center',
        })}>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
            }}/>
            <Stack.Screen name="Forgot" component={ForgotScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
            }}/>
            <Stack.Screen name="Model" component={ModelNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={BottomTabNavigation} options={({route, navigation}) => ({
                headerShown: isHeaderShown(route),
                headerTitle: headerTitle(route),
                headerLeft: (props) => (
                    <HeaderBackButton
                        {...props}
                        onPress={() => {
                            navigation.replace('Home');
                        }}
                    />
                ),
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
            })}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen}
                          options={{
                              headerTitle: 'Edit Profile',
                          }}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
                          options={{
                              headerTitle: 'Change Password',
                          }}/>
        </Stack.Navigator>
    );
};

export default MainNavigation;
