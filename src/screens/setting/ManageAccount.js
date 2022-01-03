import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ManageAccount from './components/ManageAccount';

const ManageAccountScreen = (props) => {
	const dispatch = useDispatch();
	return (
		<ManageAccount
		{...props}/>
	)
}

export default ManageAccountScreen

const styles = StyleSheet.create({})
