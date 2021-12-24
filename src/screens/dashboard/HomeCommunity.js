import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';

const HomeCommunityScreen = (props) => {
	const dispatch = useDispatch();

	return (
		<HomeCommunity
		{...props}
		/>
	)
}

export default HomeCommunityScreen;

const styles = StyleSheet.create({})
