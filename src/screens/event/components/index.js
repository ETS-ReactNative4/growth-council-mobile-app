import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {formatTimeByOffset} from './timezone';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';

const Event = props => {
  const {
    navigation,
    route,
    events,
    eventLoading,
    eventError,
    fetchEventByIdentifier,
    cleanEvent,
    eventRegisters,
    eventRegisterLoading,
    eventRegisterError,
    registerEventByIdentifier,
    cleanEventRegister,
  } = props;

  const toast = useToast();
  const [eventStatus, setEventStatus] = useState(events?.register_status);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [globalTime, setGlobalTime] = useState('America/Los_Angeles');

  useEffect(() => {
    fetchEventByIdentifier(route.params.id);
  }, []);

  useEffect(() => {
    setEventStatus(events?.register_status);
  }, [events]);

  const registerEventByEventID = async eventID => {
    console.log('event_id ===', eventID);
    const response = await registerEventByIdentifier({event_id: eventID});
    if (response?.payload?.code === 200) {
      setEventStatus(true);
      ToastMessage.show('You have successfully registered this event.');
    } else {
      console.log('Error Toast');
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const isEventLoaded = Object.keys(events).length === 0;
  const actualDate = moment(events?.event_start).format('LLLL').split(',', 6);
  const date = actualDate[1].split(' ', 3);

  let backgroundColor = Colors.COMMUNITY_COLOR;
  const pillarCategory = events?.pillar_categories
    ? events?.pillar_categories[0]?.slug
    : '';
  switch (pillarCategory) {
    case 'growth-coaching':
      backgroundColor = Colors.COACHING_COLOR;
      break;
    case 'basic-practices':
      backgroundColor = Colors.PRACTICE_COLOR;
      break;
    case 'growth-community':
      backgroundColor = Colors.COMMUNITY_COLOR;
  }

  let description = events?.descirption;
  if (description !== undefined) {
    description = events?.descirption;
  } else {
    description = '';
  }

  let time = {
    'Dateline Standard Time': 'Etc/GMT+12',
    'UTC-11': 'Etc/GMT+11',
    'Aleutian Standard Time': 'America/Adak',
    'Hawaiian Standard Time': 'Pacific/Honolulu',
    'Marquesas Standard Time': 'Pacific/Marquesas',
    'Alaskan Standard Time': 'America/Anchorage',
    'UTC-09': 'Etc/GMT+9',
    'Pacific Standard Time (Mexico)': 'America/Tijuana',
    'UTC-08': 'Etc/GMT+8',
    'Pacific Standard Time': 'America/Los_Angeles',
    'US Mountain Standard Time': 'America/Phoenix',
    'Mountain Standard Time (Mexico)': 'America/Chihuahua',
    'Mountain Standard Time': 'America/Denver',
    'Central America Standard Time': 'America/Guatemala',
    'Central Standard Time': 'America/Chicago',
    'Easter Island Standard Time': 'Pacific/Easter',
    'Central Standard Time (Mexico)': 'America/Mexico_City',
    'Canada Central Standard Time': 'America/Regina',
    'SA Pacific Standard Time': 'America/Bogota',
    'Eastern Standard Time (Mexico)': 'America/Cancun',
    'Eastern Standard Time': 'America/New_York',
    'Haiti Standard Time': 'America/Port-au-Prince',
    'Cuba Standard Time': 'America/Havana',
    'US Eastern Standard Time': 'America/Indianapolis',
    'Paraguay Standard Time': 'America/Asuncion',
    'Atlantic Standard Time': 'America/Halifax',
    'Venezuela Standard Time': 'America/Caracas',
    'Central Brazilian Standard Time': 'America/Cuiaba',
    'SA Western Standard Time': 'America/La_Paz',
    'Pacific SA Standard Time': 'America/Santiago',
    'Turks And Caicos Standard Time': 'America/Grand_Turk',
    'Newfoundland Standard Time': 'America/St_Johns',
    'Tocantins Standard Time': 'America/Araguaina',
    'E. South America Standard Time': 'America/Sao_Paulo',
    'SA Eastern Standard Time': 'America/Cayenne',
    'Argentina Standard Time': 'America/Buenos_Aires',
    'Greenland Standard Time': 'America/Godthab',
    'Montevideo Standard Time': 'America/Montevideo',
    'Magallanes Standard Time': 'America/Punta_Arenas',
    'Saint Pierre Standard Time': 'America/Miquelon',
    'Bahia Standard Time': 'America/Bahia',
    'UTC-02': 'Etc/GMT+2',
    'Azores Standard Time': 'Atlantic/Azores',
    'Cape Verde Standard Time': 'Atlantic/Cape_Verde',
    UTC: 'Etc/GMT',
    'Morocco Standard Time': 'Africa/Casablanca',
    'GMT Standard Time': 'Europe/London',
    'Greenwich Standard Time': 'Atlantic/Reykjavik',
    'W. Europe Standard Time': 'Europe/Berlin',
    'Central Europe Standard Time': 'Europe/Budapest',
    'Romance Standard Time': 'Europe/Paris',
    'Central European Standard Time': 'Europe/Warsaw',
    'W. Central Africa Standard Time': 'Africa/Lagos',
    'Jordan Standard Time': 'Asia/Amman',
    'GTB Standard Time': 'Europe/Bucharest',
    'Middle East Standard Time': 'Asia/Beirut',
    'Egypt Standard Time': 'Africa/Cairo',
    'E. Europe Standard Time': 'Europe/Chisinau',
    'Syria Standard Time': 'Asia/Damascus',
    'West Bank Standard Time': 'Asia/Hebron',
    'South Africa Standard Time': 'Africa/Johannesburg',
    'FLE Standard Time': 'Europe/Kiev',
    'Israel Standard Time': 'Asia/Jerusalem',
    'Kaliningrad Standard Time': 'Europe/Kaliningrad',
    'Sudan Standard Time': 'Africa/Khartoum',
    'Libya Standard Time': 'Africa/Tripoli',
    'Namibia Standard Time': 'Africa/Windhoek',
    'Arabic Standard Time': 'Asia/Baghdad',
    'Turkey Standard Time': 'Europe/Istanbul',
    'Arab Standard Time': 'Asia/Riyadh',
    'Belarus Standard Time': 'Europe/Minsk',
    'Russian Standard Time': 'Europe/Moscow',
    'E. Africa Standard Time': 'Africa/Nairobi',
    'Iran Standard Time': 'Asia/Tehran',
    'Arabian Standard Time': 'Asia/Dubai',
    'Astrakhan Standard Time': 'Europe/Astrakhan',
    'Azerbaijan Standard Time': 'Asia/Baku',
    'Russia Time Zone 3': 'Europe/Samara',
    'Mauritius Standard Time': 'Indian/Mauritius',
    'Saratov Standard Time': 'Europe/Saratov',
    'Georgian Standard Time': 'Asia/Tbilisi',
    'Caucasus Standard Time': 'Asia/Yerevan',
    'Afghanistan Standard Time': 'Asia/Kabul',
    'West Asia Standard Time': 'Asia/Tashkent',
    'Ekaterinburg Standard Time': 'Asia/Yekaterinburg',
    'Pakistan Standard Time': 'Asia/Karachi',
    'India Standard Time': 'Asia/Calcutta',
    'Sri Lanka Standard Time': 'Asia/Colombo',
    'Nepal Standard Time': 'Asia/Katmandu',
    'Central Asia Standard Time': 'Asia/Almaty',
    'Bangladesh Standard Time': 'Asia/Dhaka',
    'Omsk Standard Time': 'Asia/Omsk',
    'Myanmar Standard Time': 'Asia/Rangoon',
    'SE Asia Standard Time': 'Asia/Bangkok',
    'Altai Standard Time': 'Asia/Barnaul',
    'W. Mongolia Standard Time': 'Asia/Hovd',
    'North Asia Standard Time': 'Asia/Krasnoyarsk',
    'N. Central Asia Standard Time': 'Asia/Novosibirsk',
    'Tomsk Standard Time': 'Asia/Tomsk',
    'China Standard Time': 'Asia/Shanghai',
    'North Asia East Standard Time': 'Asia/Irkutsk',
    'Singapore Standard Time': 'Asia/Singapore',
    'W. Australia Standard Time': 'Australia/Perth',
    'Taipei Standard Time': 'Asia/Taipei',
    'Ulaanbaatar Standard Time': 'Asia/Ulaanbaatar',
    'Aus Central W. Standard Time': 'Australia/Eucla',
    'Transbaikal Standard Time': 'Asia/Chita',
    'Tokyo Standard Time': 'Asia/Tokyo',
    'North Korea Standard Time': 'Asia/Pyongyang',
    'Korea Standard Time': 'Asia/Seoul',
    'Yakutsk Standard Time': 'Asia/Yakutsk',
    'Cen. Australia Standard Time': 'Australia/Adelaide',
    'AUS Central Standard Time': 'Australia/Darwin',
    'E. Australia Standard Time': 'Australia/Brisbane',
    'AUS Eastern Standard Time': 'Australia/Sydney',
    'West Pacific Standard Time': 'Pacific/Port_Moresby',
    'Tasmania Standard Time': 'Australia/Hobart',
    'Vladivostok Standard Time': 'Asia/Vladivostok',
    'Lord Howe Standard Time': 'Australia/Lord_Howe',
    'Bougainville Standard Time': 'Pacific/Bougainville',
    'Russia Time Zone 10': 'Asia/Srednekolymsk',
    'Magadan Standard Time': 'Asia/Magadan',
    'Norfolk Standard Time': 'Pacific/Norfolk',
    'Sakhalin Standard Time': 'Asia/Sakhalin',
    'Central Pacific Standard Time': 'Pacific/Guadalcanal',
    'Russia Time Zone 11': 'Asia/Kamchatka',
    'New Zealand Standard Time': 'Pacific/Auckland',
    'UTC+12': 'Etc/GMT-12',
    'Fiji Standard Time': 'Pacific/Fiji',
    'Chatham Islands Standard Time': 'Pacific/Chatham',
    'UTC+13': 'Etc/GMT-13',
    'Tonga Standard Time': 'Pacific/Tongatapu',
    'Samoa Standard Time': 'Pacific/Apia',
    'Line Islands Standard Time': 'Pacific/Kiritimati',
  };
  const [timeToDisplay, setTimeToDisplay] = useState('');

  const backEndTimeStamp = events.event_start;

  // get device timezone eg. -> "Asia/Shanghai"
  const deviceTimeZone = RNLocalize.getTimeZone();

  // Make moment of right now, using the device timezone
  const today = moment().tz(deviceTimeZone);

  // Get the UTC offset in hours
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  useEffect(() => {
    // Run the function as we coded above.
    const convertedToLocalTime = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    // Set the state or whatever
    setTimeToDisplay(convertedToLocalTime);
  }, []);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: events?.image}}
          resizeMode="cover"
          style={{height: '55%'}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              {!isEventLoaded && (
                <Text style={styles.headingText1}>{events.title}</Text>
              )}
              <View style={styles.poe}>
                <Text style={{fontSize: 12}}>Megatrend Workshop</Text>
              </View>
            </View>
          </View>

          <View>
            {/* <TouchableOpacity
              onPress={() => setIsPickerVisible(true)}
              style={{
                borderRadius: 5,
                borderWidth: 0.5,
                overflow: 'hidden',
                height: 50,
                margin: 20,
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
              <Text style={{fontWeight: 'bold', color: 'gray'}}>
                {globalTime ? globalTime : 'Select a Country'}
              </Text>
            </TouchableOpacity> */}
            <Text style={{fontSize: 14, marginBottom: 20}}>
              Converted To local timezone: {timeToDisplay}
            </Text>
            0<Text>Your timezone: {deviceTimeZone}</Text>
            <View style={styles.content}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 5,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.infoicon,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <MaterialIcons name={'event'} size={20} color={'white'} />
                  </View>

                  <View
                    style={{
                      flex: 4,
                      paddingLeft: 10,
                    }}>
                    {!isEventLoaded && (
                      <Text style={styles.eventDetails}>
                        {date[2]} {date[1]}, {actualDate[0]}
                      </Text>
                    )}

                    {!isEventLoaded && (
                      <Text>
                        {events?.event_meta?._start_hour}:
                        {events?.event_meta?._start_minute}
                        {events?.event_meta?._start_ampm} /
                        {events?.event_meta?._end_hour}:
                        {events?.event_meta?._end_minute}
                        {events?.event_meta?._end_ampm} (PDT)
                        {/* <Timezone/> */}
                      </Text>
                    )}
                  </View>
                  {!eventStatus && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          registerEventByEventID(route?.params?.id)
                        }>
                        <Feather
                          name={'plus-circle'}
                          size={30}
                          color={'rgba(54,147,172,1)'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {eventStatus && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Feather
                        name={'check-circle'}
                        size={35}
                        color={'rgba(54,147,172,1)'}
                      />
                    </View>
                  )}
                </View>

                <View
                  style={{
                    flex: 1,
                    paddingTop: 20,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.infoicon,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Ionicons
                      name={'location-outline'}
                      size={20}
                      color={'white'}
                    />
                  </View>

                  {!isEventLoaded && (
                    <View
                      style={{
                        flex: 5,
                        paddingLeft: 10,
                      }}>
                      <Text style={styles.eventDetails}>
                        {events?.location?.location_city}{' '}
                        {events?.location?.location_state}{' '}
                        {events?.location?.location_country}
                      </Text>
                      <Text>{events?.location?.location_address}</Text>
                    </View>
                  )}

                  {eventLoading && (
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.seperationline} />
              <View>
                <View>
                  <Text style={styles.contentHeading}>Hosted By</Text>
                </View>

                <View style={styles.hostdetail}>
                  <View
                    style={[
                      styles.hostimage,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Image
                      source={{uri: events?.organizer_image}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 3,
                      paddingLeft: 20,
                    }}>
                    {eventRegisterLoading && (
                      <View style={styles.loading1}>
                        <BubblesLoader
                          color={Colors.SECONDARY_TEXT_COLOR}
                          size={80}
                        />
                      </View>
                    )}
                    <Text style={styles.contentHeading}>
                      {events?.organizer?.term_name}
                    </Text>
                    <Text>{events?.organizer?.description}</Text>
                  </View>
                  <View style={styles.eventaddress}></View>
                </View>
              </View>
              <View style={styles.seperationline} />
              <View>
                <Text style={styles.contentHeading}>Event Info</Text>
                {!isEventLoaded && (
                  <HTMLView value={description} style={{fontSize: 14}} />
                )}
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {!eventStatus && (
                  <Button
                    style={styles.acceptButton}
                    onPress={() => registerEventByEventID(route?.params?.id)}>
                    <Text style={styles.acceptButtonText}>
                      Sign Up in One Click
                    </Text>
                  </Button>
                )}
                {eventStatus && (
                  <TouchableOpacity style={styles.registeredButton}>
                    <View style={{position: 'absolute', left: 20}}>
                      <Image
                        source={require('../../../assets/img/tick-icon.png')}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    </View>
                    <Text style={styles.registeredButtonText}>Registered</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Footer />
      <Modal transparent visible={isPickerVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsPickerVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={globalTime}
                mode={'dropdown'}
                // onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue !== null) {
                    setGlobalTime(itemValue);
                  }
                }}>
                {/* {time?.map((value, index) => {
                  return (
                    <Picker.Item
                      label={value}
                      value={value}
                      style={{fontSize: 12}}
                    />
                  );
                })} */}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    padding: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
  },
  eventDetails: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'semi-bold',
    fontSize: 14,
    marginBottom: 15,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
    fontWeight: 'regular',
  },
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F26722',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    position: 'relative',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    color: '#F26722',
  },
  topbanner: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 90,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 14,
    padding: 20,
    position: 'relative',
  },

  poe: {
    height: 22,
    width: 148,
    position: 'absolute',
    top: -10,
    left: 0,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoicon: {
    flex: 1,
    backgroundColor: 'rgba(54,147,172,1)',
    height: 48,
    width: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  seperationline: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#F6F4F4',
    borderBottomWidth: 1,
  },
  hostdetail: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  hostimage: {
    flex: 1,
    backgroundColor: 'rgba(54,147,172,1)',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventaddress: {
    flex: 2,
    height: 60,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  followbtn: {
    width: 92,
    height: 36,
    backgroundColor: '#183863',
    borderRadius: 15,
  },
  loading1: {
    top: 0,
    left: 5,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
export default Event;
