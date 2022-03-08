import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import moment from 'moment';

import {CommonStyles, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {BubblesLoader} from 'react-native-indicator';
import * as Colors from '../../../theme/colors';
import {useIsFocused} from '@react-navigation/native';

const MySession = props => {
  const isFocused = useIsFocused();
  const {
    navigation,
    profileSession,
    profileSessionLoading,
    profileSessionError,
    fetchSessionsByUserIdentifier,
    cleanProfileSession,
  } = props;

  useEffect(() => {
    const fetchProfileSessionAsync = async () => {
      let token1 = await getAsyncStorage(JWT_TOKEN);
      let userID = decodeUserID(token1);
      await fetchSessionsByUserIdentifier(userID);
    };
    fetchProfileSessionAsync();

    return () => {
      cleanProfileSession();
    };
  }, [isFocused]);

  const _renderItems = ({item, index}) => {
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
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SessionDetail', {id: item.ID})}>
          <View style={styles.middleWrapper} key={index}>
            <View style={styles.wrapper}>
              <Text style={styles.text}>{item.title}</Text>

              {/* <Text
                style={{fontSize: 6, fontFamily: Typography.FONT_SF_REGULAR}}>
                {organizer} {description}
              </Text> */}
              <View style={styles.iconWrapper}>
                <Ionicon name={'person'} size={20} color="#0B0B45" />
                <Text style={[styles.text,{fontSize:10, width:100,}]} >
				{organizer} {description}</Text>
                <Ionicon
                  name={'calendar'}
                  size={20}
                  color="#0B0B45"
                  style={{marginLeft: 5}}
                />
                <Text style={styles.text}>
                  {date[2]} {date[1]}
                </Text>
              </View>
              <View style={styles.iconWrapper}>
                <Ionicon name={'time'} size={20} color="#0B0B45" />
                <Text style={styles.text}>
                  {item?.event_meta._start_hour[0]}:
                  {item?.event_meta._start_minute[0]}
                  {item.event_meta._start_ampm[0]}
                </Text>
                <Ionicon
                  name={'location'}
                  size={20}
                  color="#0B0B45"
                  style={{marginLeft: 20}}
                />
                <Text style={styles.text}>
                  {item.location?.location_address}
                </Text>
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
      {profileSessionLoading && (
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
              left: 120,
            }}>
            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
          </View>
        </>
      )}
      <FlatList
        Vertical
        showsVerticalScrollIndicator={false}
        data={profileSession}
        renderItem={_renderItems}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
  },
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 12,
    position: 'relative',
    paddingTop: 100,
    borderWidth: 1,
    borderColor: '#707070',
  },
  middle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    width: Platform.OS === 'ios' ? '65%' : '70%',
    marginLeft: 10,
    marginTop: 10,
  },
  middleWrapper: {
    paddingBottom: 20,
    width: '100%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: 20,
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

export default MySession;
