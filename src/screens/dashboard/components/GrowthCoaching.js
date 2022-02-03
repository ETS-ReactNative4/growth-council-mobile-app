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
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';

import {CommonStyles, Colors, Typography} from '../../../theme';

const GrowthCoaching = props => {
  const {
    route,
    navigation,
    pillarEvents,
    pillarEventLoading,
    pillarEventError,
    fetchAllPillarEvent,
    cleanPillarEvent,
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
    fetchAllPillarMemberContent,
    cleanPillarMemberContent,
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,
  } = props;

  const pillarId = 119;
  useEffect(() => {
    const fetchAllPillarPOEAsync = async () => {
      await fetchAllPillarPOE(pillarId);
    };
    fetchAllPillarPOEAsync();
    return () => {
      cleanPillarPOE();
    };
  }, []);

  useEffect(() => {
    const fetchAllPillarEventAsync = async () => {
      await fetchAllPillarEvent(pillarId);
    };
    fetchAllPillarEventAsync();
    return () => {
      cleanPillarEvent();
    };
  }, []);

  useEffect(() => {
    const fetchAllPillarMemberContentAsync = async () => {
      await fetchAllPillarMemberContent(pillarId);
    };
    fetchAllPillarMemberContentAsync();
  }, []);

  console.log('Coaching pillar_id', pillarId);
  console.log({pillarMemberContents});

  // console.log('Growth Coaching =========', growthCoachings);
  // console.log('Member================', growthCoachingMemberContents);

  const _renderItem = ({item, index}, navigation) => {
    return (
      <View style={[styles.bottomWrapper, styles.shadowProp]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
          <Image
            source={{uri: item.avatar}}
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
        </TouchableOpacity>

        <View style={styles.chatIcon}>
          <Ionicons name={'chatbox'} size={10} color="#B1AFAF" />
        </View>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GrowthDetail', {
            poeId: item?.term_id,
            pillarId: item?.parent,
			
          })
        }>
        <View style={styles.middleWrapper}>
          <View style={[styles.middleW, styles.shadowProp]}>
            <Image
              source={{uri: item?.image}}
              style={{width: 25, height: 25}}
            />
          </View>
          <Text style={{marginTop: 10, fontSize: 10, marginLeft: 5}}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderTopItem = ({item, index}, navigation) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    return (
      <View style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
            source={require('../../../assets/img/Rectangle.png')}>
            <View
              style={{
                width: 40,
                height: 50,
                marginTop: 10,
                marginLeft: 200,
                backgroundColor: '#EBECF0',
                borderRadius: 14,
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
    const file = item?.file;
    const link = file.split('=', 2);
    let videolink = link[1].split('&', 2);
    return (
      <View style={styles.ContentWrapper}>
        <YoutubePlayer videoId={videolink[0]} />
      </View>
    );
  };

  return (
    <ScrollView>
      {/* <StatusBar barStyle="light-content" hidden = {false} backgroundColor = {require('../../../assets/img/Rectangle.png')} translucent = {true}/> */}

      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}> Growth Coaching Events</Text>
          {pillarEventLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60} />
            </View>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pillarEvents}
              //renderItem={_renderTopItem}
              renderItem={item => _renderTopItem(item, navigation)}
            />
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={styles.title}>Points of Engagement</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pillarPOEs}
              //renderItem={_renderMiddleItem}
              renderItem={item => _renderMiddleItem(item, navigation)}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>Growth Coaching Members</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pillarMemberContents.members}
              // renderItem={_renderItem}
              renderItem={item => _renderItem(item, navigation)}
            />
          </View>
        </View>

        <View style={styles.content}>
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
        <Footer />
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
    marginTop: 25,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
  },

  topWrapper: {
    height: 144,
    width: 256,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 5,
    fontWeight: '600',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_MEDIUM,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },
  middle: {
    width: 400,
    marginTop: 10,
  },
  middleWrapper: {
    width: 80,
    borderRadius: 20,
    marginTop: 15,
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
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
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
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    // borderWidth:0.2,
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
  content: {
    height: 250,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  ContentWrapper: {
    height: 206,
    width: Platform.OS === 'ios' ? 330 : 364,
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
  loading1: {
    marginLeft: 150,
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default GrowthCoaching;
