import React,{useState} from 'react'
import { StyleSheet, Text, View ,ScrollView, ImageBackground, StatusBar, Dimensions, TextInput} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';

const screenHeight = Math.round(Dimensions.get('window').height);

const data = [
	{ battery: 0.7, design: 1, useful: 0.9, speed: 0.67, weight: 0.8 },
	{ battery: 0.6, design: 0.9, useful: 0.8, speed: 0.7, weight: 0.6 }
  ];
  const chartSize = 450;
  const numberOfScales = 4;
  const scale = value => (
	<circle
	  key={`scale-${value}`}
	  cx={0}
	  cy={0}
	  r={((value / numberOfScales) * chartSize) / 2}
	  fill="#FAFAFA"
	  stroke="#999"
	  strokeWidth="0.2"
	/>
  );
const FrostRadar = (props) => {
	const [show, setShow]= useState(true);
	// const groups = [];
	// const scales = [];
	// for (let i = numberOfScales; i > 0; i--) {
	//   scales.push(scale(i));
	// }
	// groups.push(<g key={`scales`}>{scales}</g>);
	// const middleOfChart = (chartSize / 2).toFixed(4);
	return (
		
		<ScrollView contentContainerStyle={{flexGrow: 1,}} >
			<View style={styles.container} >
				<ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover" >
				<View style={styles.arrow}>
						<Ionicons
							name={'arrow-back'}
							size={50}
							color='white'
							onPress={() => navigation.navigate('Journey')}
						/>
						</View>

				<View style={{height: '100%'}}>
						<View style={styles.header}>
							<Text style={{fontWeight:"bold", fontSize:20, color:"blue"}}>Frost Radar</Text>
						</View>
						<View style={styles.radar}>
						{/* <svg
							version="1"
							xmlns="http://www.w3.org/2000/svg"
							width={chartSize}
							height={chartSize}
							viewBox={`0 0 ${chartSize} ${chartSize}`}
							>
							<g transform={`translate(${middleOfChart},${middleOfChart})`}>{groups}</g>
							</svg> */}
						</View>
						<View style={styles.detail}>
						{ show?
							 <View style={{padding:20,}}>
								<Text style={styles.paragraph}>
									Frost & Sullivan's global team of analysts and consultants continuosly researches a wide range of industries across the globe. 
									Our work is focused exclusively on identifyig the growth opportunities of the future and evaluating companies that reabest positioned to take advantage of them.
									The frost Radar is a robust analytical tool that allows us to evalute companies across two key indices: their focused
									on continuouse innovatios and their ability to translate their innovations into consistent growth. Our primary and secondary analyses span the entire value chain of each industry, 
									identifying organistions that consistently develop new growth strategies based o a visionary understanding of the futures and
									a proven ability to effectively address emerging challenges and opportunities.
								</Text>
								<Text style={{marginTop:20}} >
									In that vein, the Frost Radar serves as a truly dynamic solution to continuously benchmark companies' future growth
									potential with clear insight into their core strengths and weaknesses.
								</Text>

								<Button 
								style={styles.button}
								onPress={()=>setShow(!show)}
								>
                                    <Text style={{color:"white"}} >Add New Data</Text>
                                </Button>
							</View> 
						:
							<View style={{padding:20}}>
								<View style={styles.text}>
									<Text>Name</Text>
									<Text style={{marginLeft:60}}>Growth Index</Text>
									<Text style={{marginLeft:35}}>Innovation Index</Text>
								</View>
								<View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Yamaha</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:10,
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Tata</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:32,
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Toyota</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:15
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Nissan</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:15
											}}
											
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Mahindra</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Infiniti</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:20
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Tesla</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:30
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<View style={styles.cardetails}>
										<Text style={{fontSize:15, fontWeight:"bold"}}>Ford</Text>
										<TextInput
											style={{width:100,
												height: 30,
												borderRadius:10,
												borderWidth: 0.5,
												marginLeft:33
											}}
											placeholder=""
											keyboardType="text"
										/>
										<TextInput
											style={styles.input}
											placeholder=""
											keyboardType="text"
										/>
									</View>
									<Button style={styles.button}
									onPress={()=>setShow(!show)}>
                                    	<Text style={{color:"white"}} >Show on Radar</Text>
                                	</Button>
								</View>
							</View>
						}
						</View>
				</View>
				</ImageBackground>
			</View>
		</ScrollView>
	)
}

export default FrostRadar;

const styles = StyleSheet.create({
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
		height:'100%',
    },
	header:{
		width:150,
		height:50, 
		backgroundColor:"white",
		marginLeft:120, 
		borderRadius:10, 
		justifyContent:'center',
		alignItems:'center', 
		
	},
	radar:{
		
		height:300,
		margin:10
	},
	detail:{
		backgroundColor:"white",
		height:500,
		margin:15,
		borderRadius:20
	},
	paragraph:{
		fontFamily: Typography.FONT_NORMAL,
		fontSize: Typography.FONT_SIZE_MEDIUM
	},
	button:{
		marginTop:40,
		backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
		height:40,
		borderRadius:10,
	},
	text:{
		display:'flex',
		flexDirection:'row',
		marginTop:10,
	},
	cardetails:{
		justifyContent:'space-between',
		display:'flex',
		flexDirection:'row',
		marginTop:10,
	},
	input: {
		width:100,
		height: 30,
		borderRadius:10,
		borderWidth: 0.5,
		
	  },
})
