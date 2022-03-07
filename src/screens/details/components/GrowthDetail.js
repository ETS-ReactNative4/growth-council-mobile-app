import React, {useEffect, useState} from 'react';
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
import Footer from '../../../shared/footer';
import Player from '../../dashboard/components/Player';
import {useIsFocused} from '@react-navigation/native';

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
    cleanCoachingSession,
    poeSelfLearns,
    poeSelfLearnLoading,
    poeSelfLearnError,
    fetchPoeSelfLearn,
    cleanPoeSelfLearn,
  } = props;

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);

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
  }, [isFocused]);

  useEffect(() => {
    const fetchCoachingSessionAsync = async () => {
      await fetchCoachingSessions(route.params.poeId);
    };
    fetchCoachingSessionAsync();
  }, []);

  useEffect(() => {
    const fetchPoeSelfLearnAsync = async () => {
      await fetchPoeSelfLearn(route.params.poeId);
    };
    fetchPoeSelfLearnAsync();
  }, []);

  useEffect(() => {
    setMemberConnection(pillarMemberContents);
  }, [pillarMemberContents]);

  const connectMemberByMemberID = async (memberID, index) => {
    const response = await connectMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...memberConnection];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setMemberConnection(items);
      ToastMessage.show('You have successfully connected.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
    console.log(response);
  };

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
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 6}}>Frost and Sullivan</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.chatIcon}>
		{!memberConnection[index]?.connection && (
            <TouchableOpacity onPress={() => navigation.navigate('People')}>
              <Ionicons name="add-circle" size={20} color="#B2B3B9" />
            </TouchableOpacity>
          )}
          {memberConnection[index]?.connection && (
            <Material
              name="check-circle"
              size={20}
              color="#14A2E2"
              style={{marginTop: 25}}
            />
          )}
        </View> */}
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

  const _renderMiddleItem = ({item, index}) => {
    const actualDate = moment(item?.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('coachingSession', {
              id: item.ID,
              sessionId: item?.ID,
            })
          }>
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
                right: 5,
                padding: 5,
                position: 'absolute',
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

  const _renderContentItem = ({item, index}) => {
    const file = item?.file;
    const link = file.split('=', 2);
    let videoLink = link[1].split('&', 2);
    return(
		<Player {...props}
		item={item}
		file={file}
		videoLink={videoLink}/>
    );
  };

  const _renderLearnItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('selflearn', {
              id: item.ID,
              selfLearnId: item?.ID,
            })
          }>
          <View style={styles.learnWrapper}>
            <Image
              source={{uri: item?.image}}
              style={{
                width: 72,
                height: 102,
                margin: 10,
                borderRadius: 10,
              }}
            />
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    width: 100,
                  }}>
                  {item?.title}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    width: 100,
                    marginTop: 10,
                    fontSize: 8,
                  }}></Text>
              </View>
              {/* <View
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
					</View> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: poeDetails?.pillar_detail_image}}
          style={{height: 240, width: '100%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.arrow}>
              <Ionicons name={'arrow-back'} size={50} color="white" />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <View style={[styles.icon, styles.shadowProp]}>
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

        <ScrollView style={styles.content}>
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
                {coachingSessionLoading && (
                  <>
                    <View
                      style={{
                        top: 0,
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
                  data={poeSelfLearns}
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
          </View>
        </ScrollView>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default GrowthDetail;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 30,
  },
  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
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
    borderTopWidth: 10,
    borderColor: Colors.COACHING_COLOR,
  },
  contentWrapper: {
    borderRadius: 18,
    backgroundColor: 'white',
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
  middle: {
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
    borderWidth: 1.3,
	borderColor:"#9EBD6D"
  },
  learn: {
    height: 140,
    marginTop: 30,
    justifyContent: 'center',
  },
  learnWrapper: {
    height: 118,
    width: 224,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 10,
    borderWidth: 1.3,
    display: 'flex',
    flexDirection: 'row',
	borderColor:"#9EBD6D"
  },
  radar: {
    height: 350,
    margin: 10,
    marginTop: 30,
  },
  bottom: {
    marginTop: 25,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    marginBottom: 5,
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
