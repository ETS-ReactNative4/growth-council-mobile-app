import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import Player from './Player';

import {CommonStyles, Colors, Typography} from '../../../theme';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

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

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarPOEAsync = async () => {
        await fetchAllPillarPOE(pillarId);
      };
      fetchAllPillarPOEAsync();

      return () => {
        cleanPillarPOE();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarEventAsync = async () => {
        await fetchAllPillarEvent(pillarId);
      };
      fetchAllPillarEventAsync();

      return () => {
        cleanPillarEvent();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarMemberContentAsync = async () => {
        await fetchAllPillarMemberContent(pillarId);
      };
      fetchAllPillarMemberContentAsync();

      return () => {
        cleanPillarMemberContent();
      };
    }, [isFocused]),
  );

  useEffect(() => {
    setMemberConnection(pillarMemberContents?.members);
  }, [pillarMemberContents?.members]);

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
          {/* {!memberConnection[index]?.connection && (
            <TouchableOpacity onPress={() => navigation.navigate('People')}>
              <Ionicons name="add-circle" size={20} color="#B2B3B9" />
            </TouchableOpacity>
            )} 
          {memberConnection[index]?.connection && (
            <Material name="check-circle" size={20} color="#14A2E2" />
          )} */}
        </View>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}) => {
    let navigationPath = ' ';
    if (item?.slug === 'growth-leadership-coaching') {
      navigationPath = 'GrowthDetail';
    } else {
      navigationPath = 'CommunityDetail';
    }
    console.log(item?.slug);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationPath, {
            poeId: item?.term_id,
            pillarId: item?.parent,
          })
        }>
        <View style={styles.middleWrapper}>
          <View style={[styles.middleW, styles.shadowProp]}>
            <Image
              source={{uri: item?.image}}
              style={{width: 30, height: 30}}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 10,
              marginHorizontal: 10,
              textAlign: 'center',
              color: '#222B45',
            }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderTopItem = ({item, index}, navigation) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

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

  const _renderContentItem = ({item, index}) => {
    const file = item?.file;
    const link = file.split('=', 2);
    let videoLink = link[1].split('&', 2);
    return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>Growth Coaching Events</Text>

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

            {pillarEventLoading && (
              <View style={styles.loading1}>
                <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
              </View>
            )}

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pillarPOEs}
              renderItem={_renderMiddleItem}
              // renderItem={item => _renderMiddleItem(item, navigation)}
            />
          </View>

          <View style={styles.bottom}>
            <Text style={styles.title}>Growth Coaching Coaches</Text>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={pillarMemberContents?.members}
                renderItem={_renderItem}
              />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Growth Coaching Content</Text>
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
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
  },
  top: {
    marginTop: 25,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
    fontWeight: '700',
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
    marginTop: 20,
  },
  middleWrapper: {
    width: (Dimensions.get('window').width - 10) / 4,
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
    marginTop: 25,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
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
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  content: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  ContentWrapper: {
    height: 210,
    width: contentContainerWidth,
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
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default GrowthCoaching;
