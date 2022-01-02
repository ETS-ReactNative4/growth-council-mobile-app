import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GrowthDetail from './component/GrowthDetails';

const GrowthDetailScreen = (props) => {
	const dispatch = useDispatch();

	return (
		<GrowthDetail
		{...props}
		/>
	)
}

export default GrowthDetailScreen

const styles = StyleSheet.create({})
