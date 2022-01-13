import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import GrowthCoaching from './components/GrowthCoaching';

const GrowthCoachingScreen = (props) => {
	return (
		<GrowthCoaching
		{...props}
		/>
	)
}

export default GrowthCoachingScreen

const styles = StyleSheet.create({})
