import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import YoutubePlayer from '../../../shared/youtube';

import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const GrowthDetail = props => {
  const {
    route,
    navigation,
    poeDetails,
    poeDetailLoading,
    poeDetailError,
    fetchAllPOEDetail,
    cleanPOEDetail,
    poeEvents,
    poeEventLoading,
    poeEventError,
    fetchAllPOEEvent,
    cleanPOEEvent,
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
    fetchAllPillarMemberContent,
    cleanPillarMemberContent,

	coachingSession,
	coachingSessionLoading,
	coachingSessionError,
	fetchCoachingSessions,
	cleanCoachingSession
  } = props;

  useEffect(() => {
    const fetchAllPOEDetailAsync = async () => {
      await fetchAllPOEDetail(route.params.poeId);
    };
    fetchAllPOEDetailAsync();
  }, []);

  useEffect(() => {
    const fetchAllPOEEventAsync = async () => {
      await fetchAllPOEEvent(route.params.poeId);
    };
    fetchAllPOEEventAsync();
  }, []);

  useEffect(() => {
    const fetchAllPillarMemberContentAsync = async () => {
      await fetchAllPillarMemberContent(route.params.pillarId);
    };
    fetchAllPillarMemberContentAsync();
  }, []);

  useEffect(()=>{
	  const fetchCoachingSessionAsync = async () =>{
		  await fetchCoachingSessions();
	  };
	  fetchCoachingSessionAsync();
  },[]);

  console.log('POE id:::::::::::::::::', route.params.poeId);
  console.log('parent id:::::::::::::::::', route.params.pillarId);

console.log("session", coachingSession)

  const _renderItem = ({item, index}) => {
    return (
      <View style={[styles.bottomWrapper, styles.shadowProp]}>
        <Image
          source={{uri: item?.avatar}}
          style={{
            width: 83,
            height: 83,
            borderRadius: 10,
          }}
        />
        <View style={{padding: 10, paddingBottom: 20}}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Typography.FONT_SF_SEMIBOLD,
              color: Colors.TERTIARY_TEXT_COLOR,
            }}>
            {item?.display_name}
          </Text>
          <Text style={{fontSize: 6}}>Frost and Sullivan</Text>
        </View>

        <View style={styles.chatIcon}>
          <Ionicons name={'chatbox'} size={10} color="#B1AFAF" />
        </View>
      </View>
    );
  };

  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View style={styles.topWrapper}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          source={require('../../../assets/img/green_blank.png')}>
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
            <Text style={styles.headingText1}>{item?.title}</Text>
            <Text style={styles.headingText2}>
              {' '}
              Hosted by {item?.organizer?.term_name}
              {item?.organizer?.description}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const middle = [
    {
      date: '10',
      month: 'july',
      title: 'SESSION 1',
      text: 'Coach John Roller',
    },
    {
      date: '10',
      month: 'Oct',
      title: 'SESSION 2',
      text: 'Coach John Roller',
    },
  ];

  const _renderMiddleItem = ({item, index}) => {
	const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('coachingSession',{id: item.ID})}>
          <View style={styles.middleWrapper}>
            <View>
              <Text style={{fontWeight: '500', fontSize: 13, margin: 10}}>
                {item?.title}
              </Text>
              <Text style={{marginTop: 10, marginLeft: 10, fontSize: 8}}>
			  {item?.organizer?.term_name} {item?.organizer?.description}
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 50,
                marginTop: 10,
                backgroundColor: '#EBECF0',
                borderRadius: 15,
                marginLeft: 60,
                padding: 5,
                alignItems: 'center',
              }}>
              <Text>{date[1]}</Text>
            <Text>{date[0]}</Text>
            </View>
          </View>
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
    const file = item?.file;
    const link = file.split('=', 2);
    let videolink = link[1].split('&', 2);
    console.log('videoLink === ', videolink);
    return (
      <View style={styles.ContentWrapper}>
        <YoutubePlayer videoId={videolink[0]} />
      </View>
    );
  };

  const learn = [
    {
      title: 'Growth Coaching',
      text: 'Prime Yourself to become Insenely Great Leader',
      text1: 'Frost',
    },
    {
      title: 'Growth Coaching',
      text: 'Prime Yourself to become Insenely Great Leader',
      text1: 'Frost',
    },
  ];

  const _renderLearnItem = ({item, index}) => {
    return (
      <View style={styles.learnWrapper}>
        <Image
          style={{
            width: 72,
            height: 102,
            margin: 10,
            borderRadius: 10,
          }}
          source={require('../../../assets/img/best_practices_slider_image.png')}
        />
        <View>
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 10,
                marginLeft: 10,
                marginTop: 10,
              }}>
              {item.title}
            </Text>
            <Text
              style={{marginLeft: 10, width: 80, marginTop: 10, fontSize: 8}}>
              {item.text}
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 10,
              fontSize: 8,
            }}>
            <Ionicons
              name={'book-outline'}
              size={12}
              color="#cccccc"
              style={{right: 0, marginLeft: 80}}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: poeDetails?.pillar_detail_image}}
          style={{height: 400}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.arrow}>
              <Ionicons name={'arrow-back'} size={50} color="white" />
            </View>
          </TouchableOpacity>

          <View style={styles.icon}>
            <Image
              source={{uri: poeDetails?.image}}
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.contentWrapper}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#1E2022',
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                Growth Leadership Coaching
              </Text>
              {poeEventLoading && (
                <>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      position: 'absolute',
                      zIndex: 1011,
                      top: 120,
                      left: 150,
                    }}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={80}
                    />
                  </View>
                </>
              )}
              <Text style={styles.paragraph}>{poeDetails.description}</Text>

              {/* <View style={styles.top}>
                <Text style={styles.title}> Growth Coaching Events</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={poeEvents}
                    renderItem={_renderTopItem}
                  />
                </View>
              </View> */}
              <View style={styles.middle}>
                <Text style={styles.title}>Sessions</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={coachingSession}
                    renderItem={_renderMiddleItem}
                  />
                </View>
              </View>
              <View style={styles.learn}>
                <Text style={styles.title}>Self Learn</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={learn}
                    renderItem={_renderLearnItem}
                  />
                </View>
              </View>

              <View style={styles.bottom}>
                <Text style={styles.title}> Members</Text>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={pillarMemberContents.members}
                    renderItem={_renderItem}
                  />
                </View>
              </View>

              <View style={styles.growthContent}>
                <Text style={styles.title}> Growth Coaching Content</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={pillarMemberContents?.pillar_contents}
                    renderItem={_renderContentItem}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '35%',
          marginLeft: 140,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
        <Image
          source={require('../../../assets/img/fristDigi.png')}
          style={{width: '100%', height: 20}}
        />
      </View>
    </ScrollView>
  );
};

