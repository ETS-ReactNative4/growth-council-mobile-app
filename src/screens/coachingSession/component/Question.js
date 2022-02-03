import React,{useState, useEffect} from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	FlatList, TextInput} 
from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import YellowQuestion from './YellowQuestion';

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

	const [radioState, setRadioState] = useState(value);
	if(subTraits?.length === 0 || subTraits === undefined){
		return <></>
	}

  return (
	<View>
	
		{
			subTraits?.sub_traits[count]?.yellow_benchmark_questions?.map((question, key)=>(	
				<YellowQuestion
				{...props}
				question={question}
				/>
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
