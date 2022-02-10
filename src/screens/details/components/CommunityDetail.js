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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';

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
  } = props;

  useEffect(() => {
    const fetchEventDetailAsync = async () => {
      await fetchSessionDetailByIdentifier(route.params.id);
    };
    fetchEventDetailAsync();
  }, []);

  useEffect(() => {
    const fetchAllbestPracticeMemberContentAsync = async () => {
      await fetchAllbestPracticesMemberContent();
    };
    fetchAllbestPracticeMemberContentAsync();
  }, []);

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

  const _renderItem = ({item, index}, navigation) => {
    return (
      <View style={[styles.bottomWrapper, styles.shadowProp]} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: '100%',
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
          <TouchableOpacity onPress={() => navigation.navigate('People')}>
            <Ionicons name={'add'} size={15} color="#B1AFAF" />
          </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
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
                width: 30,
                height: 30,
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
                {poeDetails.name}
              </Text>

              <Text style={styles.paragraph}>{poeDetails.description}</Text>

              <View style={styles.top}>
                <Text style={styles.title}> Events</Text>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {poeDetailLoading && (
                    <>
                      <View
                        style={{
                          top: 10,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          zIndex: 1011,
                        }}>
                        <BubblesLoader
                          color={Colors.SECONDARY_TEXT_COLOR}
                          size={80}
                        />
                      </View>
                    </>
                  )}
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={poeEvents}
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
                    data={pillarMemberContents?.members}
                    renderItem={item => _renderItem(item, navigation)}
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

              <Footer />
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
    height: 1300,
  },
  arrow: {
    marginTop: 30,
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
  },

  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginLeft: Platform.OS === 'ios' ? 120 : 155,
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderWidth: 0.3,
  },
  content: {
    backgroundColor: 'skyblue',
    borderRadius: 18,
    marginTop: 150,
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderRadius: 18,
    height: 1300,
    overflow: 'scroll',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
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
  bottom: {
    height: 172,
    marginTop: 15,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  chatIcon: {
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
    padding: 2,
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
    marginTop: 5,
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

export default CommunityDetail;
