import React from 'react';

import {createBottomTabNavigator, createAppContainer} from '@react-navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import DashboardScreen from '../screens/dashboard';
import AccountScreen from '../screens/account';

import CalendarScreen from '../screens/calendar';
import UserListScreen from '../screens/chat/UserList';
import PeopleScreen from '../screens/people';

const TabNavigator = createMaterialBottomTabNavigator(
	{
		Dashboard:{screen:DashboardScreen,
			navigationOptions:{
				tabBarLabel:"Dashboard",
				// activeColor:"#e32f45",
				// inactiveColor:"#748c94",
				barStyle:{backgroundColor:"#67baf6"},
				tabBarIcon:({focused})=>{
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
				}
			}

		},
       Calendar:{screen:CalendarScreen,
		navigationOptions:{
			tabBarLabel:"Dashboard",
			// activeColor:"#e32f45",
			// inactiveColor:"#748c94",
			barStyle:{backgroundColor:"#67baf6"},
			tabBarIcon:({focused})=>{
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
			}
		}

	},
	UserList:{screen:UserListScreen,
		navigationOptions:{
			tabBarLabel:"UserList",
			// activeColor:"#e32f45",
			// inactiveColor:"#748c94",
			barStyle:{backgroundColor:"#67baf6"},
			tabBarIcon:({focused})=>{
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
			}
		}

	},
	People:{screen:PeopleScreen,
		navigationOptions:{
			tabBarLabel:"People",
			// activeColor:"#e32f45",
			// inactiveColor:"#748c94",
			barStyle:{backgroundColor:"#67baf6"},
			tabBarIcon:({focused})=>{
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
			}
		}

	},

	}
)
export default createAppContainer(TabNavigator);

// const DashboardNavigator =() =>{
// 	return(
// 		<Stack.Navigator>
// 			<Stack.Screen
// 			name='Dashboard'
// 			component={DashboardScreen} />
// 		</Stack.Navigator>
// 	)
// }
// export {DashboardNavigator};

// const CalendarNavigator =() =>{
// 	return(
// 		<Stack.Navigator>
// 			<Stack.Screen
// 			name='Dashboard'
// 			component={DashboardScreen} />
// 		</Stack.Navigator>
// 	)
// }
// export {CalendarNavigator};




