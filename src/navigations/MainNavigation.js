import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DrawerNavigation from '../navigations/DrawerNavigation';

import HomeScreen from '../screens/home';
import HomeDetailScreen from '../screens/home/Detail';

import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';
import SignUpNextScreen from '../screens/auth/SignUpNext';
import JourneyScreen from '../screens/auth/Journey';

import ContactUsScreen from '../screens/static/ContactUs';
import ContentLibraryScreen from '../screens/contentLibrary/contentLibrary';
import LibraryDetailScreen from '../screens/contentLibrary/libraryDetails';
import ContentTagsScreen from '../screens/contentLibrary/contentTags';
import CriticalIssueScreen from '../screens/criticalIssue/index';
import ContentLibraryDetailScreen from '../screens/details/ContentLibraryDetail';

import ChangePasswordScreen from '../screens/account/ChangePassword';

import EventDetailScreen from '../screens/event';
import SessionDetailScreen from '../screens/sessions';
import SearchScreen from '../screens/search';

import FrostRadarScreen from '../screens/radar';
import ManageAccountScreen from '../screens/account/ManageAccount';
import OtherAccountScreen from '../screens/account/OthersAccount';
import PrivacyScreen from '../screens/privacy';
import Terms from '../screens/terms';
import CouncilDetailScreen from '../screens/home/CouncilDetail';
import CommunityDetailScreen from '../screens/details/CommunityDetail';
import GrowthDetailScreen from '../screens/details/GrowthDetail';
import SubPOEDetailScreen from '../screens/details/subPoeDetails';
import RadarScreen from '../screens/details/Radar';
import UpcomingScreen from '../screens/dashboard/UpcomingView';
import ChatScreen from '../screens/chat';
import CoachingSessionDetailScreen from '../screens/coachingSession';
import SelfLearnDetailScreen from '../screens/selfLearn';
import PDFDetailScreen from '../screens/selfLearn/pdf';
import SelfAssessment from '../screens/coachingSession/component/selfAssessment';
import ContentScreen from '../screens/contentLibrary';

import MainHeader from '../shared/header/MainHeader';
import AccountScreen from '../screens/account';
import UserListScreen from '../screens/chat/UserList';
import PeopleScreen from '../screens/people';
import SubHeader from '../shared/header/SubHeader';
import OptionHeader from '../shared/header/optionHeader';
import DashboardScreen from '../screens/dashboard';

const Stack = createStackNavigator();

const DashboardStack = createStackNavigator();

export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={({navigation}) => ({
        header: () => <MainHeader navigation={navigation} />,
      })}>
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({route, navigation}) => ({
          animationEnabled: false,
        })}
      />
      <DashboardStack.Screen name="UserList" component={UserListScreen} />
      <DashboardStack.Screen
        name="People"
        component={PeopleScreen}
        options={() => ({
          header: ({navigation}) => (
            <SubHeader
              title="Member Connection"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <DashboardStack.Screen
        name="Account"
        component={AccountScreen}
        options={() => ({
          header: ({navigation}) => (
            <SubHeader
              title="Profile"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
    </DashboardStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator detachInactiveScreens={false} screenOptions={() => ({})}>
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
                style={{
                  position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                }}
                color={'white'}
                onPress={() => navigation.goBack()}
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
                style={{
                  position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                }}
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
                style={{
                  position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                }}
                onPress={() => navigation.goBack()}
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
            headerTitle: 'Forget',
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
          name="FrostRadar"
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
          options={({route, navigation}) => ({
            header: () => (
              <SubHeader
                title={route?.params?.title}
                image={require('../assets/img/Rectangle.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        />
        <Stack.Screen
          name="selfAssessment"
          component={SelfAssessment}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="Session"
                image={require('../assets/img/Rectangle.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        />
        <Stack.Screen
          name="selflearn"
          component={SelfLearnDetailScreen}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="Self Learn"
                image={require('../assets/img/Rectangle.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        />
        {/* <Stack.Screen
          name="contentLibrary"
          component={ContentScreen}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="content Library"
                image={require('../assets/img/Rectangle.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        /> */}
        <Stack.Screen
          name="pdf"
          component={PDFDetailScreen}
          options={{
            headerTitle: 'Self Learn',
          }}
        />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccountScreen}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="Account"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        />
        <Stack.Screen
          name="OthersAccount"
          component={OtherAccountScreen}
          options={({route, navigation}) => ({
            id: route?.params?.id,
            header: () => (
              <SubHeader
                title="Others Account"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigation}
          options={({navigation}) => ({
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={({navigation}) => ({
            header: () => (
              <SubHeader
                title="Account"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="ContentDetail"
          component={ContentLibraryScreen}
          options={({route, navigation}) => ({
            resourceId: route?.params?.resourceId,
            header: () => (
              <SubHeader
                title="Content Library"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="LibraryDetail"
          component={LibraryDetailScreen}
          options={({route, navigation}) => ({
            resourceId: route?.params?.resourceId,
            header: () => (
              <SubHeader
                title="Content Library"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="ContentTags"
          component={ContentTagsScreen}
          options={({route, navigation}) => ({
            animationEnabled: false,
            id: route?.params?.id,
            header: () => (
              <SubHeader
                title="Content Library"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="ContentLibraryDetail"
          component={ContentLibraryDetailScreen}
          options={({route, navigation}) => ({
            id: route?.params?.id,
            animationEnabled: false,
            header: () => (
              <SubHeader
                title="Content Library"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="CriticalIssue"
          component={CriticalIssueScreen}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="Critical Issues"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
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
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="SessionDetail"
          component={SessionDetailScreen}
          options={({route}) => ({
            id: route?.params?.id,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({route}) => ({
            userID: route?.params?.userID,
            friendID: route?.params?.friendID,
            friendName: route?.params?.friendName,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={({navigation}) => ({
            header: () => (
              <SubHeader
                title="Privacy Policy"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="Privacys"
          component={PrivacyScreen}
          options={({navigation}) => ({
            header: () => (
              <OptionHeader
                title="Privacy Policy"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={({navigation}) => ({
            header: () => (
              <OptionHeader
                title="Terms Of Use"
                image={require('../assets/img/appBG.png')}
                navigation={navigation}
                noDrawer
              />
            ),
          })}
        />
      </Stack.Group>

      <Stack.Group>
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
          name="SubPoe"
          component={SubPOEDetailScreen}
          options={({route}) => ({
            poeId: route.params.poeId,
            pillarId: route.params.pillarId,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="CouncilDetail"
          component={CouncilDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="GrowthDetail"
          component={GrowthDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Radar"
          component={RadarScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigation;
