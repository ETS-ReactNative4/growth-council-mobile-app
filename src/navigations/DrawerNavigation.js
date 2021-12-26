import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import AntIcon from "react-native-vector-icons/AntDesign";
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CommunityScreen from '../screens/community';
import CalendarScreen from '../screens/calendar';
import BottomTabNavigation from "./BottomTabNavigation";

import DashboardScreen from '../screens/dashboard';

import * as Colors from "../theme/colors";

const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {/*<DrawerItem*/}
                    {/*label="Community"*/}
                    {/*onPress={() =>   props.navigation.navigate('Community')}*/}
                {/*/>*/}
                {/*<View style={styles.drawerItem}>*/}
                    {/*<Text*/}
                        {/*onPress={() => {*/}
                            {/*props.navigation.navigate('Community');*/}
                        {/*}}>*/}
                        {/*Rate Us*/}
                    {/*</Text>*/}
                    {/*<Ionicons name="help-circle-outline" size={20} color={'#31ade5'}/>*/}
                {/*</View>*/}
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName="Community"
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: {marginVertical: 5},
            }}
           // drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {/*<Drawer.Screen name="Dashboard" component={DashboardScreen}/>*/}
            <Drawer.Screen name="Community" component={CommunityScreen}/>
            <Drawer.Screen name="Calendar" component={CalendarScreen}/>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
});

export default DrawerNavigation;
