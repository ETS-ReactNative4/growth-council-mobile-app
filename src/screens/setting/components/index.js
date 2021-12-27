import React,{useState} from 'react'
import { StyleSheet,
	Text,
	View,
	ScrollView, 
	ImageBackground, 
	Dimensions,
	Image, Switch} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
// import Switch from 'react-native-switch-toggles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import ToggleSwitch from 'toggle-switch-react-native';


const screenHeight = Math.round(Dimensions.get('window').height);

const Setting = () => {
	const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	return (
		<ScrollView contentContainerStyle={{flexGrow: 1,}} >
			<View style={styles.container} >
				<ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover" >
				<View style={{display:'flex', flexDirection:'row'}}>
						<Image
							source={require("../../../assets/img/dashboard_logo.png")}
							style={{
								position: 'absolute',
								top: 20,
								height: 30,
								width: 30,
								left: 10,
								borderWidth: 5,
							}}
						/>
						<View style={{marginLeft:50,}}>
						
						<Text style={{fontWeight:"700",  color:"white", fontSize:20, marginTop:20}}>Settings</Text>
						</View>

						<Font
							name={'search'}
							size={30}
							color="white"
							style={{marginLeft:170, marginTop:20}}
						/>
						<Image
						source={require("../../../assets/img/profile_image.png")}
						style={{
							height: 40,
							width:40,
							marginTop:10,
							marginLeft:10,
							borderRadius:50,
							
						}}
						/>
					</View>

				<View style={{height: '100%'}}>
				<View style={styles.icon}>
						<Image source={require("../../../assets/img/profile_image.png")}
							
						/>
					</View>
					<View style={styles.header}>
						<Text style={styles.headingText1}>Edward</Text>
						<Text>Edward@frostdigi.com</Text>
					</View>
					<View style={styles.middle}>
					<View style={styles.wrapper}>
						<View style={styles.middleWrapper}>
								<View style={styles.middleImage}>
								<Ionicons
									name="person-outline" 
									color='white' 
									size={20}/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Account</Text>
								<Ionicons
									name='chevron-forward-outline'
									size={20}
									color='#d7d7d7'
									style={{marginTop:20, marginLeft:120}}
									/>
							</View>
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage}>
									<Material
										name={'payment'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Payment Method</Text>
								<Ionicons
									name='chevron-forward-outline'
									size={20}
									color='#d7d7d7'
									style={{marginTop:20, marginLeft:50}}
									/>
								
							</View> 
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage}>
									<Ionicons
										name={'notifications'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Notification</Text>
								
								
									<Switch
										trackColor={{ false: "#767577", true: "#32a32e" }}
										thumbColor={isEnabled ? "white" : "white" }
										ios_backgroundColor="#3e3e3e"
										onValueChange={toggleSwitch}
										value={isEnabled}
										style={{ transform: [{ scaleX: 1.4}, { scaleY: 1.5 }] , marginLeft:60}}
     								 />
									  {/* <ToggleSwitch
											isOn={false}
											onColor="green"
											labelStyle={{ color: "black", fontWeight: "900" }}
											size="large"
											onToggle={isOn => console.log("changed to : ", isOn)}
											style={{ transform: [{ scaleX: 0.7}, { scaleY: 0.7}] , marginLeft:60}}
											/> */}

								
							</View> 
						</View>
						<View style={styles.wrapper}>
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Ionicons
										name={'headset'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Help</Text>
								
							</View>
							
						
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Ionicons
										name={'lock-closed-outline'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Private Policy</Text>
							</View> 
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Material
										name={'logout'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Logout</Text>
							</View> 
						</View>
						
						
						<Text style={{fontSize: 10, marginTop: 10}}>Powered By</Text>
						<Image source={require('../../../assets/img/footer_company_name_image.png')}
							style={{width:'60%', marginTop:10, marginBottom:15}}
						/>
					
					</View>
				</View>
				</ImageBackground>
			</View>
		</ScrollView>
	)
}

export default Setting

const styles = StyleSheet.create({
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
		height:'100%',
    },
	header:{
		width:'80%',
		height:190, 
		backgroundColor:"white",
		margin:40,
		marginTop:60,
		borderRadius:10, 
		justifyContent:'center',
		alignItems:'center', 
		position:'absolute',
		zIndex: 10,
		borderWidth: 0.5,
		
	},
	icon:{
		width:90,
		height:90, 
		backgroundColor:"white", 
		borderRadius:19, 
		marginLeft:140, 
		marginTop:30, 
		justifyContent:'center', 
		position:'absolute',
		zIndex: 20,
		borderWidth: 0.3,
	},
	headingText1: {
		...CommonStyles.headingText1,
    	fontFamily: Typography.FONT_NORMAL,
		fontSize:Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
      	marginTop:40,
		fontWeight:'800',
		
		
    },
	middle:{
		height:'80%',
		backgroundColor:'white',
		marginTop:150,
		justifyContent:'center',
		alignItems:'center', 
	},
	wrapper:{
		width:'80%',
		height:180, 
	
		marginTop:10,
	},
	middleWrapper:{
		height: 60,
		display:'flex',
		flexDirection:'row',
		
	
	},
	
	middleImage:{
		width:40, 
		height:40, 
		backgroundColor:'#3A9BDC',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
		marginLeft:10,
		marginTop:10,
	},
	middleImage1:{
		width:40, 
		height:40, 
		backgroundColor:'#d7d7d7',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
		marginLeft:10,
		marginTop:10,
	}

	
})
