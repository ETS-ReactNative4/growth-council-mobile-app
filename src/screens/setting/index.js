import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Setting from './components/index';

const SettingScreen = (props) => {
	const dispatch = useDispatch();
	return (
		<Setting
		{...props}/>
	)
}

export default SettingScreen;

const styles = StyleSheet.create({
	
})
