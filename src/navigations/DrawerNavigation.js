import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CommunityScreen from '../screens/community';
import CalendarScreen from '../screens/calendar';
import BottomTabNavigation from "./BottomTabNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={BottomTabNavigation} options={{headerTitle:false}}/>
            <Drawer.Screen name="Community" component={CommunityScreen}/>
            <Drawer.Screen name="Calendar" component={CalendarScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
