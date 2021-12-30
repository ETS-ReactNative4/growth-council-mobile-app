import React from 'react'
import { ScrollView, StyleSheet, Text, View, Dimensions, Image,ImageBackground,FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import { Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const screenHeight = Math.round(Dimensions.get('window').height);

const GrowthDetail = ({navigation}) => {
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
			text: "James",
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
			<View style={{borderRadius:50, backgroundColor:"#eeeeee", width:30, height:30, justifyContent:"center", marginLeft:60}}>
				<Ionicons
					name={'chatbox'}
					size={20}
					color="#cccccc"
					style={{marginLeft:5}}
				/>
			</View>
			
		</View>)
	}

	
	const top=[
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
						source={require('../../../assets/img/green_blank.png')}>
	
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

	const middle=[
		{
			date:"10",
			month:"july",
			title:"SESSION 1",
			text:"Coach John Roller"
		},
		{
			date:"10",
			month:"Oct",
			title:"SESSION 2",
			text:"Coach John Roller"
		},
	]
	
	const _renderMiddleItem = ({item, index}) => {
		return (
			<View style={styles.middleWrapper} >		
				<View >
					<Text style={{fontWeight:'bold', fontSize:20, margin:10}}>{item.title}</Text>
					<Text style={{marginTop:10, marginLeft:10}}>{item.text}</Text>
				</View>
				<View style={{
					width:"15%",
					height:60,
					marginTop:10,
					backgroundColor:'#EBECF0',
					borderRadius:20,
					marginLeft:50,
					padding:5,
					alignItems:'center'				
					}}>
						<Text>{item.date}</Text>
						<Text>{item.month}</Text>
				</View>
				
			</View>)
	}

	const pic = [
		{
			uri: require('../../../assets/img/welcome_screen_info_image.png'),
			
		},
		{
			uri: require('../../../assets/img/image.png'),
			
		},
		{
			uri: require('../../../assets/img/contactus.png'),
			
		},
	];

	const _renderContentItem = ({item, index}) => {
		return (
			<View style={styles.ContentWrapper} >
				<ImageBackground
					style={{width:'100%',
						height:190,
						borderRadius:20}}
						source={item?.uri}>
				</ImageBackground>
			</View>)
	}

	const learn=[
		{
			
			title:"Growth Coaching",
			text:"Prime Yourself to become Insenely Great Leader",
			text1:"Frost"
		},
		{
			
			title:"Growth Coaching",
			text:"Prime Yourself to become Insenely Great Leader",
			text1:"Frost"
		},
	]
	
	const _renderLearnItem = ({item, index}) => {
		return (
			<View style={styles.learnWrapper} >
				<Image 
				style={{
					width:100,
					height:140,
					margin:10,
					borderRadius:10,

				}}
				source={require('../../../assets/img/best_practices_slider_image.png')}/>		
				<View>
					<View >
						<Text style={{fontWeight:'bold', fontSize:18, marginLeft:10, marginTop:10}}>{item.title}</Text>
						<Text style={{ marginLeft:10, width:180, marginTop:10}}>{item.text}</Text>
					</View>
					<View style={{marginTop:40, display:'flex', flexDirection:'row', marginLeft:10 }}>
						<Text>{item.text1}</Text>
						<Ionicons
							name={'book-outline'}
							size={20}
							color="#cccccc"
							style={{marginLeft:100}}
						/>
					</View>
				</View>
					
				
			</View>)
	}

	// Sample data
    const data = [
        { name: 'A', x: 21 },
        { name: 'B', x: 22 },
        { name: 'C', x: -32 },
        { name: 'D', x: -14 },
        { name: 'E', x: -51 },
        { name: 'F', x: 16 },
        { name: 'G', x: 7 },
        { name: 'H', x: -8 },
        { name: 'I', x: 9 },
    ];
	const options = {
		width: 290,
		height: 290,
		margin: {
		  top: 20,
		  left: 20,
		  right: 30,
		  bottom: 20
		},
		r: 150,
		max: 100,
		fill: "#2980B9",
		stroke: "#2980B9",
		animate: {
		  type: 'oneByOne',
		  duration: 200
		},
		label: {
		  fontFamily: 'Arial',
		  fontSize: 14,
		  fontWeight: true,
		  fill: '#34495E'
		}
	  }
	
	return (

		<ScrollView >
			<View style={styles.container}>
				<ImageBackground source={require("../../../assets/img/image.png")}  style={{height:400}}>
					
						<TouchableOpacity
								onPress={() => navigation.navigate('Model', {screen: 'GrowthCoaching'})}>
								<View style={styles.arrow}>
								<Ionicons
									name={'arrow-back'}
									size={50}
									color='white'
									
								/>
								</View>
						</TouchableOpacity>
				
                   
					<View style={styles.icon}>
						<Image source={require("../../../assets/img/Path203.png")}
							style={{
								width:35,
								height:35,
								marginLeft:25,
							}}
						/>
					</View>
					
					<View style={styles.content}>
                    <View style={styles.contentWrapper}>
						<Text style={{fontSize:20, fontWeight:"700", textAlign: 'center',marginTop:50 }}>Growth Leadership Coaching</Text>
						<Text style={styles.paragraph}>
							Mega trends are transformative, global forces that define the futre world with their far reaching impact on business,
							societies, economics, cutures and personal lives. Global Mega Trends to 2030.
							Futurecasting key themes that will shape our futures lives, provides a comprehensive analysis of the transformative,
							global forces that define the future world with their far-reaching impact on business,
							societies, economics, culture and personal lives.
						</Text>
						
						<View style={styles.top}>

							<Text style={{fontWeight:"bold", fontSize:20}}> Events</Text>
							<View style={{
								display:'flex', 
								flexDirection:'row',
							}}>
								<FlatList
									horizontal
									showsHorizontalScrollIndicator={false}
									data={top}
									renderItem={_renderTopItem}/>
							
							</View>
						</View>
						<View style={styles.middle}>
						<Text style={{fontWeight:"bold", fontSize:20}}> Sessions</Text>
						<View style={{
							display:'flex', 
							flexDirection:'row',
						}}>
							<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								data={middle}
								renderItem={_renderMiddleItem}/>

						</View>
						</View>
						<View style={styles.learn}>
						<Text style={{fontWeight:"bold", fontSize:20}}>Self Learn</Text>
						<View style={{
							display:'flex', 
							flexDirection:'row',
						}}>
							<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								data={learn}
								renderItem={_renderLearnItem}/>

						</View>
						</View>
						<View style={styles.radar}>
							<Text style={{fontWeight:"bold", fontSize:20}}>Frost Radar</Text>
							{/* <RadarChart height={500} width={500} 
								outerRadius="80%" data={data}>
								<PolarGrid />
								<PolarAngleAxis dataKey="name" />
								<PolarRadiusAxis />
								<Radar dataKey="x" stroke="green" 
									fill="green" fillOpacity={0.5} />
							</RadarChart> */}
						</View>
						<View style={styles.bottom}>
							<Text style={{fontWeight:"bold" ,fontSize:20}}> Members</Text>
							<View >
								<FlatList
									horizontal
									showsHorizontalScrollIndicator={false}
									data={Data}
									renderItem={_renderItem}/>
							</View>
						</View>

						<View >
							<Text style={{fontWeight:"bold", fontSize:20, marginTop:30, marginLeft:10}}> Growth Coaching Content</Text>
							<View style={{
								display:'flex', 
								flexDirection:'row',
							}}>
								<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								data={pic}
								renderItem={_renderContentItem}/>
							
							</View>
						</View>

                    </View>
					</View>
				</ImageBackground>
			</View>
		</ScrollView>
		
	)
}

export default GrowthDetail

const styles = StyleSheet.create({
	container: {
        ...CommonStyles.container,
		height:2100,	
		
    },
	arrow: {
		marginTop:30,
	},
	icon:{
		width:90,
		height:90, 
		backgroundColor:"white", 
		borderRadius:19, 
		marginLeft:150, 
		marginTop:190, 
		justifyContent:'center', 
		position:'absolute',
		zIndex: 10,
		borderWidth: 0.3,
	},
	content:{
		backgroundColor:"#84e35d", 
		borderRadius: 18, 
		marginTop:150,
	},
	contentWrapper: {
        backgroundColor: 'white',
        borderRadius: 18,
        height: 2000,
		overflow:'scroll',
		marginTop:10

	
    },
	paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize:15,
        lineHeight: 24,
       	margin:20,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
	top:{
		height:190,
		marginTop:10,
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
	middle:{
		height:130,
		margin:10,
		marginTop:30,
		justifyContent:'center',	
	},
	
	middleWrapper:{
		height:90,
		width:230,
		display:'flex',
		flexDirection:'row',
		marginTop:20,
		marginLeft:10,
		borderRadius:20,
		borderWidth:0.5,
	},
	learn:{
		height:180,
		margin:10,
		marginTop:30,
		justifyContent:'center',	
	},
	
	learnWrapper:{
		height:160,
		width:330,
		marginTop:20,
		marginLeft:10,
		borderRadius:20,
		borderWidth:0.5,
		display:'flex',
		flexDirection:'row'
		
	},

	radar:{
		height:350,
		margin:10,
		marginTop:30,
		// backgroundColor:'red'
	},
	bottom:{
		height:190,
		margin:10,
		marginTop:20,
		
	},
	bottomWrapper:{
		width:90,
		height:160,
		borderRadius:20,
		marginRight:10,
		marginTop:10,
		backgroundColor:'white',
		alignItems:'center',
		borderWidth: 0.3,
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
		  height: 1,
		  width: 1
		},

	},
	bottomImage:{
		width:'100%',
		height:100, 
		borderRadius:20, 
	
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
	
	ContentWrapper:{
		height:200,
		width:310,
		marginTop:20,
		marginLeft:10,
		borderRadius:50
	}

})
