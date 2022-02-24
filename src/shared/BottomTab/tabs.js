import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator,NavigationContainer} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme';
import DashboardScreen from '../../screens/dashboard';
import AccountScreen from '../../screens/account';
import CalendarScreen from '../../screens/calendar';
import UserListScreen from '../../screens/chat/UserList';
import PeopleScreen from '../../screens/people';

import { DashboardNavigator, CalendarNavigator,ChatNavigator, PersonNavigator, ProfileNavigator} from '../../layout/BottomLayout';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 120,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={() => ({
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({focused, color, size}) => (
            <View>
              <View
                style={{
                  top: Platform.OS === 'ios' ? 8 : 0,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}>
                <Ionicons
                  name="home-outline"
                  color={'#000'}
                  size={size}
                  style={{color: focused ? '#e32f45' : '#748c94'}}
                />
              </View>
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
          tabBarVisible: true,
        })}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <View
                style={{
                  top: Platform.OS === 'ios' ? 8 : 0,
                }}>
                <Ionicons
                  name="calendar-outline"
                  color={'#000'}
                  size={size}
                  style={{color: focused ? '#e32f45' : '#748c94'}}
                />
              </View>
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                Calendar
              </Text>
            </View>
          ),
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="UserList"
        component={UserListScreen}
        options={{
          tabBarLabel: 'UserList',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <View
                style={{
                  top: Platform.OS === 'ios' ? 8 : 0,
                }}>
                <Ionicons
                  name="chatbox-outline"
                  color={'#000'}
                  size={size}
                  style={{color: focused ? '#e32f45' : '#748c94'}}
                />
              </View>
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                Chat
              </Text>
            </View>
          ),
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="People"
        component={PeopleScreen}
        options={{
          tabBarLabel: 'People',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <View
                style={{
                  top: Platform.OS === 'ios' ? 8 : 0,
                }}>
                <Ionicons
                  name="people-outline"
                  color={'#000'}
                  size={size}
                  style={{color: focused ? '#e32f45' : '#748c94'}}
                />
              </View>
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                People
              </Text>
            </View>
          ),
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <View
                style={{
                  top: Platform.OS === 'ios' ? 8 : 0,
                }}>
                <Ionicons
                  name="person-outline"
                  color={'#000'}
                  size={size}
                  style={{color: focused ? '#e32f45' : '#748c94'}}
                />
              </View>
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
          tabBarVisible: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default Tabs;
