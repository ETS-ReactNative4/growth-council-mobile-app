import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BestPractice from './components/BestPractice';

const BestPracticeScreen = (props) => {
	return (
		<BestPractice
		{...props}
		/>
	)
}

export default BestPracticeScreen

const styles = StyleSheet.create({})
