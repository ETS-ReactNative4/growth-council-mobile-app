import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';

const Session = props => {
  const {
    navigation,
    route,
    sessions,
    sessionLoading,
    sessionError,
    fetchSessionByIdentifier,
    cleanSession,
    sessionRegisters,
    sessionRegisterLoading,
    sessionRegisterError,
    registerSessionByIdentifier,
    cleanSessionRegister,
  } = props;
  const toast = useToast();
  const [sessionStatus, setSessionStatus] = useState(sessions?.register_status);

  useEffect(() => {
    const fetchSessionDetailAsync = async () => {
      await fetchSessionByIdentifier(route.params.id);
    };
    fetchSessionDetailAsync();
  }, []);

  const registerSessionBySessionID = async sessionID => {
    const response = await registerSessionByIdentifier({session_id: sessionID});
    if (response?.payload?.code === 200) {
      setSessionStatus(true);
      ToastMessage.show('You have successfully registered this event.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const isSessionLoaded = Object.keys(sessions).length === 0;
  const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
  const date = actualDate[1].split(' ', 3);

  let backgroundColor = Colors.COMMUNITY_COLOR;
  const pillarCategory = sessions?.pillar_categories
    ? sessions?.pillar_categories[0]?.slug
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

  let description = sessions?.descirption;
  if (description !== undefined) {
    description = sessions?.descirption;
  } else {
    description = '';
  }

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: sessions?.image}}
          resizeMode="cover"
          style={{height: '55%'}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              {!isSessionLoaded && (
                <Text style={styles.headingText1}>{sessions?.title}</Text>
              )}
            </View>
          </View>
          {/* <View
                        style={{
                            height: 28,
                            position: 'absolute',
                            top: 90,
                            left: 40,
                            backgroundColor: '#ffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <Text>Megatrend Workshop</Text>
                    </View> */}
          <View>
            <View style={[styles.content, {height: 'auto'}]}>
              <View
                style={{height: 150, flexDirection: 'column', marginTop: 20}}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.infoicon,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <MaterialIcons name={'event'} size={35} color={'white'} />
                  </View>

                  <View
                    style={{
                      flex: 4,
                      paddingLeft: 10,
                    }}>
                    {!isSessionLoaded && (
                      <Text style={styles.contentHeading}>
                        {date[2]} {date[1]}, {actualDate[0]}
                      </Text>
                    )}

                    {!isSessionLoaded && (
                      <Text>
                        {sessions?.event_meta?._start_hour}:
                        {sessions?.event_meta?._start_minute}
                        {sessions?.event_meta?._start_ampm} /
                        {sessions?.event_meta?._end_hour}:
                        {sessions?.event_meta?._end_minute}
                        {sessions?.event_meta?._end_ampm} (PDT)
                      </Text>
                    )}
                  </View>
                  {!sessionStatus && (
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          registerSessionBySessionID(route?.params?.id)
                        }>
                        <Feather
                          name={'plus-circle'}
                          size={35}
                          color={'rgba(54,147,172,1)'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {sessionStatus && (
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

                  {!isSessionLoaded && (
                    <View
                      style={{
                        flex: 5,
                        paddingLeft: 10,
                      }}>
                      <Text style={styles.contentHeading}>
                        {sessions?.location?.location_city}{' '} ,
                        {sessions?.location?.location_state}{' '} ,
                        {sessions?.location?.location_country}
                      </Text>
                      <Text>{sessions?.location?.location_address}</Text>
                    </View>
                  )}
                  {sessionLoading && (
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  )}
                </View>
              </View>

              {/* <View>
                <View style={{marginTop: 10}}>
                  <Text style={styles.contentHeading}>Traits</Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 0.3,
                      }}>
                      <Ionicons name={'medkit'} size={30} color={'#A1BA68'} />
                    </View>

                    <Text style={{padding: 20}}>Trait 1</Text>
                  </View>

                  <View
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 0.3,
                      }}>
                      <Ionicons name={'medkit'} size={30} color={'#A1BA68'} />
                    </View>

                    <Text style={{padding: 20}}>Trait 2</Text>
                  </View>
                </View>
              </View> */}

              <View style={{height: 150}}>
                <View style={{marginTop: 25}}>
                  <Text style={styles.contentHeading}>Coached By</Text>
                </View>
                <View style={styles.hostdetail}>
                  <View
                    style={[
                      styles.hostimage,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Image
                      source={{uri: sessions?.organizer_image}}
                      style={{width: "100%", height:"100%"}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 3,
                      paddingLeft: 20,
                    }}>
                    <Text style={styles.contentHeading}>
                      {sessions?.organizer?.term_name}
                    </Text>
                    <Text>{sessions?.organizer?.description}</Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      height: 60,
                      width: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    {/* <Button
                                            style={{
                                                width: '85%',
                                                height: 40,
                                                backgroundColor: '#183863',
                                                borderRadius: 15,
                                            }}
                                            onPress={() => navigation.navigate('SignUp')}>
                                            <Text
                                                style={[
                                                    styles.acceptButtonText,
                                                    {fontWeight: 'bold', fontSize: 15},
                                                ]}>
                                                Follow
                                            </Text>
                                        </Button> */}
                  </View>
                </View>
              </View>

              <View>
                <Text style={styles.contentHeading}>Session Brief</Text>
                {!isSessionLoaded && (
                  <HTMLView value={description} stylesheet={styles} />
                )}
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center', marginTop:10}}>
                {!sessionStatus && (
                  <Button
                    style={styles.acceptButton}
                    onPress={() =>
                      registerSessionBySessionID(route?.params?.id)
                    }>
                    <Text style={styles.acceptButtonText}>
                      Sign Up in One Click
                    </Text>
                  </Button>
                )}
                {sessionStatus && (
                  <TouchableOpacity style={styles.registeredButton}>
                    <View style={{paddingLeft: 10}}>
                      <Image
                        source={require('../../../assets/img/tick-icon.png')}
                        style={{width: 30, height: 30}}
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
      <Footer/>
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
    marginTop: 170,
    borderTopStartRadius: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
	marginBottom:8,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  acceptButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(242,103,34,1)',
  },
  topbanner: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 90,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
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
    backgroundColor: '#A1BA68',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#F26722',
    paddingLeft: 110,
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
export default Session;
