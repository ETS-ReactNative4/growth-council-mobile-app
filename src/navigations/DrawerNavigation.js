import React from 'react';
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
  ImageBackground,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feature from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

import DashboardScreen from '../screens/dashboard';

import CalendarScreen from '../screens/calendar';
import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import ContributeIdeasScreen from '../screens/ideas';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import SettingScreen from '../screens/setting/index';

import BottomTabNavigation from './BottomTabNavigation';
import {Colors} from '../theme';
import HeaderTitle from '../shared/header';
import HeaderRight from '../shared/header/HeaderRight';
import {clearAsyncStorage} from '../utils/storageUtil';
import ToastMessage from '../shared/toast';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const logout = () => {
    clearAsyncStorage();
    props.navigation.navigate('Home');
    ToastMessage.show('Your have successfully logout');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons name="close-outline" color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
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

        <DrawerItem style={{marginLeft: 68}} label="Logout" onPress={logout} />

        <View style={styles.footer}>
          <Image
            source={require('../../src/assets/img/footer_logo.png')}
            style={{width: 195, height: 30}}
          />
          <Text style={styles.footerText}>Powered By</Text>
          <View style={{width: 175}}>
            <Image
              source={require('../../src/assets/img/fristDigi.png')}
              style={{width: '100%'}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigation = ({navigation}) => {
  const {profileEvent, profileEventLoading, profileEventError} = useSelector(
    state => state.profileEvent,
  );

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={({navigation}) => ({
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
        headerBackground: () => (
          <View>
            <ImageBackground
              source={require('../../src/assets/img/appBG.png')}
              style={{width: '100%', height: 60}}
            />
          </View>
        ),
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => (
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons
                  name="menu-outline"
                  color={'white'}
                  size={30}
                  style={{marginLeft: 10, top: 5}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('About')}>
                <Image
                  source={require('../assets/img/dashboard_logo.png')}
                  style={{
                    top: -29,
                    position: 'absolute',
                    height:Platform.OS === 'ios' ? 35 : 35,
                    width: Platform.OS === 'ios' ? 35 : 35,
                    left: 30,
                    marginLeft: 17,
                    // borderWidth: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ),
        headerRight: () => <HeaderRight navigation={navigation} />,
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigation}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="calendar-outline" color={'blue'} size={24} />
          ),
        })}
      />
      <Drawer.Screen
        name="Community"
        component={HomeCommunityScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Material name="group-work" color={'#14A2E2'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle2.png')}
                style={{width: '100%', height: 60}}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  color: Colors.PRIMARY_BACKGROUND_COLOR,
                  fontSize: 22,
                  marginLeft: 5,
                  marginTop: 10,
                }}>
                Community
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Best Practices"
        component={BestPracticeScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Feature name="thumbs-up" color={'#3693AC'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle1.png')}
                style={{width: '100%', height: 60}}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  color: Colors.PRIMARY_BACKGROUND_COLOR,
                  fontSize: 22,
                  marginTop: 10,
                }}>
                Best Practices
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Growth Coaching"
        component={GrowthCoachingScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Feature name="git-pull-request" color={'#80BA74'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle.png')}
                style={{width: '100%', height: 60}}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  color: Colors.PRIMARY_BACKGROUND_COLOR,
                  fontSize: 22,

                  marginTop: 10,
                }}>
                Growth Coaching
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="calendar-outline" color={'#00008B'} size={24} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 22,
                  marginTop: 10,
                }}>
                Calendar
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="information-circle-outline"
              color={'#00008B'}
              size={24}
            />
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 22,
                  marginTop: 10,
                }}>
                About
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="settings-outline" color={'#00008B'} size={24} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 22,
                  marginTop: 10,
                }}>
                Settings
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Font name="edit" color={'#00008B'} size={20} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 22,
                  marginTop: 10,
                }}>
                Feedback
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Contribute Ideas"
        component={ContributeIdeasScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="bulb-outline" color={'#00008B'} size={24} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 35}}>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 22,
                  marginTop: 10,
                }}>
                Contribute Ideas
              </Text>
            </View>
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
    marginTop: 75,
  },
  footerText: {
    margin: 3,
    fontSize: 8,
  },
});

export default DrawerNavigation;
