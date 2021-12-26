import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CommunityScreen from '../screens/community';
import CalendarScreen from '../screens/calendar';
import DashboardScreen from '../screens/dashboard';

import BottomTabNavigation from "./BottomTabNavigation";

const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
    const toggleDrawer = () => {
        props.navigation.toggleDrawer();
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <Ionicons name="close-outline" color={'#000'} size={24}/>
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItem
                    label="Community"
                    onPress={() => props.navigation.navigate('Community')}
                    icon={() =>
                        <Ionicons name="calendar-outline" color={'#000'} size={24}/>
                    }
                />
                <DrawerItem
                    label="Calendar"
                    onPress={() => props.navigation.navigate('Calendar')}
                    icon={() =>
                        <Ionicons name="calendar-outline" color={'#000'} size={24}/>
                    }
                />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={({navigation}) => ({
                headerTitle: () => (
                    <View style={{marginLeft: 50}}>
                        <Text style={{marginTop: 15, color: "#000", fontSize: 15}}>Good Morning</Text>
                        <Text style={{fontWeight: "700", color: "#000", fontSize: 20}}>Edward</Text>
                    </View>
                ),
                headerLeft: () => (
                    <View>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Ionicons name="menu-outline" color={'#000'} size={24}/>
                        </TouchableOpacity>
                        <Image source={require('../assets/img/dashboard_logo.png')}
                               style={{
                                   position: 'absolute',
                                   top: 20,
                                   height: 30,
                                   width: 30,
                                   left: 10,
                                   borderWidth: 5,
                               }}
                        />
                    </View>
                ),
                headerRight: () => (
                    <View>
                        <Ionicons name="search-outline" color={'#000'} size={24}/>
                        <Image source={require('../assets/img/small-profile_image.png')}
                               style={{
                                   height: 50,
                                   width: 50,
                                   marginTop: 10,
                                   marginLeft: 10,
                                   borderRadius: 50,
                               }}
                        />
                    </View>
                ),

            })}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: {marginVertical: 5},
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Community" component={BottomTabNavigation}/>
            <Drawer.Screen name="Calendar" component={BottomTabNavigation}/>
            <Drawer.Screen name="Dashboard" component={BottomTabNavigation}/>
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
