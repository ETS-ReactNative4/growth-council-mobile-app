import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntIcon from "react-native-vector-icons/AntDesign";
import {View, TouchableOpacity} from 'react-native';

import CommunityScreen from '../screens/community';
import CalendarScreen from '../screens/calendar';
import BottomTabNavigation from "./BottomTabNavigation";

import * as Colors from "../theme/colors";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const toggleDrawer = () => {
        props.navigation.closeDrawer();
    };

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={toggleDrawer}>
                <AntIcon name="close" size={25} color={Colors.TERTIARY_TEXT_COLOR}/>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: {marginVertical: 5},
				header: null,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={BottomTabNavigation} />
            <Drawer.Screen name="Community" component={CommunityScreen}/>
            <Drawer.Screen name="Calendar" component={CalendarScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
