import React,{useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View , FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import RoundCheckbox from 'rn-round-checkbox';
import { RadioButton } from 'react-native-paper';

const Traits = (props) => {
	const{
		navigation,
		route,
		subTraits,
		subTraitsLoading,
		subTraitsError,
		fetchAllSubTrait,
		cleanSubTrait, 
		count
	}=props;

	useEffect(()=>{
		const fetchAllSubTraitsAsync = async () =>{
			await fetchAllSubTrait(route.params.id);
		};
		fetchAllSubTraitsAsync();
	},[]);

	// console.log("subTraits", subTraits.sub_traits[0].questions[0].question);
	const _renderItem = ({item, index}) => {
		return (
			<View style={styles.wrapper}>
				<View style={{flexDirection:'row'}}>
					<RadioButton
						value="Yes"	
					/>
					<Text>Yes</Text>
				</View>
			</View>
		)}
  	return (
		<View>
			<View style={[styles.questionWrapper,styles.shadowProp]}>
				<View style={{ alignItems:"center"}}>
					<Text style={styles.title}>question</Text>
				</View>

				<FlatList
					vertical
					showsVerticalScrollIndicator={false}
					data={subTraits?.sub_traits?.questions}
					renderItem={_renderItem}
				/>
				{/* <View>
					<View style={styles.wrapper}>
						<View style={{ flexDirection:'row'}}>

						<RoundCheckbox
							size={20}
							label="Yes"
							backgroundColor="#EAEBED"
						/>
						<Text style={{fontSize:13, marginLeft:5}}>Strongly DisAgree</Text>
						</View>

						<View  style={{marginLeft:32, flexDirection:"row"}}>
						<RoundCheckbox
							size={20}
							label="No"
							backgroundColor="#EAEBED"
						/>
						<Text style={{fontSize:13, marginLeft:5}}>Disagree</Text>
						</View>
					</View>
					<View style={styles.wrapper}>
						<View style={{ flexDirection:'row'}}>		
						<RoundCheckbox
							size={20}
							label="Yes"
							backgroundColor="#EAEBED"
						/>
						<Text style={{fontSize:13, marginLeft:5}}>Strongly Agree</Text>
						</View>
						<View  style={{marginLeft:50, flexDirection:"row"}}>
						<RoundCheckbox
							size={20}
							label="No"
							backgroundColor="#EAEBED"
						/>
						<Text style={{fontSize:13, marginLeft:5}}> Agree</Text>
						</View>
					</View>

					<View style={{ flexDirection:'row',marginLeft:20,marginTop:15}}>
						<RoundCheckbox
							size={20}
							label="Yes"
							backgroundColor="#EAEBED"
						/>
						<Text style={{fontSize:13, marginLeft:5}}>SomeWhat Agree</Text>

					</View>

				</View> */}
			</View>
			<ScrollView style={styles.scrollBox}>
			<View style={{marginTop:25}}>
				{/* <Text style={styles.title}>
					Best Practices
				</Text> */}

				<Text style={styles.paragraph}>
					{subTraits?.sub_traits?.content}
				</Text>
			</View>

			<View style={{marginTop:30}}>
				<Text style={styles.title}>
					Key Points
				</Text>
				<Text style={styles.paragraph}>
				A practical and fresh perspective on the role of personal energy as a resource in your life to increase your capacity.
				{"\n"}
				{"\n"}				
				Critical insights on the choices you are making right now that impact your capacity.
				{"\n"}
				{"\n"}
				A proven technique to improve your day to day energy.
				{"\n"}
				{"\n"}
				A practical and fresh perspective on the role of personal energy as a resource in your life to increase your capacity.
				{"\n"}
				{"\n"}
				Critical insights on the choices you are making right now that impact your capacity.
				</Text>
			</View>
			</ScrollView>
			</View>
  );
};

const styles = StyleSheet.create({
	questionWrapper:{
		height:196,
		borderRadius:22,
		 margin:5,
		 marginTop:25,
		 padding:18,
		 backgroundColor: 'white',
    	overflow: 'hidden',
	},
	paragraph:{
		fontSize:14,
		fontFamily:Typography.FONT_SF_REGULAR, 
		color:"#77838F",
		marginTop:10
	},
	title:{
		fontSize:14,
		fontFamily:Typography.FONT_SF_SEMIBOLD, 
		color:"#1E2022"
	},
	shadowProp: {
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	
		elevation: 5,
	  },
	  scrollBox: {
        overflowY:'scroll'
    },
	wrapper:{
		display:'flex',
		flexDirection:'row',
		marginTop:15,
		marginLeft:20,
	}
});

export default Traits;
