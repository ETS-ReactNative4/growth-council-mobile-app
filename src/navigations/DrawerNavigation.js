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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {CommonStyles, Colors, Typography} from '../theme';
import HeaderTitle from '../shared/header';
import HeaderRight from '../shared/header/HeaderRight';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
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

        {/* <View style={styles.footer}>
				<Image source={require("../../src/assets/img/footer_logo.png")}/>
				<Text style={styles.footerText}>EmpoweredBy</Text>
				<Image source={require("../../src/assets/img/footer_company_name_image.png")} style={{width:200}}/>
			</View> */}
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
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => (
          <View>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name="menu-outline"
                color={'#000'}
                size={24}
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Image
                source={require('../assets/img/dashboard_logo.png')}
                style={{
                  top: -25,
                  position: 'absolute',
                  height: 30,
                  width: 30,
                  left: 30,
                  marginLeft: 20,
                  borderWidth: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => <HeaderRight />,
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
        component={() => <HomeCommunityScreen pillarId={120} />}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="calendar-outline" color={'blue'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle2.png')}
                style={{width: '100%', height: 60}}></ImageBackground>
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: 35}}>
              <Text
                style={{
                  color: Colors.PRIMARY_BACKGROUND_COLOR,
                  fontSize: 20,
                  marginLeft: 15,
                }}>
                Community
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Best Practices"
        component={() => <BestPracticeScreen pillarId={119} />}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="ear-outline" color={'blue'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle1.png')}
                style={{width: '100%', height: 60}}></ImageBackground>
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: 35}}>
              <Text
                style={{color: Colors.PRIMARY_BACKGROUND_COLOR, fontSize: 20}}>
                Best Practice
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Growth Coaching"
        component={() => <GrowthCoachingScreen pillarId={121} />}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="git-compare-outline" color={'green'} size={24} />
          ),
          headerBackground: () => (
            <View>
              <ImageBackground
                source={require('../../src/assets/img/Rectangle.png')}
                style={{width: '100%', height: 60}}></ImageBackground>
            </View>
          ),
          headerTitle: () => (
            <View style={{marginLeft: 35}}>
              <Text
                style={{color: Colors.PRIMARY_BACKGROUND_COLOR, fontSize: 20}}>
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
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 20}}>
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
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 20}}>
                About
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="settings-outline" color={'#00008B'} size={24} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 20}}>
                Setting
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
            <Ionicons name="thumbs-up-outline" color={'#00008B'} size={24} />
          ),
          headerTitle: () => (
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 20}}>
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
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 20}}>
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
    marginTop: 150,
  },
  footerText: {
    margin: 8,
    fontSize: 8,
  },
});

export default DrawerNavigation;
