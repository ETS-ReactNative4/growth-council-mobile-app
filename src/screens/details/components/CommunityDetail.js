import React, {useEffect, useState} from 'react';
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
import Player from '../../dashboard/components/Player';
import {useIsFocused} from '@react-navigation/native';

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

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);

  useEffect(() => {
    const fetchEventDetailAsync = async () => {
      await fetchSessionDetailByIdentifier(route.params.id);
    };
    fetchEventDetailAsync();
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
  }, [isFocused]);

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
          <TouchableOpacity onPress={() => navigation.navigate('People')}>
            <Ionicons name={'add'} size={15} color="#B1AFAF" />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const  data = [
    {
     
      title: 'First Item',
    },
    {
     
      title: 'First Item',
    },
    {
     
      title: 'First Item',
    },
    {
     
      title: 'First Item',
    },
    {
     
      title: 'First Item',
    },
  ];

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      // <TouchableOpacity
      //   onPress={() =>
      //     navigation.navigate('CommunityDetail', {
      //       poeId: item?.term_id,
      //       pillarId: item?.parent,
      //     })
      //   }>
        <View style={styles.middleWrapper}>
          <View style={[styles.middleW, styles.shadowProp]}>
            <Image
               source={require('../../../assets/img/img.png')}
              style={{width: 30, height: 30}}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 10,
              marginHorizontal: 10,
              textAlign: 'center',
              color: '#030303',
            }}>
            {item?.title}
          </Text>
        </View>
      //</TouchableOpacity>
    );
  };


  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);

    let backgroundImage = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case 0:
      case 117:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        break;

      case 0:
      case 118:
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        break;

      default:
        backgroundImage = require('../../../assets/img/Rectangle.png');
    }

    let organizer = item?.organizer?.term_name;
    let description = item?.organizer?.description;
    if (organizer === undefined) {
      organizer = ' ';
    } else {
      organizer = <Text>Hosted By {item?.organizer?.term_name}</Text>;
    }

    if (description === undefined) {
      description = ' ';
    } else {
      description = item?.organizer?.description;
    }
    return (
      <View style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
              width: '100%',
              height: 150,
              borderRadius: 20,
            }}
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
              <Text style={styles.headingText2}>
                {organizer} {description}
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
    let videoLink = link[1].split('&', 2);
    return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  };
  let backgroundColor = '';
  const parent = poeDetails?.parent;
  switch (parent) {
    case 118:
      backgroundColor = Colors.PRACTICE_COLOR;
      break;
    case 117:
      backgroundColor = Colors.COMMUNITY_COLOR;
      break;
    case 119:
      backgroundColor = Colors.COACHING_COLOR;
  }
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
      }}>
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
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <ScrollView
          style={[styles.content, {backgroundColor: backgroundColor}]}>
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

            { poeDetails.slug === '10-growth-processes' &&
              <View style={styles.top}>
                <Text style={styles.title}> Sub Points of Engagement</Text>
                <FlatList
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  data={data}
                  // renderItem={_renderMiddleItem}
                  renderItem={item => _renderMiddleItem(item, navigation)}
                />
              </View>
            }

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
              <Text style={styles.title}> Content Library</Text>
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

            {/* <Footer /> */}
          </View>
        </ScrollView>
      </View>
      {poeDetailLoading && (
        <View
          style={{
            height: Dimensions.get('window').height,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            left: 0,
            right: 0,
          }}>
          <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
    position: 'relative',
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
    marginTop: 200,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    // borderRadius: 18,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentWrapper: {
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
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginTop: 15,
  },
  bottom: {
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
    fontWeight: '600',
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

export default CommunityDetail;
