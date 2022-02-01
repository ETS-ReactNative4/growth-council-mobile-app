import React,{useState, useEffect} from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	FlatList, } 
from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Checkbox from '../../../shared/form/Checkbox';

import { RadioButton } from 'react-native-paper';

const Question = (props) => {
	const{
		navigation,
		route,
		subTraits,
		subTraitsLoading,
		subTraitsError,
		fetchAllSubTrait,
		cleanSubTrait
	}=props;

	useEffect(()=>{
		const fetchAllSubTraitsAsync = async (identifier) =>{
			await fetchAllSubTrait(identifier);
		};
		fetchAllSubTraitsAsync();
	},[]);


	const [checked, setChecked] = useState('Yes');

	const _renderItem = ({item, index}) => {
		return (
			<View style={[styles.questionWrapper,styles.shadowProp]}>
			
			<View style={{ alignItems:"center",  justifyContent:'center', borderBottomWidth:0.1}}>
		
				<Text style={styles.title}>{item?.post_title}</Text>
			</View>
			
			<View style={styles.wrapper}>	
				<View style={{flexDirection:'row'}}>
					<RadioButton
						value="Yes"
						status={ checked === 'Yes' ? 'checked' : 'unchecked' }
						onPress={() => setChecked('Yes')}
					/>
					<Text>Yes</Text>
				</View>
				<View style={{flexDirection:'row'}}>
					<RadioButton
						value="No"
						status={ checked === 'No' ? 'checked' : 'unchecked' }
						onPress={() => setChecked('No')}
					/>
					<Text>No</Text>
				</View>
			</View>
				
			<View>

			</View>
		</View>
		);
	  };

	if(subTraits?.length === 0 || subTraits === undefined){
		return <></>
	}
  return (
	<View>
	 	<FlatList
			vertical
			showsVerticalScrollIndicator={false}
			data={subTraits?.sub_traits[0]?.yellow_benchmark_questions}
			renderItem={_renderItem}
		/>
		
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
		  justifyContent:'space-evenly'
	  }
});

export default Question;
