import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {CommonStyles, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {BubblesLoader} from 'react-native-indicator';
import * as Colors from '../../../theme/colors';
import * as RNLocalize from 'react-native-localize';
import {formatTimeByOffset} from '../../event/components/timezone';

const Profile = props => {
  const isFocused = useIsFocused();
  const {
    navigation,
    profileEvent,
    profileEventLoading,
    profileEventError,
    fetchEventsByUserIdentifier,
    cleanProfileEvent,
  } = props;

  useEffect(() => {
    const fetchProfileEventAsync = async () => {
      //   let token = await getAsyncStorage(JWT_TOKEN);
      //   let userID = decodeUserID(token);
      //   console.log({token});
      await fetchEventsByUserIdentifier({
        all_events: false,
      });
    };
    fetchProfileEventAsync();

    return () => {
      cleanProfileEvent();
    };
  }, [isFocused]);

  const _renderItem = ({item, index}) => {
    const actualDate = moment(item?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

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

    const backStartTimeStamp = item?.event_start;
    const deviceTimeZone = RNLocalize.getTimeZone();

    const today = moment().tz(deviceTimeZone);
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    let convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    const time = moment(convertedToLocalTime).format('h:mma');
    let nav = 'coachingSession';
    if (item?.pillar_categories[0]?.slug === 'growth-leadership-coaching') {
      nav = 'coachingSession';
    } else {
      nav = 'EventDetail';
    }

    return (
      <View key={index} style={{paddingBottom: 10}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(nav, {id: item?.ID, title: item?.title})
          }>
          <View style={[styles.middleWrapper, styles.shadowProp]}>
            <View style={styles.wrapper}>
              <Text style={styles.text}>{item?.title}</Text>
              <View style={styles.iconWrapper}>
                <Ionicon name={'person'} size={20} color="#0B0B45" />
                <Text style={[styles.text, {fontSize: 10, width: 100}]}>
                  {organizer} {description}
                </Text>

                <Ionicon name={'time'} size={20} color="#0B0B45" />
                <Text style={[styles.text, {fontSize: 12}]}>{time}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Ionicon name={'calendar'} size={20} color="#0B0B45" />
                <Text style={[styles.text, {fontSize: 12, width: 100}]}>
                  {date[2]} {date[1]}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Ionicon name={'location'} size={20} color="#0B0B45" />
                  <Text style={[styles.text, {fontSize: 12, width: 120}]}>
                    {item.location?.location_address}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              style={{
                height: 35,
                top: 40,
                backgroundColor: '#183863',
                borderRadius: 15,
              }}>
              <Text style={{fontSize: 10, color: PRIMARY_BACKGROUND_COLOR}}>
                Upcoming
              </Text>
            </Button>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {profileEventLoading && (
        <>
          <View
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 50,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 1011,
            }}>
            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
          </View>
        </>
      )}
      <View style={{paddingBottom: 20}}>
        <FlatList
          Vertical
          showsVerticalScrollIndicator={false}
          data={profileEvent}
          renderItem={_renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },

  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
  },

  wrapper: {
    width: Platform.OS === 'ios' ? '65%' : '70%',
    marginLeft: 10,
    marginTop: 10,
  },
  middleWrapper: {
    paddingBottom: 20,
    width: '98%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    left: 2,
    right: 5,

    backgroundColor: 'white',
    // borderWidth: 0.3,
  },
  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  middleImage1: {
    width: 40,
    height: 40,
    backgroundColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
  buttonWrapper: {
    width: 267,
    height: 50,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    margin: 10,
    marginTop: 15,
    marginLeft: Platform.OS === 'ios' ? 10 : 40,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
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

export default Profile;
