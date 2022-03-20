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
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BubblesLoader} from 'react-native-indicator';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialIcons';
import PillarList from './PillarList';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import Player from './Player';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const Dashboard = props => {
  const {
    navigation,
    upcomingEvents,
    upcomingEventLoading,
    upcomingEventError,
    fetchAllUpcomingEvent,
    cleanUpcomingEvent,
    poes,
    poeLoading,
    poeError,
    fetchAllPOE,
    cleanPOE,
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
    pillarEventLists,
    pillarEventLoading,
    pillarEventError,
    fetchAllPillarEvent,
    cleanPillarEvent,
    contentSlider,

    latestContent,
    latestContentLoading,
    latestContentError,
    fetchLatestContent,
    cleanLatestContent,
  } = props;

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);

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

    return () => {
      cleanCommunityMember();
    };
  }, [isFocused]);

  useEffect(() => {
    const fetchPillarSliderAsync = async () => {
      await fetchAllPillarSlider();
    };
    fetchPillarSliderAsync();
  }, []);

  useEffect(() => {
    const fetchAllPOEAsync = async () => {
      await fetchAllPOE();
    };
    fetchAllPOEAsync();
  }, []);

  useEffect(() => {
    setMemberConnection(communityMembers);
  }, [communityMembers]);

  useEffect(() => {
    const fetchLatestContentAsync = async () => {
      await fetchLatestContent();
    };
    fetchLatestContentAsync();
  }, []);

  console.log({latestContent});

  const _renderItem = ({item, index}) => {
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
                color: '#030303',
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 6, color: '#030303'}}>
              Frost and Sullivan
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.chatIcon}>
          {!memberConnection[index]?.connection && (
            <TouchableOpacity onPress={() => navigation.navigate('People')}>
              <Ionicons name="add-circle" size={20} color="#B2B3B9" />
            </TouchableOpacity>
          )}
          {memberConnection[index]?.connection && (
            <Material name="check-circle" size={20} color="#14A2E2" />
          )}
        </View>
      </View>
    );
  };

  //   const _renderMiddleItem = ({item, index}) => {
  //     let poePage = 'CommunityDetail';
  //     if (item?.parent === 119) {
  //       //   poePage = 'GrowthDetail';
  //       if (item?.slug === 'growth-leadership-coaching') {
  //         poePage = 'GrowthDetail';
  //       } else {
  //         poePage = 'CommunityDetail';
  //       }
  //     }
  //     return (
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate(poePage, {
  //             poeId: item?.term_id,
  //             pillarId: item?.parent,
  //           })
  //         }>
  //         <View style={styles.middleWrapper}>
  //           <View style={[styles.middleW, styles.shadowProp]}>
  //             <Image
  //               source={{uri: item?.image}}
  //               style={{width: 30, height: 30}}
  //             />
  //           </View>
  //           <Text
  //             style={{
  //               marginTop: 10,
  //               fontSize: 10,
  //               marginHorizontal: 10,
  //               textAlign: 'center',
  //               color: '#222B45',
  //             }}>
  //             {item?.name}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   };

  const _renderContent = ({item, index}) => {
	  const date = moment(item?.post_modified).format('D/MM/yyyy');
    return (
      
        <View style={[styles.middleWrapper, styles.shadowContent]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '70%', margin: 10}}>
              <Text style={{fontSize: 12, color: '#041C3E'}}>
                {item.post_name}
              </Text>
            </View>
            <View style={styles.middleW}>
              <FontAwesome5 name="file-pdf" size={20} color="#9B9CA0" />
              <Text style={{fontSize: 8, marginTop: 2}}>View</Text>
            </View>
          </View>
		  <TouchableOpacity
        onPress={() => navigation.navigate('ContentLibraryDetail',{id:item?.ID})}>
			<View style={styles.middleWrap}>
            <Text style={{color: 'white', fontSize: 10}}>View</Text>
          </View>
		</TouchableOpacity>
          

          <View style={styles.contentTime}>
            <Text style={{fontSize: 7}}>
              Published on: {date}
            </Text>
          </View>
        </View>
    );
  };

  const _renderTopItem = ({item, index}, navigation) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    let backgroundImage = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case 117:
      case 0:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        break;
      case 118:
      case 0:
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
      <View key={index} style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{width: '100%', height: 150, borderRadius: 20}}
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
              <Text style={{color: '#030303'}}>{date[1]}</Text>
              <Text style={{color: '#030303'}}>{date[0]}</Text>
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

  //   const _renderContentItem = ({item, index}) => {
  //     const file = item?.file;
  //     const link = file.split('=', 2);
  //     let videoLink = link[1].split('&', 2);

  //     return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  //   };

  const issue = [
    {
      image: require('../../../assets/img/geographi.png'),
      text: 'Strategic Planning for 2030 and Beyond',
    },
    {
      image: require('../../../assets/img/Sel-Serve-Icon.png'),
      text: 'The War for Talent',
    },
    {
      image: require('../../../assets/img/business-process-outsourcing.png'),
      text: 'Integrating New Disruptive Technologies into Your Innovation Portfolio',
    },
    {
      image: require('../../../assets/img/Research-frost.png'),
      text: 'Go-To-Market Strategy',
    },
    {
      image: require('../../../assets/img/discussion-guides.png'),
      text: 'Integrating New Disruptive Technologies into Your Innovation Portfolio',
    },
    {
      image: require('../../../assets/img/data-insights.png'),
      text: 'Go-To-Market Strategy',
    },
  ];

  const _renderCritical = ({item, index}) => {
    return (
      <View
        style={{
          width: 170,
          marginLeft: 10,
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={[styles.criticalW, styles.shadowCritical]}>
            <Image source={item?.image} style={{width: 38, height: 38}} />
          </View>
          <Text
            style={{
              fontSize: 10,
              width: '70%',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor={require('../../../assets/img/appBG.png')}
        translucent={true}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <ImageBackground
            style={{width: '100%', height: 180}}
            source={require('../../../assets/img/appBG.png')}>
            <View style={styles.pillar}>
              <PillarList
                pillarSliders={pillarSliders}
                navigation={navigation}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.top}>
          <View style={styles.eventWrapper}>
            <Text style={styles.title}>Upcoming Events</Text>
          </View>

          {upcomingEventLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={upcomingEvents}
              renderItem={item => _renderTopItem(item, navigation)}
            />
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={[styles.title, {marginLeft: 15}]}>Latest Content</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={latestContent}
            renderItem={_renderContent}
          />
        </View>

        <View style={styles.bottom}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 15,
              marginRight: 15,
            }}>
            <Text style={styles.title}>Welcome New Members</Text>
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
          <Text style={styles.title}>Critical Issue</Text>
          <View>
            <FlatList
              contentContainerStyle={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              showsHorizontalScrollIndicator={false}
              data={issue}
              renderItem={_renderCritical}
            />
          </View>
        </View>

        <Footer />
      </ScrollView>
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
    paddingBottom: 100,
  },
  pillar: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 65 : 50,
    justifyContent: 'space-between',
  },

  viewAll: {
    fontSize: 10,
    color: SECONDARY_TEXT_COLOR,
  },
  eventWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  top: {
    height: 200,
    marginTop: 60,
    justifyContent: 'center',
    marginLeft: 5,
  },

  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
  },
  header: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: PRIMARY_TEXT_COLOR,
    fontWeight: '700',
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 10,
    fontWeight: '600',
    width: '98%',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    fontWeight: '700',
    color: 'white',
    fontSize: 10,
    lineHeight: 12,
  },
  middle: {
    marginTop: 10,
    marginLeft: 5,
  },
  middleWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginRight: 5,
    // borderWidth: 0.3,
  },
  middleW: {
    width: 40,
    height: 50,
    marginTop: 10,
    backgroundColor: '#EBECF0',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  middleWrap: {
    width: 70,
    padding: 5,
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 20,
    backgroundColor: '#183863',
  },
  contentTime: {
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    margin: 5,
    marginTop: 15,
  },
  bottomWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 2,
    backgroundColor: 'white',
  },
  chatIcon: {
    borderRadius: 50,
    padding: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  content: {
    marginLeft: 20,
    marginTop: 15,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  ContentWrapper: {
    width: contentContainerWidth,
    marginTop: 20,
    marginBottom: 10,
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
  shadowCritical: {
    shadowColor: '#183863',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowContent: {
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
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
  criticalW: {
    backgroundColor: 'white',
    width: 64,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Dashboard;
