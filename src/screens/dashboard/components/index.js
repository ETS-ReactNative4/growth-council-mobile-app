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
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';

import {CommonStyles, Colors, Typography} from '../../../theme';

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
  } = props;

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.bottomWrapper}>
        <Image
          source={{uri: item.avatar}}
          style={{
            width: '90%',
            height: 80,
            marginTop: 6,
            borderRadius: 20,
          }}
        />
        <Text style={{fontSize: 11, marginTop: 8}}>{item?.display_name}</Text>
        <Text style={{fontSize: 8}}>Frost and Sullivan</Text>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#EBECF0',
            width: 25,
            height: 23,
            justifyContent: 'center',
            marginLeft: 40,
            marginTop: 5,
          }}>
          <Ionicons
            name={'chatbox'}
            size={17}
            color="grey"
            style={{marginLeft: 3}}
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
      <View style={styles.middleWrapper}>
        <View style={styles.middleW}>
          <Font name={item.icon} size={40} color="skyblue" />
        </View>
        <Text style={{marginTop: 10}}>{item.text}</Text>
      </View>
    );
  };

  const _renderTopItem = ({item, index}, navigation) => {
    const actualDate = moment('20111031').format('ll');
    const date = actualDate.split(' ', 4);
    const day = date[1].split(',', 3);

    return (
      <View key={index} style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          {item?.pillar_categories[0]?.slug === 'growth-community' && (
            <ImageBackground
              style={{width: '100%', height: 170, borderRadius: 20}}
              source={require('../../../assets/img/blank_event_design.png')}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                  marginTop: 10,
                  marginLeft: 200,
                  backgroundColor: '#EBECF0',
                  borderRadius: 10,
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text>{day[0]}</Text>
                <Text>{date[0]}</Text>
              </View>

              <View style={styles.header}>
                <Text style={styles.headingText1}>{item.title}</Text>
                <Text style={styles.headingText2}>
                  Hosted by {item?.organizer?.term_name}{' '}
                </Text>
                <Text style={styles.headingText2}>
                  {item?.organizer?.description}
                </Text>
              </View>
            </ImageBackground>
          )}
          {item?.pillar_categories[0]?.slug === 'basic-practices' ? (
            <ImageBackground
              style={{width: '100%', height: 170, borderRadius: 20}}
              source={require('../../../assets/img/blue_blank.png')}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                  marginTop: 10,
                  marginLeft: 200,
                  backgroundColor: '#EBECF0',
                  borderRadius: 10,
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text>{day[0]}</Text>
                <Text>{date[0]}</Text>
              </View>

              <View style={styles.header}>
                <Text style={styles.headingText1}>{item.title}</Text>
                <Text style={styles.headingText2}>
                  Hosted by {item?.organizer?.term_name}{' '}
                </Text>
                <Text style={styles.headingText2}>
                  {item?.organizer?.description}
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <ImageBackground
              style={{width: '100%', height: 170, borderRadius: 20}}
              source={require('../../../assets/img/green_blank.png')}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                  marginTop: 10,
                  marginLeft: 200,
                  backgroundColor: '#EBECF0',
                  borderRadius: 10,
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text>{day[0]}</Text>
                <Text>{date[0]}</Text>
              </View>

              <View style={styles.header}>
                <Text style={styles.headingText1}>{item.title}</Text>
                <Text style={styles.headingText2}>
                  Hosted by {item?.organizer?.term_name}{' '}
                </Text>
                <Text style={styles.headingText2}>
                  {item?.organizer?.description}
                </Text>
              </View>
            </ImageBackground>
          )}
        </TouchableOpacity>
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

  console.log('Events ============== ', upcomingEvents);

  const API_KEY = 'AIzaSyCIrwNfePDp3TOeOVUpVe59FjBQ_x9M6GM';

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: 180}}
          source={require('../../../assets/img/blank_event_design.png')}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.ImageWrapper}>
              <Image
                source={require('../../../assets/img/massk.png')}
                style={styles.ImageStyle}
              />
            </View>

            <View style={styles.ImageWrapper1}>
              <Image
                source={require('../../../assets/img/community_slider_image.png')}
                style={styles.ImageStyle}
              />
            </View>

            <View style={styles.ImageWrapper2}>
              <Image
                source={require('../../../assets/img/massk.png')}
                style={styles.ImageStyle}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.top}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Upcoming Events
          </Text>
          <Text style={{fontSize: 12, marginTop: 8, marginLeft: 180}}>
            View all
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
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

      <View style={styles.middle}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Points of Engagement
          </Text>
          <Text style={{fontSize: 12, marginTop: 8, marginLeft: 140}}>
            View all
          </Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data1}
            renderItem={_renderMiddleItem}
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {' '}
            Growth Community Member
          </Text>
          <Text style={{fontSize: 12, marginTop: 8, marginLeft: 85}}>
            View all
          </Text>
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
        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20}}>
          Growth Coaching Content
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}></View>
      </View>

      {/* <YouTube
        apiKey={API_KEY}
        videoId="wKQH_iemSvs" // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        style={{alignSelf: 'stretch', height: 300}}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    width: '100%',
  },
  ImageWrapper: {
    position: 'absolute',
    top: 80,
    height: 160,
    width: '30%',
    left: 10,
    borderRadius: 20,
    backgroundColor: '#2a9df4',
  },
  ImageWrapper1: {
    position: 'absolute',
    top: 80,
    height: 160,
    width: '30%',
    left: 140,
    borderRadius: 20,
    backgroundColor: '#ADD8E6',
  },
  ImageWrapper2: {
    position: 'absolute',
    top: 80,
    height: 160,
    width: '30%',
    right: 10,
    borderRadius: 20,
    backgroundColor: '#90EE90',
  },
  ImageStyle: {
    height: 150,
    width: '90%',
    margin: 5,
    borderRadius: 10,
  },
  top: {
    height: 200,
    marginTop: 80,
    margin: 10,
    justifyContent: 'center',
  },

  topWrapper: {
    height: 170,
    width: 300,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 60,
  },
  header: {
    marginLeft: 10,
  },
  headingText1: {
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 20,
    fontWeight: '800',
    width: '98%',
    color: 'white',
    fontSize: 16,
  },
  headingText2: {
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.SECONDARY_HEADING_COLOR,
    fontWeight: '700',
    color: 'white',
    fontSize: 10,
    lineHeight: 12,
  },
  middle: {
    width: 400,
    height: 200,
    marginLeft: 10,
    marginTop: 15,
  },
  middleWrapper: {
    height: 150,
    width: 100,
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
    height: 200,
    margin: 10,
  },
  bottomWrapper: {
    width: 90,
    height: 170,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Dashboard;
