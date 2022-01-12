import React, {useEffect} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const BestPractice = props => {
  const {
    navigation,
    bestPractices,
    bestPracticeLoading,
    bestPracticeError,
    fetchAllbestPractice,
    cleanBestPractice,
    bestPracticesMemberContents,
    bestPracticesMemberContentLoading,
    bestPracticesMemberContentError,
    fetchAllbestPracticesMemberContent,
    cleanBestPracticesMemberContent,
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
			<Text style={{fontSize: 10,fontFamily:Typography.FONT_SF_SEMIBOLD, color:Colors.TERTIARY_TEXT_COLOR}}>{item?.display_name}</Text>
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

  const data1 = [
    {
      icon: 'location-arrow',
      text: 'Megatrends Workshop',
    },
  ];

  const _renderMiddleItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CommunityDetail')}>
        <View style={styles.middleWrapper}>
          <View style={styles.middleW}>
            <Font name={item.icon} size={30} color="skyblue" />
          </View>
          <Text style={{marginTop: 10, fontSize: 10}}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View style={styles.topWrapper} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
				width: '100%',
				height: "100%",
				borderRadius: 20,
            }}
            source={require('../../../assets/img/Rectangle1.png')}>
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
              <Text style={styles.headingText2}>Hosted by {item?.organizer?.term_name}</Text>
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
    const fetchAllbestPracticeAsync = async () => {
      await fetchAllbestPractice();
    };
    fetchAllbestPracticeAsync();
  }, []);

  useEffect(() => {
    const fetchAllbestPracticeMemberContentAsync = async () => {
      await fetchAllbestPracticesMemberContent();
    };
    fetchAllbestPracticeMemberContentAsync();
  }, []);

  console.log('Best Practices ============', bestPractices);
  console.log('Members============', bestPracticesMemberContents.term_id);
  console.log('Content ============', bestPracticesMemberContents);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
		<Text style={styles.title}>        
		    {' '}
            Best Practice Events
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={bestPractices}
              renderItem={_renderTopItem}
            />
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={styles.title}>
            Points of Engagement
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data1}
              renderItem={_renderMiddleItem}
            />
          </View>
        </View>

        <View style={styles.bottom}>
			<Text style={styles.title}>
			Growth Community Members
          </Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={bestPracticesMemberContents.members}
              renderItem={_renderItem}
            />
          </View>
        </View>

        <View style={styles.content}>
		<Text style={styles.title}>       
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
              data={bestPracticesMemberContents.pillar_contents}
              renderItem={_renderContentItem}
            />
          </View>
        </View>

		<View style={{ alignItems:'center', width:'50%',marginLeft:100, marginBottom:10}}>
			<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
			<Image 
				source={require('../../../assets/img/fristDigi.png')}
				style={{width:"100%", height:20}}
			/>
		</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
  },
  top: {
	height: 200,
    marginTop: 20,
    justifyContent: 'center',

  },
  title:{
	fontFamily:Typography.FONT_SF_SEMIBOLD,
	fontSize: 14,
	color:Colors.PRIMARY_TEXT_COLOR,
	marginLeft:15, 
  },

  topWrapper: {
	height: 144,
	width: 256,
	marginTop: 20,
	marginLeft: 15,
	borderRadius:20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
  
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 5,
    fontWeight: '800',
    color: 'white',
	fontSize:12
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_MEDIUM,
    fontWeight: '400',
    color: 'white',
	fontSize:8,
  },
  middle: {
    width: 400,
    marginTop: 10,
  },
  middleWrapper: {
    width: 90,
    borderRadius: 20,
    marginTop: 15,
	marginLeft:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
	borderWidth:0.2,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    height: 172,
	marginTop:25,
  },
  bottomWrapper: {
	width:84,
   position:'relative',
    borderRadius: 10,
	marginTop:15,
	marginLeft: 15,
    backgroundColor: 'white',
    overflow:"hidden",
	// borderWidth:0.2,
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
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  content: {
	height: 250,
	marginTop: 20,
	justifyContent: 'center',
	borderRadius: 20,
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

export default BestPractice;
