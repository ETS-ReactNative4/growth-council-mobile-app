import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/dashboard';

import CommunityScreen from '../screens/community';
import CalendarScreen from '../screens/calendar';
import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import ContributeIdeasScreen from '../screens/ideas';
import HomeCommunityScreen from "../screens/dashboard/HomeCommunity";
import BestPracticeScreen from "../screens/dashboard/BestPractice";
import GrowthCoachingScreen from "../screens/dashboard/GrowthCoaching";
import SettingScreen from '../screens/setting/index';



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
                <DrawerItemList {...props}/>
                {/*<DrawerItem*/}
                {/*label="Community"*/}
                {/*onPress={() => props.navigation.navigate('Community')}*/}
                {/*icon={() =>*/}
                {/*<Ionicons name="calendar-outline" color={'#000'} size={24}/>*/}
                {/*}*/}
                {/*/>*/}
                {/*<DrawerItem*/}
                {/*label="Calendar"*/}
                {/*onPress={() => props.navigation.navigate('Calendar')}*/}
                {/*icon={() =>*/}
                {/*<Ionicons name="calendar-outline" color={'#000'} size={24}/>*/}
                {/*}*/}
                {/*/>*/}
            </DrawerContentScrollView>
			<View style={styles.footer}>
				<Image source={require("../../src/assets/img/footer_logo.png")}/>
				<Text style={styles.footerText}>EmpoweredBy</Text>
				<Image source={require("../../src/assets/img/footer_company_name_image.png")} style={{width:200}}/>
			</View>
        </SafeAreaView>
    );
};

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={({navigation}) => ({
                headerTitle: () => (
                    <View style={{marginLeft: 40}}>
                        <Text style={{marginTop: 10, color: "#000", fontSize: 15}}>Good Morning</Text>
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
                                   height: 30,
                                   width: 30,
                                   left: 30,
                                   borderWidth: 5,
                               }}
                        />
                    </View>
                ),
                headerRight: () => (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Ionicons name="search-outline" color={'#000'} size={24}
                                  style={{marginTop: 10, marginRight: 10}}/>
                        <Image source={require('../assets/img/small_profile_image.png')}
                               style={{
                                   height: 40,
                                   width: 40,
                                   borderRadius: 50,
                                   marginRight: 20,
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
            <Drawer.Screen
                name="Dashboard"
                component={BottomTabNavigation}
				
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="calendar-outline" color={'blue'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Community"
                component={HomeCommunityScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="calendar-outline" color={'blue'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Best Practices"
                component={BestPracticeScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="ear-outline" color={'blue'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Growth Coaching"
                component={GrowthCoachingScreen}
				
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="git-compare-outline" color={'green'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Calendar"
                component={CalendarScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="calendar-outline" color={'#00008B'} size={24}/>
                    )
                })}/>
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="information-circle-outline" color={'#00008B'} size={24}/>
                    )
                })}
            />
			  <Drawer.Screen
                name="Setting"
                component={SettingScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="settings-outline" color={'#00008B'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="thumbs-up-outline" color={'#00008B'} size={24}/>
                    )
                })}
            />
            <Drawer.Screen
                name="Contribute Ideas"
                component={ContributeIdeasScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="bulb-outline" color={'#00008B'} size={24}/>
                    )
                })}
            />
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
	footer:{
		
		justifyContent:"center",
		alignItems:"center",
		marginBottom:50,
	
	},
	footerText:{
		margin:8,
		fontSize:8,
	}
});

export default DrawerNavigation;
