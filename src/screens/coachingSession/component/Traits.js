import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import RoundCheckbox from 'rn-round-checkbox';

const Traits = () => {
  return (
	<View>
				<View style={[styles.questionWrapper,styles.shadowProp]}>
					<View style={{ alignItems:"center", height:40, justifyContent:'center'}}>
						<Text style={styles.title}>Would you like to invest on you future?</Text>
					</View>

					<View style={{height:1, borderWidth:0.1, backgroundColor:'#D8D8D8'}}/>

					<View>
						<View style={styles.wrapper}>
							<View style={{ flexDirection:'row'}}>
								
								<RoundCheckbox
									size={20}
									label="Yes"
									backgroundColor="#EAEBED"
								/>
								<Text style={{fontSize:13, marginLeft:5}}>Strongly Agree</Text>
								
							
								
							</View>
							<View  style={{marginLeft:32, flexDirection:"row"}}>
								<RoundCheckbox
									size={20}
									label="No"
									backgroundColor=""
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
								<Text style={{fontSize:13, marginLeft:5}}> Agree</Text>
								
								
							</View>
							<View  style={{marginLeft:80, flexDirection:"row"}}>
								<RoundCheckbox
									size={20}
									label="No"
									backgroundColor=""
								/>
								<Text style={{fontSize:13, marginLeft:5}}> Strongly Disagree</Text>
							</View>
						</View>
						
						<View style={{ flexDirection:'row',marginLeft:20,marginTop:15}}>
								<RoundCheckbox
									size={20}
									label="Yes"
									backgroundColor="#EAEBED"
								/>
								<Text style={{fontSize:13, marginLeft:5}}>Neutral</Text>

						</View>

					</View>
				</View>
				<ScrollView style={styles.scrollBox}>
				<View style={{marginTop:25}}>
					<Text style={styles.title}>
						Best Practices
					</Text>

					<Text style={styles.paragraph}>
					It’s time to account for the full toll that modern work is exacting on our ability to keep up with and stay ahead of the pace of change.
					With our boundaries broken down by a more interconnected world, time has proven to be an insufficient resource in this era.
					It is energy, not time, that is our most precious and undervalued resource to solve this extraordinary challenge.
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
