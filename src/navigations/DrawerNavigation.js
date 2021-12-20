import React from 'react';
import {Platform, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Colors} from '../theme';

import DashboardScreen from '../screens/dashboard';
import AccountScreen from '../screens/account';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={DashboardScreen}/>
            <Drawer.Screen name="Account" component={AccountScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
