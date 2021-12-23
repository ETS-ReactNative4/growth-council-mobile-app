import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
	Text,
	ImageBackground,
	ScrollView,
	FlatList,
	TouchableOpacity, Dimensions
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Data = [
	{
		uri: require('../../../assets/img/profile_image.png'),
		text: "Jay",
	},
	{
		uri: require('../../../assets/img/welcome_profile_image.png'),
		text: "John",
	},
	{
		uri: require('../../../assets/img/dash_member_image.png'),
		text: "John",
	},
	{
		uri: require('../../../assets/img/profile_image.png'),
		text: "Jay",
	},
	
];


const _renderItem = ({item, index}) => {
	return (
	<View style={styles.bottomWrapper}>
		<Image 
			style={styles.bottomImage}
			source={item?.uri}/>
		<Text style={{fontWeight:"bold", fontSize:18}}>{item.text}</Text>
		<View style={{borderRadius:50, backgroundColor:"#EBECF0", width:30, height:30, justifyContent:"center", marginLeft:60}}>
			<Ionicons
				name={'chatbox'}
				size={20}
				color="grey"
				style={{marginLeft:5}}
			/>
		</View>
		
	</View>)
}

const data1=[
	{
		icon:"brain",
		text:"Executive MindChange"
	},
	{
		icon:"location-arrow",
		text:"Megatrends Workshop"
	},
	{
		icon:"window-maximize",
		text:"Annual Council Meeting"
	},
	{
		icon:"clipboard",
		text:"BrainStorming Strategy Discussion"
	},
]

const _renderMiddleItem = ({item, index}) => {
	return (
		<View style={styles.middleWrapper}>
		<View style={styles.middleW}>
			<Font
				name={item.icon}
				size={30}
				color="skyblue"
			/>
		</View>
		<Text style={{marginTop:10, fontSize:12}}>{item.text}</Text>
	</View>)
}

const data2=[
	{
		date:"10",
		month:"july",
		text:"Executive Coaching Clinic On Goal Setting",
		text1:"Hosted by Michael Cooper"
	},
	{
		date:"10",
		month:"Oct",
		text:"Associate Member Meeting",
		text1:"Hosted by Michael Cooper"
	},
]

const _renderTopItem = ({item, index}) => {
	return (
		<View style={styles.topWrapper} >
			<ImageBackground
				style={{width:'100%',
					height:170,
					borderRadius:20}}
					source={require('../../../assets/img/blank_event_design.png')}>

			<View style={{
				width:"15%",
				height:50,
				marginTop:10,
				marginLeft:240,
				backgroundColor:'#EBECF0',
				borderRadius:10,
				padding:5,
				alignItems:'center'				
				}}>
					<Text>{item.date}</Text>
					<Text>{item.month}</Text>
			</View>
							
			<View style={styles.header}>
				<Text style={styles.headingText1}>{item.text}</Text>
				<Text style={styles.headingText2}>{item.text1}</Text>
			</View>
			</ImageBackground>
		</View>)
}


const HomeCommunity = () => {
	return (
		<ScrollView>
        <View style={styles.container}>
				<ImageBackground
					style={{width:'100%',
					height:100,
					
					}}
					source={require('../../../assets/img/blank_event_design.png')}>
						<View style={{display:'flex', flexDirection:'row'}}>
						<Image
							source={require("../../../assets/img/dashboard_logo.png")}
							style={{
								position: 'absolute',
								top: 40,
								height: 30,
								width: 30,
								left: 10,
								borderWidth: 5,
							}}
						/>
						<View style={{marginLeft:50,}}>
						<Text style={{fontWeight:"700",  color:"white", fontSize:20, top:40}}>Community</Text>
						</View>

						<Font
							name={'search'}
							size={30}
							color="white"
							style={{marginLeft:150, marginTop:40}}
						/>
						<Image
						source={require("../../../assets/img/profile_image.png")}
						style={{
						height: 50,
						width:50,
						marginTop:30,
						marginLeft:10,
						borderRadius:50,
					}}
				/>
					</View>
				</ImageBackground>
		
		
            <View style={styles.top}>
				<Text style={{fontWeight:"bold", fontSize:20}}> Growth Community Events</Text>
				<View style={{
					display:'flex', 
					flexDirection:'row',
				}}>
					<FlatList
                        horizontal
						showsHorizontalScrollIndicator={false}
                        data={data2}
                        renderItem={_renderTopItem}/>
				
				</View>
            </View>
			
			<View style={styles.middle}>
				<Text style={{fontWeight:"bold", fontSize:20}}>Points of Engagement</Text>
				
				<View 
					style={{display:'flex', 
					flexDirection:'row',
					}}>
						<FlatList
                        horizontal
						showsHorizontalScrollIndicator={false}
                        data={data1}
                        renderItem={_renderMiddleItem}/>
				</View>

			</View>
			
			

			<View style={styles.bottom}>
				<Text style={{fontWeight:"bold" ,fontSize:20}}>Growth Community Member</Text>
				<View >
					<FlatList
                        horizontal
						showsHorizontalScrollIndicator={false}
                        data={Data}
                        renderItem={_renderItem}/>
				</View>
			</View>

        </View>
		</ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
    },
	top:{
		height:200,
		marginTop:20,
		margin:10,
		justifyContent:'center',	
	},
	
	topWrapper:{
		height:170,
		width:300,
		marginTop:20,
		marginLeft:10,
		borderRadius:50,
	},
	header:{
		margin:10,
	},
    headingText1: {
		...CommonStyles.headingText1,
    	fontFamily: Typography.FONT_NORMAL,
      	marginTop:10,
		fontWeight:'800',
		color:'white',
		
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
		fontWeight:'700',
		color:'white',
    },
	middle:{
		width:400,
		height:200,
		marginLeft:10,
		marginTop:10,
			
	},
	middleWrapper:{
		height:150,
		width:90,
		borderRadius:20,
		marginTop:10,
		// backgroundColor:'white',
		justifyContent:"center",
		alignItems:'center',
	},
	middleW:{
		backgroundColor:'white',
		width:80, 
		height:80, 
		justifyContent:'center', 
		alignItems:'center',
		borderRadius:10
	},
	headingText3: {
        ...CommonStyles.headingText3,
        fontFamily: Typography.FONT_NORMAL,
		padding:4,
    },
	bottom:{
		height:190,
		margin:10,
		width:400,
	},
	bottomWrapper:{
		width:120,
		height:170,
		borderRadius:10,
		marginRight:10,
		marginTop:10,
		backgroundColor:'white',
		alignItems:'center',
	},
	bottomImage:{
		width:'100%',
		height:100, 
		borderRadius:20
	},
   

});

export default HomeCommunity;
