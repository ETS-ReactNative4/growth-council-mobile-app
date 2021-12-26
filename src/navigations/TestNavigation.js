import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import DrawerNavigation from '../navigations/DrawerNavigation';

import DashboardScreen from "../screens/dashboard";
import SearchScreen from "../screens/search";
import ChatScreen from "../screens/chat";

const Stack = createStackNavigator();

const TestNavigation = () => {

    return (
        <Stack.Navigator
            detachInactiveScreens={false}
            screenOptions={{
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen
                name="Dashboard"
                component={DrawerNavigation}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: () => null,
                }}
            />

            <Stack.Screen
                name="Option"
                component={DrawerNavigation}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: () => null,
                }}
            />

            <Stack.Screen
                name="Search"
                component={DrawerNavigation}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: () => null,
                }}
            />

        </Stack.Navigator>
    );
};

export default TestNavigation;
