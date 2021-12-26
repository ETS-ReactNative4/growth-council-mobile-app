import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EngagementDetail from './components/EngagementDetail';

const EngagementDetailScreen = (props) => {
	const dispatch = useDispatch();

	return (
		<EngagementDetail
		{...props}
		/>
	)
}

export default EngagementDetailScreen;

const styles = StyleSheet.create({})
