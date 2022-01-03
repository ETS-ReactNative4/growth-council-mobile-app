import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DrawerNavigation from '../navigations/DrawerNavigation';
import BottomTabNavigation from '../navigations/BottomTabNavigation';
import ModelNavigation from '../navigations/ModelNavigation';

import LogoTitle from '../shared/logo';
import HomeScreen from '../screens/home';
import HomeDetailScreen from '../screens/home/Detail';

import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';
import SignUpNextScreen from '../screens/auth/SignUpNext';
import JourneyScreen from '../screens/auth/Journey';

import ContactUsScreen from '../screens/static/ContactUs';

import EditProfileScreen from '../screens/account/EditProfile';
import ChangePasswordScreen from '../screens/setting/ChangePassword';
import CouncilAllDetailScreen from '../screens/home/CouncilALLDetail';

import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import IdeasScreen from '../screens/ideas';
import EventDetailScreen from '../screens/event';
import SearchScreen from '../screens/search';

import FrostRadarScreen from '../screens/radar';
import SettingScreen from '../screens/setting/index';
import ManageAccountScreen from '../screens/setting/ManageAccount'


const Stack = createStackNavigator();

const MainNavigation = () => {
    const isHeaderShown = route => {
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

    const headerTitle = route => {
        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, it's "Home" as that's the first screen inside the navigator
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        switch (routeName) {
            case 'Home':
                return '';
            case 'Account':
                return 'Account';
            default:
                return '';
        }
    };

    return (
        <Stack.Navigator
            detachInactiveScreens={false}
            screenOptions={({route}) => ({
                headerTitleAlign: 'center',
            })}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                }}
            />
            <Stack.Screen
                name="HomeDetail"
                component={HomeDetailScreen}
                options={({route, navigation}) => ({
                    headerTitle: '',
                    headerStyle: {height: 80},
                    headerTransparent: true,
                    headerLeft: props => (
                        <Ionicons
                            name={'arrow-back'}
                            size={80}
                            color={'white'}
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                    ...TransitionPresets.RevealFromBottomAndroid,
                    gestureDirection: 'horizontal-inverted',
                })}
            />

            <Stack.Screen
                name="CouncilAllDetail"
                component={CouncilAllDetailScreen}
                options={({route, navigation}) => ({
                    headerTitle: '',
                    headerStyle: {height: 80},
                    headerTransparent: true,
                    headerLeft: props => null,
                    ...TransitionPresets.RevealFromBottomAndroid,
                    gestureDirection: 'horizontal-inverted',
                })}
            />

            <Stack.Screen
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
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                    ...TransitionPresets.RevealFromBottomAndroid,
                    gestureDirection: 'horizontal-inverted',
                })}
            />
            <Stack.Screen
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
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                    ...TransitionPresets.RevealFromBottomAndroid,
                    gestureDirection: 'horizontal-inverted',
                })}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={({route, navigation}) => ({
                    headerTitle: '',
                    headerStyle: {height: 80},
                    headerTransparent: true,
                    ...TransitionPresets.RevealFromBottomAndroid,
                    gestureDirection: 'horizontal-inverted',
                })}
            />
            <Stack.Screen
                name="Forgot"
                component={ForgotScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                }}
            />
            <Stack.Screen
                name="SignUpNext"
                component={SignUpNextScreen}
                options={{
                    headerLeft: () => null,
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.RevealFromBottomAndroid,
                }}
            />
            <Stack.Screen
                name="Journey"
                component={JourneyScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.RevealFromBottomAndroid,
                }}
            />
            <Stack.Screen name="radar" component={FrostRadarScreen} options={{
                headerLeft: () => null,
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>

            <Stack.Screen name="Setting" component={SettingScreen} options={{
                headerLeft: () => null,
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>

            <Stack.Screen name="Account" component={ManageAccountScreen} options={{
                headerLeft: () => null,
                headerTitle: '',
                headerTransparent: true,
                ...TransitionPresets.RevealFromBottomAndroid,
            }}/>
            <Stack.Screen
                name="Model"
                component={ModelNavigation}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Dashboard"
                component={DrawerNavigation}
                options={() => ({
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: () => null,
                })}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerTitle: 'Edit Profile',
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    headerTitle: 'Change Password',
                }}
            />
            <Stack.Screen
                name="ContactUs"
                component={ContactUsScreen}
                options={{
                    headerTitle: 'Contact Us',
                }}
            />

            <Stack.Screen
                name="EventDetail"
                component={EventDetailScreen}
                options={({route}) => ({
                    id: route?.params?.id,
                    headerTitle: 'Event Detail',
                })}
            />

            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                    headerTitle: 'About',
                }}
            />
            <Stack.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    headerTitle: 'Feedback',
                }}
            />
            <Stack.Screen
                name="Ideas"
                component={IdeasScreen}
                options={{
                    headerTitle: 'Contribute Ideas',
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
