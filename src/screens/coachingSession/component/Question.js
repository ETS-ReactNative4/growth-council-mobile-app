import React,{useState} from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	FlatList, } 
from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Checkbox from '../../../shared/form/Checkbox';
import RoundCheckbox from 'rn-round-checkbox';

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

	console.log(subTraits);

	const [checked, setChecked] = useState(false);

	const data = [
		{
			text: 'You can’t connect the dots going forward?',
		},
		{
			text: 'You can connect the dots going forward?',
		},
		{
			text: 'You can’t connect the dots going forward?',
		},
		{
			text: 'You can connect the dots going forward?',
		},
	];
	const _renderItem = ({item, index}) => {
		return (
		<View style={[styles.questionWrapper,styles.shadowProp]}>
			<View style={{ alignItems:"center", height:40, justifyContent:'center'}}>
				<Text style={styles.title}>{item.text}</Text>
			</View>
			<View style={{height:1, borderWidth:0.1, backgroundColor:'#D8D8D8'}}/>

			<View style={styles.wrapper}>
				<View style={{marginLeft:10, flexDirection:'row'}}>
					
					<RoundCheckbox
						size={24}
						label="Yes"
						backgroundColor="#EAEBED"
					/>
					<Text style={{fontSize:13, marginLeft:5}}>Yes</Text>
					
					
				</View>
				<View  style={{marginLeft:100, flexDirection:"row"}}>
					<RoundCheckbox
						size={24}
						label="No"
						backgroundColor=""
					/>
					<Text style={{fontSize:13, marginLeft:5}}>No</Text>
				</View>
			
				
			</View>
				
			<View>

			</View>
		</View>
		);
	  };
  return (
	<View>
	 	<FlatList
			vertical
			showsVerticalScrollIndicator={false}
			data={data}
			renderItem={_renderItem}
		/>
	</View>
  );
};

const styles = StyleSheet.create({
	questionWrapper:{
		height:124,
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
