import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

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
                    onPress={() => props.navigation.navigate('HomeCommunity')}
                    icon={() =>
                        <Feather name="command" color={'#000'} size={24}/>
                    }
                />
				 <DrawerItem
                    label="Best Practice"
                    onPress={() => props.navigation.navigate('BestPractice')}
                    icon={() =>
                        <Font name="thumbs-o-up" color={'#000'} size={24}/>
                    }
                />
				 <DrawerItem
                    label="Growth Coaching"
                    onPress={() => props.navigation.navigate('GrowthCoaching')}
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
				 <DrawerItem
                    label="About"
                    onPress={() => props.navigation.navigate('About')}
                    icon={() =>
                        <Ionicons name="information-circle-outline" color={'#000'} size={24}/>
                    }
                />
				 <DrawerItem
                    label="Setting"
                    onPress={() => props.navigation.navigate('Setting')}
                    icon={() =>
                        <Ionicons name="settings-outline" color={'#000'} size={24}/>
                    }
                />
				 <DrawerItem
                    label="Feedback"
                    onPress={() => props.navigation.navigate('Feedback')}
                    icon={() =>
                        <Font name="thumbs-o-up" color={'#000'} size={24}/>
                    }
                />
				 <DrawerItem
                    label="Contribute Ideas"
                    onPress={() => props.navigation.navigate('Ideas')}
                    icon={() =>
                        <Ionicons name="bulb-outline" color={'#000'} size={24}/>
                    }
                />
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
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <Ionicons name="search-outline" color={'#000'} size={24} style={{marginTop:10,marginRight:10}}/>
                        <Image source={require('../assets/img/small_profile_image.png')}
                               style={{
                                   height: 40,
                                   width: 40,
                                   borderRadius: 50,
								   marginRight:20,
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
            <Drawer.Screen name="Calendar" component={CalendarScreen}/>
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
