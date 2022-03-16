import React, {useEffect} from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feature from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {useAuthentication} from '../context/auth';
import ContentScreen from '../screens/contentLibrary';
import CalendarScreen from '../screens/calendar';
import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import ContributeIdeasScreen from '../screens/ideas';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import SettingScreen from '../screens/setting/index';

import SubHeader from '../shared/header/SubHeader';
import {DashboardStackScreen} from './MainNavigation';

import {fetchProfileByID} from '../screens/account/slice/profileSlice';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {loading, setLoading, message, setMessage, signOut} = useAuthentication();

    const {profile, profileLoading, profileError} = useSelector(state => state.profile);

    const fetchProfileByIdentifier = () => {
        dispatch(fetchProfileByID());
    };

    useEffect(() => {
        fetchProfileByIdentifier();
    }, [isFocused]);

    const toggleDrawer = () => {
        props.navigation.toggleDrawer();
    };

    const logout = async () => {
        await signOut();
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                }}>
                {/* <Image
                    source={require('../../src/assets/img/GILCouncil.jpg')}
                    style={{
                        width: "70%"
                    }}
                    resizeMode="contain"
                /> */}
                <TouchableOpacity onPress={toggleDrawer}>
                    <Ionicons name="close-outline" color={'#000'} size={35}/>
                </TouchableOpacity>

            </View>

            <View
                style={{
                    flexDirection: 'row',
                    margin: 10
                }}>
                <Image
                    source={{
                        uri: profile?.avatar,
                    }}
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
						marginLeft:10,
                    }}
                />
                <Text
                    style={{
                        color: 'black',
                        fontSize: Platform.OS === 'ios' ? 14 : 16,
                        fontWeight: 'normal',
                        marginTop: 5,
                        marginLeft: 20,
                    }}>
                    {profile?.user_meta?.first_name} {profile?.user_meta?.last_name}
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />

                <DrawerItem
                    label="Logout"
                    onPress={logout}
                    icon={() => <Material name={'logout'} size={24} color={'#00008B'}/>}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Powered By</Text>

                    <Image
                        source={require('../../src/assets/img/splashFooter.png')}
                        style={{width: 100, height: 40, opacity: 0.75, marginTop: 10}}
                        resizeMode="cover"
                    />
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={() => ({
                activeTintColor: '#e91e63',
                itemStyle: {marginVertical: 2},
            })}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Dashboard"
                component={DashboardStackScreen}
                options={() => ({
                    drawerIcon: ({focused, size}) => (
                        <Material name="inbox" color={'#00008B'} size={24}/>
                    ),
                    headerShown: false,
                })}
            />
            <Drawer.Screen
                name="Community"
                component={HomeCommunityScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Material name="group-work" color={'#14A2E2'} size={24}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Community"
                            image={require('../assets/img/Rectangle2.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Best Practices"
                component={BestPracticeScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Feature name="thumbs-up" color={'#3693AC'} size={24}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Best Practices"
                            image={require('../assets/img/best-practice-bg.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Growth Coaching"
                component={GrowthCoachingScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Feature name="git-pull-request" color={'#80BA74'} size={24}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Growth Coaching"
                            image={require('../assets/img/Rectangle.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Calendar"
                component={CalendarScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="calendar-outline" color={'#00008B'} size={size}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Calendar"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
			 <Drawer.Screen
                name="Content Library"
                component={ContentScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Material name="content-copy" color={'#00008B'} size={size}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Content Library"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="information-circle-outline"
                            color={'#00008B'}
                            size={24}
                        />
                    ),
                    header: () => (
                        <SubHeader
                            title="About"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="settings-outline" color={'#00008B'} size={24}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Settings"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Font name="edit" color={'#00008B'} size={20}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Feedback"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="Contribute Ideas"
                component={ContributeIdeasScreen}
                options={({navigation}) => ({
                    drawerIcon: ({focused, size}) => (
                        <Ionicons name="bulb-outline" color={'#00008B'} size={24}/>
                    ),
                    header: () => (
                        <SubHeader
                            title="Contribute Ideas"
                            image={require('../assets/img/appBG.png')}
                            navigation={navigation}
                        />
                    ),
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
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        margin: 3,
        fontSize: 8,
    },
});

export default DrawerNavigation;