export default GrowthDetail;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    height: 1350,
  },
  arrow: {
    marginTop: 30,
  },
  icon: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 19,
    marginLeft: 150,
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderWidth: 0.3,
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
  },

  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginTop: 150,
    borderTopWidth: 10,
    borderColor: Colors.COACHING_COLOR,
  },
    contentWrapper: {
      borderRadius: 18,
   backgroundColor:"white",
      overflow: 'scroll',
      marginTop: 10,
	  height: 1400,
    },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    margin: 10,
    textAlign: 'left',
    color: '#77838F',
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
    borderRadius: 20,
  },
  middle: {
    height: 130,
    marginTop: 10,
    justifyContent: 'center',
  },
  middleWrapper: {
    height: 68,
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 14,
    borderWidth: 0.5,
  },
  learn: {
    height: 140,
    marginTop: 10,
    justifyContent: 'center',
  },
  learnWrapper: {
    height: 118,
    width: 224,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
  },
  radar: {
    height: 350,
    margin: 10,
    marginTop: 30,
  },
  bottom: {
    height: 172,
    marginTop: 25,
  },
  bottomWrapper: {
    width: 84,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  chatIcon: {
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
    padding: 6,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
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
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },
  growthContent: {
    height: 260,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  ContentWrapper: {
    height: 206,
    width: 364,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
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
});
