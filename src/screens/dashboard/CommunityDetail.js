import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommunityDetail from './components/CommunityDetail';

const CommunityDetailScreen = (props) => {
	const dispatch = useDispatch();

	return (
		<CommunityDetail
		{...props}
		/>
	)
}

export default CommunityDetailScreen;

const styles = StyleSheet.create({})
