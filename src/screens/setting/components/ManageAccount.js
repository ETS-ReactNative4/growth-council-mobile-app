import React,{useState} from 'react'
import { StyleSheet,
	Text,
	View,
	ScrollView, 
	ImageBackground,
	TextInput,
	Image, TouchableOpacity} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import FlatTextInput from '../../../shared/form/FlatTextInput';

const ManageAccount = () => {

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
										
								</View>
								<View style={{ height: 1,width:'100%', backgroundColor: '#ECECEC'}} />
								<View style={styles.TextWrapper}>
										<Text style={{size:7, marginLeft:10}}>Username</Text>
										<TextInput
										style={styles.input}
										placeholder="Edward"
										keyboardType="text"
									/>
										<Text style={{size:7, marginLeft:10}}>First Name</Text>
										<TextInput
										style={styles.input}
										placeholder="useless placeholder"
										keyboardType="text"
									/>
										<Text style={{size:7, marginLeft:10}}>Last Name</Text>
										<TextInput
										style={styles.input}
										placeholder="useless placeholder"
										keyboardType="text"
									/>
										<Text style={{size:7, marginLeft:10}}>Email</Text>
										<TextInput
										style={styles.input}
										placeholder="Edward@frostdigi.com"
										keyboardType="text"
									/>
										 <View style={styles.loginButtonWrapper}>
										<Button style={styles.loginButton} >
											{/*<Button style={styles.loginButton} onPress={handleSubmit} disabled={!isValid}>*/}
											<Text style={styles.loginButtonText}>Update Password</Text>
										</Button>
									</View>
										
								</View>
								<View style={{ height: 1,width:'100%', backgroundColor: '#ECECEC'}} />
								<View style={styles.middleWrapper}>
										<View style={styles.middleImage}>
										<Ionicons
											name="key" 
											color='white' 
											size={20}/>
										</View>
										<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Change Password</Text>
										
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


export default ManageAccount

const styles = StyleSheet.create({
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
		height:'100%',
    },
	header:{
		width:'80%',
		height:160, 
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
		height:700,
		backgroundColor:'white',
		marginTop:110,
		justifyContent:'center',
		alignItems:'center', 
	},
	wrapper:{
		width:'80%',
		height:500, 
		// backgroundColor:"red",
		marginTop:100,
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
	},
	TextWrapper:{
		height:380,
		// backgroundColor:'green'
		marginTop:10,
	},
	input: {
		height: 40,
		margin: 10,
		borderWidth:0.5,
		padding: 10,
		borderRadius:10,
	  },
	
	loginButtonWrapper: {
       marginLeft:20,
        width: '90%',
    },
    loginButton: {
        width: '50%',
        borderRadius: 10,
        height: 50,
        backgroundColor:'#3A9BDC',
    },
    loginButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
		
    },

	
})
