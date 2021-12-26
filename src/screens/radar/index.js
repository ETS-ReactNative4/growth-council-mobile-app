import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FrostRadar from './component';



const FrostRadarScreen = (props) => {
	const dispatch = useDispatch();
	return (
		<FrostRadar
		{...props}/>
	)
}

export default FrostRadarScreen;

const styles = StyleSheet.create({
	
})
