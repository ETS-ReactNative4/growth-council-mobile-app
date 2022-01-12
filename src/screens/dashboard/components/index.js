import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import PillarList from './PillarList';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';

import {CommonStyles, Colors, Typography} from '../../../theme';
import { COACHING_COLOR, COMMUNITY_COLOR, PRACTICE_COLOR, PRIMARY_BACKGROUND_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR,TERTIARY_TEXT_COLOR } from '../../../theme/colors';

const Dashboard = props => {
  const {
    navigation,
    upcomingEvents,
    upcomingEventLoading,
    upcomingEventError,
    fetchAllUpcomingEvent,
    cleanUpcomingEvent,
    pointOfEngagements,
    pointOfEngagementLoading,
    pointOfEngagementError,
    fetchAllPointOfEngagement,
    cleanPointOfEngagement,
    communityMembers,
    communityMemberLoading,
    communityMemberError,
    fetchAllCommunityMember,
    cleanCommunityMember,
	pillarSliders,
	pillarSliderLoading,
	pillarSliderError,
	fetchAllPillarSlider,
	cleanPillarSlider,
	
  } = props;




  const _renderItem = ({item, index}) => {
	return (
	  <View style={[styles.bottomWrapper, styles.shadowProp]}>
		<Image source={{uri:item.avatar}}
			style={{
				width: 83,
				height: 83,
				borderRadius:10,
			}}/>
		<View style={{padding:10, paddingBottom:20}}>
			<Text style={{fontSize: 10, fontFamily: Typography.FONT_SF_SEMIBOLD,color:TERTIARY_TEXT_COLOR}}>{item?.display_name}</Text>
			<Text style={{fontSize: 6}}>Frost and Sullivan</Text>
		</View>
		
		<View
		  style={styles.chatIcon}>
		  <Ionicons
			name={'chatbox'}
			size={10}
			color="#B1AFAF"
		
		
		  />
		</View>
	  </View>
	);
  };
  
//   const data1 = [
// 	{
// 	  icon: 'location-arrow',
// 	  text: 'Megatrends Workshop',
// 	},
//   ];
  
//   const _renderMiddleItem = ({item, index}) => {
// 	return (
// 	  <View style={styles.middleWrapper}>
// 		<View style={styles.middleW}>
// 		  <Font name={item.icon} size={40} color="skyblue" />
// 		</View>
// 		<Text style={{marginTop: 10}}>{item.text}</Text>
// 	  </View>
// 	);
//   };
  
  
  
  const _renderTopItem = ({item, index}, navigation) => {
	const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

		let backgroundImage = ""
		switch(item?.pillar_categories[0]?.slug ){
			case "growth-community":
				backgroundImage=(require('../../../assets/img/Rectangle2.png'))
				break;
			case "basic-practices":
				backgroundImage=(require('../../../assets/img/Rectangle1.png'))
				break;
			default:
				backgroundImage=(require('../../../assets/img/Rectangle.png'))
		}

	  return (	
		<View key={index} style={styles.topWrapper}>
		<TouchableOpacity
		  onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
		
		  <ImageBackground
			style={{width:'100%',height:150, borderRadius:20,}}
			source={backgroundImage}>
				
			<View
			  style={{
				width: 40,
				height: 50,
				marginTop: 10,
				marginLeft: 200,
				backgroundColor: '#EBECF0',
				borderRadius: 10,
				padding: 5,
				alignItems: 'center',
			  }}>
			  <Text>{date[1]}</Text>
			  <Text>{date[0]}</Text>
			</View>
  
			<View style={styles.header}>
			  <Text style={styles.headingText1}>{item.title}</Text>
			  <Text style={styles.headingText2}>Hosted by {item?.organizer?.term_name} </Text>
			  <Text style={styles.headingText2}>{item?.organizer?.description}</Text>
			</View>
		  </ImageBackground>
		 
		</TouchableOpacity>
	  </View>
		
	  );
  };
  
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
      <View style={styles.ContentWrapper}>
        <ImageBackground
          style={{
            width: '100%',
            height:"100%",
          }}
          source={item?.uri}
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchAllUpcomingEventAsync = async () => {
      await fetchAllUpcomingEvent();
    };
    fetchAllUpcomingEventAsync();
  }, []);

  useEffect(() => {
    const fetchAllCommunityMemberAsync = async () => {
      await fetchAllCommunityMember();
    };
    fetchAllCommunityMemberAsync();
  }, []);

  useEffect(()=>{
	  const fetchPillarSliderAsync= async () =>{
		  await fetchAllPillarSlider();
	  }
	  fetchPillarSliderAsync();
  },[]);



  const API_KEY = 'AIzaSyCIrwNfePDp3TOeOVUpVe59FjBQ_x9M6GM';

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: 180}}
          source={require('../../../assets/img/appBG.png')}>
          <View style={styles.pillar}>
			  
			  <PillarList pillarSliders={pillarSliders} navigation={navigation}/>
			
          </View>
        </ImageBackground>
      </View>

      <View style={styles.top}>
		  <View style={styles.eventWrapper}>
		  <Text style={styles.title}>Upcoming Events</Text>
		  <TouchableOpacity
		  onPress={() => navigation.navigate('UpcomingView')}>
			   <Text style={styles.viewAll}>View all</Text>
		  </TouchableOpacity>
		 
		  </View>
      
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
			marginTop:20
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={upcomingEvents}
            renderItem={item => _renderTopItem(item, navigation)}
            //renderItem={_renderTopItem}
          />
        </View>
      </View>

      {/* <View style={styles.middle}>
	  	<View style={{display:"flex", flexDirection:"row"}}>
		  <Text style={{fontWeight: 'bold', fontSize: 12}}>Points of Engagement</Text>
		 
		</View>
    
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data1}
            renderItem={_renderMiddleItem}
          />
        </View>
      </View> */}

      <View style={styles.bottom}>
	  <View style={{display:"flex", flexDirection:"row", marginLeft:15, marginRight:15}}>
		  <Text style={styles.title}> Growth Community Member</Text>
		  {/* <Text style={{ fontSize: 12, marginTop:8,marginLeft:85}}>View all</Text> */}
		</View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={communityMembers}
            renderItem={_renderItem}
          />
        </View>
      </View>

	  <View style={styles.content}>
          <Text style={[styles.title,{marginLeft:15,}]}>
            {' '}
            Growth Coaching Content
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pic}
              renderItem={_renderContentItem}
            />
        </View>

		
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    width: '100%',
  },
  pillar:{
	display: 'flex',
	flexDirection:"row",
	marginLeft:10,
	 marginRight:10, 
	 marginTop:70,
	 justifyContent:"space-between"
  },
  ImageWrapper: {
	width:120,
    height: 172,
	borderRadius: 10,
   borderWidth: 4,
   borderColor:PRIMARY_BACKGROUND_COLOR,
	overflow:"hidden"
	
  },
  ImageStyle: {
	width:'100%',
    height:'100%',
	
  },
  viewAll:{
	fontSize: 10,
	color:SECONDARY_TEXT_COLOR
  },
  eventWrapper:{
	display:"flex", 
	flexDirection:"row", 
	justifyContent:"space-between",
	alignItems:"center", 
	marginLeft:15, 
	marginRight:15
  },
  top: {
    height: 200,
    marginTop: 80,
    justifyContent: 'center',
	marginLeft:5
  },

  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
	borderRadius:16,
	overflow:"hidden"
  },
  header: {
    marginLeft: 10,
  },
  title:{	
	fontSize: 14,
	fontFamily:Typography.FONT_SF_SEMIBOLD,
	color:PRIMARY_TEXT_COLOR
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 20,
    fontWeight: '700',
	width:"98%",
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.SECONDARY_HEADING_COLOR,
    fontWeight: '700',
    color: 'white',
	fontSize:8,
	lineHeight: 12,

  },
  middle: {
    width: 400,
    height: 200,
    marginLeft: 10,
    marginTop: 15,
  },
  middleWrapper: {
    height: 64,
    width: 112,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    height: 172,
	margin:5,
	marginTop:25,
  },
  bottomWrapper: {
	  width:84,
   	position:'relative',
    borderRadius: 10,
	marginTop:15,
	marginLeft: 15,
    backgroundColor: 'white',
    overflow:"hidden"
  },
  chatIcon:{
	borderRadius: 50,
	backgroundColor: '#F1F1F1',
	padding:6,
	justifyContent: 'center',
	position:'absolute',
	right:4,
	bottom:4
  },
  content: {
	height: 250,
	marginLeft: 5,
	marginTop:25,
	justifyContent: 'center',
	borderRadius: 20,
	marginBottom:10,
},
ContentWrapper: {
	height: 206,
	width: 364,
	marginTop: 20,
	marginLeft: 15,
   borderRadius:20,
   overflow:"hidden"
},
shadowProp: {
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,

	elevation: 5,
  },
 
});

export default Dashboard;
