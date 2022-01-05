import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
	ScrollView, ImageBackground,FlatList,
} from 'react-native';
import moment from 'moment';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {useAuthentication} from '../../../context/auth';
import {BubblesLoader} from 'react-native-indicator';
import { Button, Flex } from 'native-base';

const Profile = (props) => {
	const [value, setValue] = useState('My Events');
	const data = [
		{
		  text: 'Executive Coaching Clinic On Goal Setting',
		  text1: 'Hosted by Michael Cooper',
		  text2:"3 persons",
		  text3:"17 June 2021",
		  text4:"10:00 am",
		  text5:"Minima Room",
		},
		{
		  text: 'Associate Member Meeting',
		  text1: 'Hosted by Michael Cooper',
		  text2:"3 persons",
		  text3:"17 June 2021",
		  text4:"10:00 am",
		  text5:"Minima Room",
		},
		{
			text: 'Executive Coaching Clinic On Goal Setting',
			text1: 'Hosted by Michael Cooper',
			text2:"3 persons",
			text3:"17 June 2021",
			text4:"10:00 am",
		  	text5:"Minima Room",
		  },
		  {
			text: 'Associate Member Meeting',
			text1: 'Hosted by Michael Cooper',
			text2:"3 persons",
			text3:"17 June 2021",
			text4:"10:00 am",
		 	 text5:"Minima Room",
		  },
		
	  ];
	  
	  const _renderItem = ({item, index}) => {
		return (
			<View style={[styles.middleWrapper, styles.shadowProp]}>
			<View style={styles.wrapper}>
				<Text style={{fontSize:15, fontWeight:"bold", color:"black"}}>{item.text}</Text>
				<Text style={{fontSize:10}}>{item.text1}</Text>
				<View style={styles.iconWrapper}>
				<Font
					name={'search'}
					size={15}
					color="#0B0B45"
					
				/><Text style={{color:'black', marginLeft:5}}>{item.text2}</Text>
				<Font
					name={'search'}
					size={15}
					color="#0B0B45"
					style={{marginLeft:20}}
					
				/><Text style={{color:'black',  marginLeft:5}}>{item.text3}</Text>
				</View>
				<View style={styles.iconWrapper}>
				<Font
					name={'search'}
					size={15}
					color="#0B0B45"
					
					
				/><Text style={{color:'black',  marginLeft:5}}>{item.text4}</Text>
				<Font
					name={'search'}
					size={15}
					color="#0B0B45"
					style={{marginLeft:20}}
					
				/><Text style={{color:'black',  marginLeft:5}}>{item.text5}</Text>
				</View>
				
				
			 </View>
			 <Button style={{height:40, top:40, backgroundColor:"#0B0B45", borderRadius:15}}>Upcoming</Button>
		</View>
		 
		);
	  };
    return (
		<ScrollView contentContainerStyle={{flexGrow: 1,}} >
			<View style={styles.container} >
				<ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover" >


				<View style={{height: '100%',}}>
					<View style={{
						marginTop:80,	
						justifyContent:'center', 
						position:'absolute',
						zIndex: 20,
						marginLeft:310}}>
						<Font
							name={'edit'}
							size={20}
							color="#808080"
							style={{marginTop:5, marginLeft:5}}
							
						/>
							<Ionicon
							name={'settings-outline'}
							size={20}
							color="#808080"
							style={{marginTop:10, marginLeft:5}}
							
						/>
						</View>
					<View style={styles.icon}>
						<Image source={require("../../../assets/img/profile_image.png")}
							
						/>
						
					</View>
					<View style={styles.textWrapper}>
					<Ionicon
							name={'star'}
							size={20}
							color="yellow"
							style={{marginTop:5, marginLeft:5}}
							
						/>
						<Text style={{fontSize:18, marginTop:5}}>1457</Text>
					</View>
					<View style={styles.header}>
						<Text style={styles.headingText1}>Edward Junior</Text>
						<Text style={{width:'60%',}}>Hi I am an AI analyst. Expert in Data Technology </Text>
						<View style={{ height: 1,width:'90%', backgroundColor: '#ECECEC', marginTop:20}} />
						<View style={styles.headerWrapper}>
							<View>
								<Text style={{fontSize:15, fontWeight:'600', marginLeft:30}}>124</Text>
								<Text>My Connection</Text>
							</View>
							<Button style={styles.button}>Refer a Member</Button>
						</View>
					</View>
					
					<View style={styles.middle}>
						
						<View style={styles.buttonWrapper}>
							<ButtonToggleGroup
								highlightBackgroundColor={'white'}
								highlightTextColor={'#0B0B45'}
								inactiveBackgroundColor={'transparent'}
								inactiveTextColor={'grey'}
								values={['My Sessions', 'My Events']}
								value={value}
								onSelect={val => setValue(val)}
								style={{height:40, marginTop:5, width:'90%', marginLeft:10,}}
							/>
						</View>
						
						<FlatList
							Vertical
							showsVerticalScrollIndicator={false}
							data={data}
							renderItem={_renderItem}
							/>
							
					</View>
				</View>
				</ImageBackground>
			</View>
		</ScrollView>        
    );

};

