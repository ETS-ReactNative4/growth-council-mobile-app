import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

import DrawerNavigation from '../navigations/DrawerNavigation';
import BottomTabNavigation from '../navigations/BottomTabNavigation';
import ModelNavigation from '../navigations/ModelNavigation';

import LogoTitle from "../shared/logo";
import HomeScreen from '../screens/home';
import HomeDetailScreen from '../screens/home/Detail';

import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';
import SignUpNextScreen from '../screens/auth/SignUpNext';
import JourneyScreen from '../screens/auth/Journey';

import EditProfileScreen from '../screens/account/EditProfile';
import ChangePasswordScreen from '../screens/setting/ChangePassword';
import Ionicons from "react-native-vector-icons/Ionicons";

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

    const headerTitle = (route, props) => {
        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, it's "Home" as that's the first screen inside the navigator
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        switch (routeName) {
            case 'Dashboard':
                return <LogoTitle title={'Edward'} right {...props} />;
            default:
                return null;
        }
    };


    return (
        <Stack.Navigator detachInactiveScreens={false} screenOptions={({route}) => ({
            headerTitleAlign: 'center',
        })}>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
            }}/>
            <Stack.Screen name="HomeDetail" component={HomeDetailScreen} options={({route, navigation}) => ({
                headerTitle: '',
                headerStyle: {height: 80},
                headerTransparent: true,
                headerLeft: (props) => (
                    <Ionicons
                        name={'arrow-back'}
                        size={80}
                        color={'white'}
                        onPress={() => navigation.navigate('Home')}
                    />
                ),
                ...TransitionPresets.RevealFromBottomAndroid,
                gestureDirection: 'horizontal-inverted',
            })}/>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>
            <Stack.Screen name="Forgot" component={ForgotScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
            }}/>
            <Stack.Screen name="SignUpNext" component={SignUpNextScreen} options={{
                headerLeft: () => null,
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>
            <Stack.Screen name="Journey" component={JourneyScreen} options={{
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>
            <Stack.Screen name="Model" component={ModelNavigation} options={{headerShown: false}}/>

            <Stack.Screen name="Dashboard" component={DrawerNavigation} options={({route, navigation}) => ({
              //  headerShown: isHeaderShown(route),
                headerTitle: headerTitle(route),
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
                headerLeft: () => null,
				
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
