import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PrivacyPolicyScreen from '../screens/static/PrivacyPolicy';
import TermsConditionsScreen from '../screens/static/TermsConditions';
import CouncilDetailScreen from '../screens/home/CouncilDetail';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import CommunityDetailScreen from '../screens/details/CommunityDetail';
import GrowthDetailScreen from '../screens/details/GrowthDetail';



const Stack = createStackNavigator();

const ModelNavigation = () => {

    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Terms" component={TermsConditionsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CouncilDetail" component={CouncilDetailScreen} options={{headerShown: false}}/>
			<Stack.Screen name="HomeCommunity" component={HomeCommunityScreen} options={{headerShown: false}}/>
			<Stack.Screen name="BestPractice" component={BestPracticeScreen} options={{headerShown: false}}/>
			<Stack.Screen name="GrowthCoaching" component={GrowthCoachingScreen} options={{headerShown: false}}/>
			<Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} options={{headerShown: false}}/>
			<Stack.Screen name="GrowthDetail" component={GrowthDetailScreen} options={{headerShown: false}}/>
			
        </Stack.Navigator>
    );
};

export default ModelNavigation;
