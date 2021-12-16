import React from 'react';
import {Platform, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../theme';

import DashboardScreen from '../screens/dashboard';
import AccountScreen from '../screens/account';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY_TEXT_COLOR,
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 12 : 0,
                        }}>
                            <Ionicons name="home-outline" color={'#000'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />

            <Tab.Screen
                name="Option"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 12 : 0,
                        }}>
                            <Ionicons name="options-outline" color={'#000'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 12 : 0,
                        }}>
                            <Ionicons name="chatbox-outline" color={'#000'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />
            <Tab.Screen
                name="People"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 12 : 0,
                        }}>
                            <Ionicons name="people-outline" color={'#000'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />
            <Tab.Screen
                name="Person"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({color, size}) => (
                        <View style={{
                            top: Platform.OS === 'ios' ? 12 : 0,
                        }}>
                            <Ionicons name="person-outline" color={'#000'} size={size}/>
                        </View>
                    ),
                    tabBarVisible: true,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
