import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PrivacyPolicyScreen from '../screens/static/PrivacyPolicy';
import TermsConditionsScreen from '../screens/static/TermsConditions';
import CouncilDetailScreen from '../screens/home/CouncilDetail';

const Stack = createStackNavigator();

const ModelNavigation = () => {

    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Terms" component={TermsConditionsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CouncilDetail" component={CouncilDetailScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default ModelNavigation;
