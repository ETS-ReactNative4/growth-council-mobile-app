import React from 'react';
import {Platform, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../theme';

import HomeScreen from '../screens/home';
import AccountScreen from '../screens/account';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY_TEXT_COLOR,
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: '7%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    position: 'absolute',
                    left: 40,
                    bottom: Platform.OS === 'ios'? 30 : 5,
                    right: 40,
                    borderTopColor: 'transparent',
                    borderColor: 'transparent',
                    borderRadius: 40,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios'? 12 : 0,
                        }}>
                        <MaterialCommunityIcons name="home-variant" color={'#fff'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />

            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios'? 12 : 0,
                        }}>
                        <Ionicons name="settings-outline" color={'#fff'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
