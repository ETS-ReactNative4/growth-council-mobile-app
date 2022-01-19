import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const CommunityDetail = props => {
  const {
    navigation,
    route,
    sessionDetails,
    sessionDetailLoading,
    sessionDetailError,
    fetchSessionDetailByIdentifier,
    cleanSessionDetail,
    bestPractices,
    bestPracticeLoading,
    bestPracticeError,
    fetchAllbestPractice,
    cleanbestPractice,
    bestPracticesMemberContents,
    bestPracticesMemberContentLoading,
    bestPracticesMemberContentError,
    fetchAllbestPracticesMemberContent,
    cleanbestPracticesMemberContent,
  } = props;

  useEffect(() => {
    const fetchEventDetailAsync = async () => {
      await fetchSessionDetailByIdentifier(route.params.id);
    };
    fetchEventDetailAsync();
  }, []);

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

  console.log('Mega Best Practices ============', bestPractices);
  console.log('Mega BP Content ============', bestPracticesMemberContents);

  // console.log('route.params.id:::::::::::::::::', route.params.id);
  // console.log('Session Detail:::::::::::::::::', sessionDetails.ID);



  const _renderItem = ({item, index}) => {
    return (
		<View style={[styles.bottomWrapper, styles.shadowProp]}>
			<TouchableOpacity
          onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
			  	<Image source={{uri:item.avatar}}
					style={{
						width: 83,
						height: 83,
						borderRadius:10,
					}}/>
				<View style={{padding:10, paddingBottom:20}}>
					<Text style={{fontSize: 10, fontFamily:Typography.FONT_SF_SEMIBOLD, color:Colors.TERTIARY_TEXT_COLOR}}>{item?.display_name}</Text>
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
		  </TouchableOpacity>
	
	  </View>
    );
  };



  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View style={styles.topWrapper}>
		  <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
			<ImageBackground
			style={{
				width: '100%',
				height: "100%",
				borderRadius: 20,
			}}
			source={require('../../../assets/img/blank_event_design.png')}>
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
				<Text style={styles.headingText2}>
				Hosted by {item?.organizer?.term_name}
				{'  '}
				{item?.organizer?.description}
				</Text>
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
      <View style={styles.contentWrapper2}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          source={item?.uri}
        />
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/image.png')}
          style={{height: 400}}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.arrow}>
              <Ionicons name={'arrow-back'} size={50} color="white" />
            </View>
          </TouchableOpacity> */}

          <View style={styles.icon}>
            <Image
              source={require('../../../assets/img/icon.png')}
              style={{
                width: 45,
                height: 30,
                marginLeft: 20,
              }}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.contentWrapper}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
				  color:"#1E2022",
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                Megatrend Workshop
              </Text>
              <Text style={styles.paragraph}>
                Mega trends are transformative, global forces that define the
                futre world with their far reaching impact on business,
                societies, economics, cutures and personal lives. Global Mega
                Trends to 2030. Futurecasting key themes that will shape our
                futures lives, provides a comprehensive analysis of the
                transformative, global forces that define the future world with
                their far-reaching impact on business, societies, economics,
                culture and personal lives.
              </Text>

              <View style={styles.top}>
                <Text style={styles.title}> Events</Text>
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
              <View style={styles.bottom}>
                <Text style={styles.title}> Members</Text>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={bestPracticesMemberContents.members}
                    renderItem={_renderItem}
                  />
                </View>
              </View>

              <View style={styles.growthContent}>
                <Text
                  style={styles.title}>
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
            </View>
          </View>
        </ImageBackground>
      	</View>
	  	<View style={{ alignItems:'center', width:'35%',marginLeft:140, marginBottom:10}}>
			<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
			<Image 
				source={require('../../../assets/img/fristDigi.png')}
				style={{width:"100%", height:20}}
			/>
		</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    height: 1230,
	backgroundColor:"blue"
  },
  arrow: {
    marginTop: 30,
  },
  title:{
	fontFamily:Typography.FONT_SF_SEMIBOLD,
	fontSize: 14,
	color:Colors.PRIMARY_TEXT_COLOR,
	marginLeft:15, 
  },

  icon: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 19,
    marginLeft: 150,
    marginTop: 190,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderWidth: 0.3,
  },
  content: {
    backgroundColor: 'skyblue',
    borderRadius: 18,
    marginTop: 230,
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderRadius: 18,
    height: 1000,
    overflow: 'scroll',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
	color:'#77838F'
  },
  top: {
	height: 200,
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
	height: 144,
	width: 256,
	marginTop: 20,
	marginLeft: 15,
	borderRadius:20,
  },
  bottom: {
    height: 172,
	marginTop:15,
  },
  bottomWrapper: {
	width:84,
   position:'relative',
    borderRadius: 10,
	marginTop:15,
	marginLeft: 15,
	marginBottom:10,
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
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 5,
    fontWeight: '800',
    color: 'white',
	fontSize:12
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontWeight: '400',
    color: 'white',
	fontSize:8,
  },
 
  growthContent:{
	height: 260,
	marginTop: 20,
	justifyContent: 'center',
	borderRadius: 20,

  },
  contentWrapper2: {
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

export default CommunityDetail;