const styles = StyleSheet.create({
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
		height:'100%',
    },
	header:{
		width:'80%',
		height:230, 
		backgroundColor:"white",
		margin:40,
		marginTop:70,
		borderRadius:10, 
		justifyContent:'center',
		alignItems:'center', 
		position:'absolute',
		zIndex: 10,
		borderWidth: 0.5,
		
	},
	headerWrapper:{
		display:'flex',
		flexDirection:'row',
		marginTop:20,
	},
	button:{
		marginLeft:30,
		backgroundColor:'#0B0B45',
		borderRadius:15,
		width:"47%"
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
	textWrapper:{
		width:'20%',
		height:30, 
		backgroundColor:'white', 
		display:'flex', 
		flexDirection:'row', 
		borderRadius:20,
		position:'absolute',
		zIndex: 30,
		marginLeft:160, marginTop:110, borderWidth:0.5
	},
	headingText1: {
		...CommonStyles.headingText1,
    	fontFamily: Typography.FONT_NORMAL,
		fontSize:Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
		fontWeight:'bold',
		color:'black',
		marginTop:60,
		
    },
	middle:{
		height:"100%",
		width:"100%",
		backgroundColor:'white',
		marginTop:180,
		justifyContent:'center',
		alignItems:'center', 
	},
	shadowProp: {
		shadowColor: '#171717',
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	  },
	buttonWrapper:{
		width:'65%',
		height:50,
		backgroundColor:"#ECECEC",
		borderRadius:10,
		
		margin:10,
		marginTop:140,
		
	},
	btn:{
		width:'40%',
		height:50
	},
	middleWrapper:{
		height: 130,
		width:"100%",
		borderRadius:15,
		display:'flex',
		flexDirection:'row',
		borderWidth:0.5,
		marginTop:20,
		// backgroundColor:"red"
	},
	
	wrapper:{
		width:'70%',	
		marginLeft:10,
		marginTop:10,
		// backgroundColor:"green",
		
	},
	iconWrapper:{
		display:'flex',
		flexDirection:'row',
		marginLeft:10,
		marginTop:10,
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

	



    // container: {
    //     ...CommonStyles.container,
    // },
    // content: {
    //     ...CommonStyles.content,
    // },
    // profile: {
    //     paddingTop: 25,
    //     paddingBottom: 25,
    //     paddingLeft: 25,
    //     paddingRight: 25,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     borderColor: Colors.QUATERNARY_BORDER_COLOR,
    //     borderTopWidth: 1,
    //     borderBottomWidth: 1,
    //     height: 150,
    //     width: '100%',
    //     flexDirection: 'row',
    // },
    // circleProfile: {
    //     backgroundColor: Colors.NONARY_BACKGROUND_COLOR,
    //     height: 106,
    //     width: 106,
    //     borderRadius: 53,
    //     borderColor: Colors.OCTONARY_BORDER_COLOR,
    //     borderWidth: 2,
    //     marginBottom: 5,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // name: {
    //     color: Colors.UNDENARY_TEXT_COLOR,
    //     fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
    //     fontFamily: Typography.FONT_SEMI_BOLD,
    //     lineHeight: 27,
    // },
    // address: {
    //     color: Colors.UNDENARY_TEXT_COLOR,
    //     fontSize: Typography.FONT_SIZE_MEDIUM,
    //     fontFamily: Typography.FONT_BOLD,
    // },
    // phone: {
    //     color: Colors.SECONDARY_TEXT_COLOR,
    //     fontSize: Typography.FONT_SIZE_MEDIUM,
    //     fontFamily: Typography.FONT_SEMI_BOLD,
    //     marginTop: 15,
    // },
    // date: {
    //     color: Colors.UNDENARY_TEXT_COLOR,
    //     fontSize: Typography.FONT_SIZE_SMALL,
    //     fontFamily: Typography.FONT_BOLD,
    // },
    // circleImage: {
    //     height: 106,
    //     width: 106,
    //     borderRadius: 53,
    //     borderColor: Colors.OCTONARY_BORDER_COLOR,
    //     borderWidth: 2,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // button: {
    //     ...CommonStyles.button,
    //     width: 246,
    //     height: 50,
    //     backgroundColor: 'rgba(0,0,0,0.25)',
    //     borderColor: 'rgba(112,112,112,0.25)',
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     padding: 10,
    //     marginTop: 10,
    // },
    // buttonText: {
    //     ...CommonStyles.buttonText,
    //     color: 'rgba(177,177,177,0.72)',
    //     fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
    //     fontFamily: Typography.FONT_SEMI_BOLD,
    // },
    // middleContent: {
    //     padding: 25,
    //     paddingTop: 20,
    //     height: '50%',
    //     marginTop: 10,
    // },
    // contentList: {
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     width: '100%',
    // },
    // contentListItem: {
    //     width: '48%',
    //     alignItems: 'center',
    //     borderColor: Colors.QUATERNARY_BORDER_COLOR,
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     padding: 20,
    // },
    // contentListName: {
    //     ...CommonStyles.listName,
    //     color: '#8DA2C7',
    //     fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
    // },
    // bottomWrapper: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // signout: {
    //     fontSize: Typography.FONT_SIZE_LARGE,
    //     fontFamily: Typography.FONT_NORMAL,
    //     lineHeight: 20,
    //     marginBottom: 10,
    // },
    // version: {
    //     ...CommonStyles.listName,
    //     color: Colors.SECONDARY_TEXT_COLOR,
    //     fontSize: Typography.FONT_SIZE_SMALL,
    //     fontFamily: Typography.FONT_NORMAL,
    //     lineHeight: 15,
    // },
});

export default Profile;

