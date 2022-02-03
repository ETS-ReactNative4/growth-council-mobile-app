import React,{useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View , FlatList, Pressable} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import HTMLView from 'react-native-htmlview';

import TraitsQuestion from './traitsQuestion';

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
		answers,
		setAnswers,
		selectedId,
		setSelectedId,

		traitsAnswer,
		traitsAnswerLoading,
		traitsAnswerError,
		fetchTraitsAnswer,
		UpdateTraitsAnswer,
	}=props;


	useEffect(()=>{
		const fetchAllSubTraitsAsync = async () =>{
			await fetchAllSubTrait(route.params.id);
		};
		fetchAllSubTraitsAsync();
	},[]);

	// const SelfAssessmentByTraitsID = async (traitsID, index) => {
	// 	const response = await fetchAllSubTrait({subTraits.ID: traitsID});
	// 	if (response?.payload?.status === 200) {
	// 	  let items = [...memberConnection];
	// 	  let item = {...items[index]};
	// 	  item.connection = true;
	// 	  items[index] = item;
	// 	  setMemberConnection(items);
	
	// 	  ToastMessage.show('You have successfully connected.');
	// 	} else {
	// 	  toast.closeAll();
	// 	  ToastMessage.show(response?.payload?.response);
	// 	}
	//   };
	
	if(subTraits?.length === 0 || subTraits === undefined){
		return <></>
	}
	
	
  	return (
		<View>
			{
				subTraits?.sub_traits[count]?.questions?.map((question, index)=>(	
					<TraitsQuestion 
					{...props}
					answers={answers}
					setAnswers={setAnswers}
					question={question}
					questionIndex={index}
					key={index}
					/>

				))
			}
		
			<ScrollView style={styles.scrollBox}>
			<View style={{marginTop:25}}>
				<Text style={styles.paragraph}>
				<HTMLView value={subTraits?.sub_traits[count]?.content} stylesheet={styles}/>
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
	}
});

export default Traits;
