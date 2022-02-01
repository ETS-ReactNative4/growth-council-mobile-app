
import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { 
	StyleSheet, 
	Text,
	View,
	ScrollView }
 from 'react-native';
import {Button} from 'native-base';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Trait from './Traits';
import Question from './Question';
import { fetchAllSubTraits, resetSubTraits } from '../slice/subTraitsSlice';

const selfAssessment = (props) => {

	const {
        navigation,
        route,
		answers,
		setAnswers
    } = props;

	const dispatch = useDispatch();

	const {subTraits,subTraitsLoading,subTraitsError}= useSelector(state => state.subTraits);

	const fetchAllSubTrait = identifier =>{
		dispatch(fetchAllSubTraits(identifier));
	}

	const cleanSubTrait = () =>{
		dispatch(resetSubTraits());
	};

	const [value, setValue] = useState('Sub Trait');
	const [count, setCount] = useState(0);	
	return (
		<View style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
			<View style={{flex:1}}>  
				<View style={styles.Wrapper}>
					<ButtonToggleGroup
						highlightBackgroundColor={'white'}
						highlightTextColor={'#0B0B45'}
						inactiveBackgroundColor={'transparent'}
						inactiveTextColor={'grey'}
						values={['Sub Trait', 'Yellow Questions']}
						value={value}
						onSelect={val => setValue(val)}
						style={{height: 30, marginTop: 5, width: '95%', marginLeft: 10, fontSize:12, borderRadius:15}}
					/>
				</View>
			
				<View >
					{value === 'Sub Trait' &&
						<Trait
						{...props}
						subTraits={subTraits}
						subTraitsLoading={subTraitsLoading}
						subTraitsError={subTraitsError}
						fetchAllSubTrait={fetchAllSubTrait}
						cleanSubTrait={cleanSubTrait}
						count={count}
						answers={answers}
						setAnswers={setAnswers}/>
					}
					{value === 'Yellow Questions' &&
						<Question
						{...props}
						subTraits={subTraits}
						subTraitsLoading={subTraitsLoading}
						subTraitsError={subTraitsError}
						fetchAllSubTrait={fetchAllSubTrait}
						cleanSubTrait={cleanSubTrait}
						count={count}
						/>
					}
					
				</View>

			</View>

			<View style={{height:90, display:'flex', flexDirection:'row', paddingTop:15,  borderTopWidth:0.4, marginTop:20}}>
				<Button style={styles.buttonWrapper} onPress={()=>setCount(count - 1)} disabled={count === 0 ? true:false }>
					{/* <Ionicons name={'chevron-back-outline'} size={25} color={'#FFFFFF'} /> */}
					<Text style={{ color:"#FFFFFF",marginTop:2, fontSize:14,marginLeft:20}}>Previous</Text>
				</Button>
				<Button style={styles.buttonWrapper} onPress={()=>setCount(count + 1)}>
					<Text style={{ color:"#FFFFFF",marginTop:2, fontSize:14}}>Next</Text>
					{/* <Ionicons name={'chevron-forward-outline'} size={25} color={'#FFFFFF'} style={{marginLeft:30}}/> */}
				</Button>
			</View>

		</View>
	);
};

const styles = StyleSheet.create({
	Wrapper: {
        height: 40,
        backgroundColor: "#ECECEC",
        borderRadius: 15,
    },
	buttonWrapper:{
		width:147,
		height:45,
		display:'flex',
		flexDirection:'row',
		margin:10,
		padding:10,
		backgroundColor:'#9FBC6C', 
		borderRadius:10, 
		fontSize:14,
		alignContent:'center',
		
	},
	scrollBox: {
        height: '65%',
        width: '100%',

    },
	

});

export default selfAssessment;
