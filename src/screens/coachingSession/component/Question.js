import React,{useState, useEffect} from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	FlatList, TextInput} 
from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Checkbox from '../../../shared/form/Checkbox';

import { RadioButton } from 'react-native-paper';
import { useFormik } from 'formik';

const Question = props => {
	const{
		navigation,
		route,
		value,
		onChange,

		subTraits,
		subTraitsLoading,
		subTraitsError,
		fetchAllSubTrait,
		cleanSubTrait,
		count,

		traitsAnswer,
		traitsAnswerLoading,
		traitsAnswerError,
		fetchTraitsAnswer,
		updateTraitsAnswer,
		cleanTraitsAnswer
	}=props;


	// const{
	// 	setFieldValue,

	// }=useFormik({
	// 	initialValues:{
	// 		checked:false,
	// 	}
	// })

	useEffect(()=>{
		const fetchAllSubTraitsAsync = async (identifier) =>{
			await fetchAllSubTrait(identifier);
		};
		fetchAllSubTraitsAsync();
	},[]);


	// const [checked, setChecked] = useState(false);
	const [radioState, setRadioState] = useState(value);



	if(subTraits?.length === 0 || subTraits === undefined){
		return <></>
	}

  return (
	<View>
	 	{/* <FlatList
			vertical
			showsVerticalScrollIndicator={false}
			data={subTraits?.sub_traits[count]?.yellow_benchmark_questions}
			renderItem={_renderItem}
		/> */}
		{
			subTraits?.sub_traits[count]?.yellow_benchmark_questions?.map((question, key)=>(	
			<View style={[styles.questionWrapper,styles.shadowProp]}>

				<View style={{ alignItems:"center",  justifyContent:'center', borderBottomWidth:0.1}}>
					<Text style={styles.title}>{question?.post_title}</Text>
				</View>
			{[
			{ name: "Yes", value: true },
			{ name: "No", value: false }
			].map((option) => (
					<View style={styles.wrapper}>	
						<View style={{flexDirection:'row'}}>
							<RadioButton
								value={option.name}
								status={option.name === radioState}
								onPress={(e) =>
									setRadioState(option.value)
									// onPress(e.option.value === "yes")
              						// [question.ID]=option

								}

							/>
							<Text key={option.name}>{option.name}</Text>
						</View>
						{/* <View style={{flexDirection:'row'}}>
							<RadioButton
								status={ checked === 'Yes' ? 'checked' : 'unchecked' }
								onPress={() => 
									setChecked((checked) =>({
										...checked,
										[item.ID]: item
									}))
								}
							/>
							<Text>No</Text>
						</View> */}
					</View>
				 ))}
					
				<View>

				</View>
				</View>
				))
			}
	</View>
  );
};

const styles = StyleSheet.create({
	questionWrapper:{
		height:154,
		borderRadius:22,
		 margin:5,
		 marginTop:25,
		 padding:12,
		 backgroundColor: 'white',
    	overflow: 'hidden',
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
	  wrapper:{
		  display:'flex',
		  flexDirection:'row',
		  marginTop:15,
		  marginLeft:20,
		
	  }
});

export default Question;
