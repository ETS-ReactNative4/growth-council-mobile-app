import React,{useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View , FlatList, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import { RadioButton } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';

const Traits = (props) => {
	const{
		navigation,
		route,
		subTraits,
		subTraitsLoading,
		subTraitsError,
		fetchAllSubTrait,
		cleanSubTrait, 
		count,
		totalScore,
		setTotalScore,
	}=props;

	useEffect(()=>{
		const fetchAllSubTraitsAsync = async () =>{
			await fetchAllSubTrait(route.params.id);
		};
		fetchAllSubTraitsAsync();
	},[]);

	const [checked, setChecked] = useState(0);
	

	const _renderItem = ({item, index}) => {
		// console.log(item)
		// return  <Text>1</Text>
		
		return (

			<View style={styles.wrapper}>
				<View style={{flexDirection:'row'}}>
			
					<RadioButton
						value="Yes"
						status={ item.score === checked ? 'checked' : 'unchecked'}
						onPress={() => setChecked(item?.score)}
					/>
					{/* <RadioGroup
						radioButtons={radioButtons}
						onPress={onPressRadioButton}
						layout="row"
					/> */}
					
					<Text style={{fontSize:11, marginTop:10}}> {item.option}</Text>
				</View>
				
			</View>
		)}
	useEffect (()=>{
		console.log(checked);
		let newScore = totalScore;
		newScore += checked;
		setTotalScore(newScore);
		console.log(totalScore); 
	},[count]);
	
	if(subTraits?.length === 0 || subTraits === undefined){
		return <></>
	}

  	return (
		<View>
			{
				subTraits?.sub_traits[count]?.questions?.map((question, key)=>(
						
						<View style={[styles.questionWrapper,styles.shadowProp]}>

						<View style={{ alignItems:"center"}}>
							<Text style={styles.title}>{question?.question}</Text>
						</View>
						
						<FlatList
							horizontal
							showsVerticalScrollIndicator={false}
							data={question?.options}
							// numColumns={Math.ceil(subTraits?.sub_traits[count]?.questions[0].options.length / 2)}
							renderItem={_renderItem}
						/>
						
						
					</View>
				))
			}
		
			<ScrollView style={styles.scrollBox}>
			<View style={{marginTop:25}}>
				<Text style={styles.paragraph}>
					{subTraits?.sub_traits[count]?.content}
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
		fontSize:13,
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
		marginTop:10,
		
	}
});

export default Traits;
