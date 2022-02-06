import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DrawerNavigation from '../navigations/DrawerNavigation';
import BottomTabNavigation from '../navigations/BottomTabNavigation';

import HomeScreen from '../screens/home';
import HomeDetailScreen from '../screens/home/Detail';

import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';
import SignUpNextScreen from '../screens/auth/SignUpNext';
import JourneyScreen from '../screens/auth/Journey';

import ContactUsScreen from '../screens/static/ContactUs';

import ChangePasswordScreen from '../screens/account/ChangePassword';

import EventDetailScreen from '../screens/event';
import SessionDetailScreen from '../screens/sessions';
import SearchScreen from '../screens/search';

import FrostRadarScreen from '../screens/radar';
import SettingScreen from '../screens/setting/index';
import ManageAccountScreen from '../screens/account/ManageAccount';
import OtherAccountScreen from '../screens/account/OthersAccount';
import PrivacyScreen from '../screens/privacy';
import TermsConditionsScreen from '../screens/static/TermsConditions';
import CouncilDetailScreen from '../screens/home/CouncilDetail';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import CommunityDetailScreen from '../screens/details/CommunityDetail';
import GrowthDetailScreen from '../screens/details/GrowthDetail';
import UpcomingScreen from '../screens/dashboard/UpcomingView';
import ChatScreen from '../screens/chat';
import CoachingSessionDetailScreen from '../screens/coachingSession';
import SelfLearnDetailScreen from '../screens/selfLearn';
import PDFDetailScreen from '../screens/selfLearn/pdf';
import selfAssessment from '../screens/coachingSession/component/selfAssessment';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
      })}>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name="HomeDetail"
          component={HomeDetailScreen}
          options={({route, navigation}) => ({
            headerTitle: '',
            headerStyle: {height: 80},
            headerTransparent: true,
            headerLeft: props => (
              <Ionicons
                name={'arrow-back'}
                size={80}
                style={{position: Platform.OS === 'ios' ? 'absolute' : 'relative'}}
                color={'white'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
            ...TransitionPresets.RevealFromBottomAndroid,
            gestureDirection: 'horizontal-inverted',
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={({route, navigation}) => ({
            headerTitle: '',
            headerStyle: {height: 80},
            headerTransparent: true,
            headerLeft: props => (
              <Ionicons
                name={'arrow-back'}
                size={70}
                color={'white'}
                style={{position: Platform.OS === 'ios' ? 'absolute' : 'relative'}}
                onPress={() => navigation.navigate('Home')}
              />
            ),
            ...TransitionPresets.RevealFromBottomAndroid,
            gestureDirection: 'horizontal-inverted',
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={({route, navigation}) => ({
            headerTitle: '',
            headerStyle: {height: 80},
            headerTransparent: true,
            headerLeft: props => (
              <Ionicons
                name={'arrow-back'}
                size={80}
                color={'white'}
                style={{position: Platform.OS === 'ios' ? 'absolute' : 'relative'}}
                onPress={() => navigation.navigate('Home')}
              />
            ),
            ...TransitionPresets.RevealFromBottomAndroid,
            gestureDirection: 'horizontal-inverted',
          })}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name="SignUpNext"
          component={SignUpNextScreen}
          options={{
            headerLeft: () => null,
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Journey"
          component={JourneyScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="radar"
          component={FrostRadarScreen}
          options={{
            headerLeft: () => null,
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="coachingSession"
          component={CoachingSessionDetailScreen}
          options={{
            headerTitle: 'Session',
          }}
        />
        <Stack.Screen
          name="selfAssessment"
          component={selfAssessment}
          options={{
            headerTitle: 'Session',
          }}
        />
        <Stack.Screen
          name="selflearn"
          component={SelfLearnDetailScreen}
          options={{
            headerTitle: 'Self Learn',
          }}
        />
        <Stack.Screen
          name="pdf"
          component={PDFDetailScreen}
          options={{
            headerTitle: 'Self Learn',
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerLeft: () => null,
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccountScreen}
          options={{
            headerTitle: 'Manage Account',
            // headerTransparent: true,
            // ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="OthersAccount"
          component={OtherAccountScreen}
          options={({route}) => ({
            id: route?.params?.id,
            headerTitle: 'Account Info',
          })}
        />

        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigation}
          options={({navigation}) => ({
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerTitle: 'Change Password',
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{
            headerTitle: 'Contact Us',
          }}
        />
        <Stack.Screen
          name="UpcomingView"
          component={UpcomingScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={({route}) => ({
            id: route?.params?.id,
            headerTitle: 'Event Detail',
          })}
        />
        <Stack.Screen
          name="SessionDetail"
          component={SessionDetailScreen}
          options={({route}) => ({
            id: route?.params?.id,
            headerTitle: 'Session Detail',
          })}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({route}) => ({
            userID: route?.params?.userID,
            friendID: route?.params?.friendID,
            friendName: route?.params?.friendName,
            //headerTitle: route?.params?.friendName,
            headerTitle: 'Chat',
          })}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{
            headerTitle: 'Privacy Policy',
          }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        {/* <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="CommunityDetail"
          component={CommunityDetailScreen}
          options={({route}) => ({
            poeId: route.params.poeId,
            pillarId: route.params.pillarId,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Terms"
          component={TermsConditionsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CouncilDetail"
          component={CouncilDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Community"
          component={HomeCommunityScreen}
          options={({route}) => ({
            pillarId: route?.params?.pillarId,
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="BestPractice"
          component={BestPracticeScreen}
          options={({route}) => ({
            pillarId: route?.params?.pillarId,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="GrowthCoaching"
          component={GrowthCoachingScreen}
          options={({route}) => ({
            pillarId: route?.params?.pillarId,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="GrowthDetail"
          component={GrowthDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigation;
