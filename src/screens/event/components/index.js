import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

const Event = props => {
  const {
    navigation,
    route,
    events,
    eventLoading,
    eventError,
    fetchEventByIdentifier,
    cleanEvent,
  } = props;

  useEffect(() => {
    const fetchEventDetailAsync = async () => {
      await fetchEventByIdentifier(route.params.id);
    };
    fetchEventDetailAsync();
  }, []);

  const isEventLoaded = Object.keys(events).length === 0;
  const actualDate = moment(events.event_start).format('LLLL').split(',', 6);
  const date = actualDate[1].split(' ', 3);
  console.log(date);

  console.log('route.params.id:::::::::::::::::', route.params.id);
  console.log('Event Detail:::::::::::::::::', events.organizer_image);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: events.image}}
          resizeMode="cover"
          style={{height: '55%'}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <View style={styles.topbanner}>
              {!isEventLoaded && (
                <Text style={styles.headingText1}>{events.title}</Text>
              )}
              <View style={styles.poe}>
                <Text style={{fontSize: 12}}>Megatrend Workshop</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.content, {height: 'auto'}]}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 20,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.infoicon}>
                    <MaterialIcons name={'event'} size={18} color={'white'} />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      paddingLeft: 10,
                    }}>
                    {!isEventLoaded && (
                      <Text style={styles.contentHeading}>
                        {date[2]} {date[1]}, {actualDate[0]}
                      </Text>
                    )}

                    {!isEventLoaded && (
                      <Text style={{fontSize: 14}}>
                        {events.event_meta._start_hour}:
                        {events.event_meta._start_minute}
                        {events.event_meta._start_ampm} /
                        {events.event_meta._end_hour}:
                        {events.event_meta._end_minute}
                        {events.event_meta._end_ampm} (PDT)
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Feather
                      name={'plus-circle'}
                      size={30}
                      color={'rgba(54,147,172,1)'}
                    />
                  </View>
                </View>

                <View style={styles.address}>
                  <View style={styles.infoicon}>
                    <Ionicons
                      name={'location-outline'}
                      size={18}
                      color={'white'}
                    />
                  </View>
                  {!isEventLoaded && (
                    <View
                      style={{
                        flex: 4,
                        paddingLeft: 10,
                      }}>
                      <Text style={styles.contentHeading}>
                        {events.location.location_city} ,
                        {events.location.location_state} ,
                        {events.location.location_country}
                      </Text>
                      <Text>{events.location.location_address}</Text>
                    </View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      height: 22,
                      width: 54,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/img/live_image.png')}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.seperationline} />

              <View>
                <View>
                  <Text style={styles.contentHeading}>Hosted By</Text>
                </View>
                <View style={styles.hostdetail}>
                  {!isEventLoaded && (
                    <View style={styles.hostimage}>
                      <Image
                        source={{uri: events?.organizer_image}}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flex: 3,
                      paddingLeft: 20,
                    }}>
                    <Text style={styles.contentHeading}>
                      {events?.organizer?.term_name}
                    </Text>
                    <Text>{events?.organizer?.description}</Text>
                  </View>
                  <View style={styles.eventaddress}>
                    <Button style={styles.followbtn}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: '#F5F5F5',
                        }}>
                        Follow
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>

              <View style={styles.seperationline} />

              <View>
                <Text style={styles.contentHeading}>Event Info</Text>
                {!isEventLoaded && (
                  <HTMLView value={events.description} style={{fontSize: 14}} />
                )}
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  style={styles.acceptButton}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.acceptButtonText}>
                    Sign Up in One Click
                  </Text>
                </Button>
              </View>
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
    fontSize: 22,
    color: '#ffff',
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
  },
  acceptButtonText: {
    width: 146,
    height: 20,
    fontSize: 14,
    color: '#ffffff',
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
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
  },
  poe: {
    height: 22,
    width: 148,
    position: 'absolute',
    top: -15,
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
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
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
});
export default Event;
