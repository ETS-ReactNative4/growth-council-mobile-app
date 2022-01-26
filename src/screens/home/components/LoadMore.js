import React from 'react';
import {
<<<<<<< HEAD
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Image,
=======
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
>>>>>>> qa
} from 'react-native';

<<<<<<< HEAD
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const CouncilAllDetail = props => {

    const {navigation, route} = props;

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
            />
            <View style={styles.container}>
                <ScrollView style={{height: screenHeight}}>
                    <View style={styles.meta}>
                        <Image
                            style={{
                                width: '100%',
                                height: 230,
                                alignItems: 'center',
                            }}
                            source={require('../../../assets/img/welcome_screen_info_image.png')}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                            }}>
                            <Ionicons
                                name={'md-close-circle-sharp'}
                                size={40}
                                color={'#0aade7'}
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                    </View>

                    <View style={{padding: 30}}>
                        <Text style={styles.headingTitle}>Growth Coaching</Text>
                        <Text style={styles.paragraph}>
                            This Agreement governs your use of Apple’s services (“Services”),
                            through which you can buy, get, license, rent or subscribe to
                            content, Apps (as defined below), and other in-app services
                            (collectively, “Content”). ontent may be offered through the
                        </Text>
                        <Text style={styles.paragraph}>
                            By creating an account for use of the Services in a particular
                            country or territory you are specifying it as your Home Country.
                        </Text>
                    </View>
                    <View style={styles.events}>
                        <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
                        <View styles={styles.eventList}>
                            <View style={styles.eventCard}>
                                <View style={styles.eventTheme}/>
                                <View style={styles.eventDetails}>
                                    <View style={styles.eventInfo}>
                                        <Text style={styles.evnetTitle}>
                                            Executive Coaching Clinic On Goal Setting
                                        </Text>
                                        <Text style={styles.eventParagraph}>
                                            Hosted by Michael “Coop” Cooper Founder, Innovators +
                                            Influencer
                                        </Text>
                                    </View>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.eventCard}>
                                <View style={styles.eventTheme}/>
                                <View style={styles.eventDetails}>
                                    <View style={styles.eventInfo}>
                                        <Text style={styles.evnetTitle}>
                                            Executive Coaching Clinic On Goal Setting
                                        </Text>
                                        <Text style={styles.eventParagraph}>
                                            Hosted by Michael “Coop” Cooper Founder, Innovators +
                                            Influencer
                                        </Text>
                                    </View>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.eventCard}>
                                <View style={styles.eventTheme}/>
                                <View style={styles.eventDetails}>
                                    <View style={styles.eventInfo}>
                                        <Text style={styles.evnetTitle}>
                                            Executive Coaching Clinic On Goal Setting
                                        </Text>
                                        <Text style={styles.eventParagraph}>
                                            Hosted by Michael “Coop” Cooper Founder, Innovators +
                                            Influencer
                                        </Text>
                                    </View>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.eventCard}>
                                <View style={styles.eventTheme}/>
                                <View style={styles.eventDetails}>
                                    <View style={styles.eventInfo}>
                                        <Text style={styles.evnetTitle}>
                                            Executive Coaching Clinic On Goal Setting
                                        </Text>
                                        <Text style={styles.eventParagraph}>
                                            Hosted by Michael “Coop” Cooper Founder, Innovators +
                                            Influencer
                                        </Text>
                                    </View>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
=======
import {CommonStyles, Colors, Typography} from '../../../theme';

const CouncilAllDetail = props => {
  const {
    navigation,
    route,
    upcomingEvents,
    upcomingEventLoading,
    upcomingEventError,
    fetchUpcomingEventsByIdentifier,
    cleanUpcomingEvent,
    pillar_id,
  } = props;

  useEffect(() => {
    const fetchUpcomingEventAsync = async () => {
      await fetchUpcomingEventsByIdentifier(pillar_id);
    };

    fetchUpcomingEventAsync();
  }, []);

  console.log(
    'Pillar Upcoming Events:::::::::::::::::',
    upcomingEvents,
    pillar_id,
  );

  const _renderItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View style={styles.eventCard} key={index}>
        <View style={styles.eventTheme} />
        <View style={styles.eventDetails}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventParagraph}>
              Hosted by {item?.organizer?.term_name}{' '}
              {item?.pillar_categories[0]?.slug}
            </Text>
          </View>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>
              {date[1]}
              {'\n'}
              {date[0]}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.events}>
            <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
            <View styles={styles.eventList}>
              <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={upcomingEvents}
                renderItem={_renderItem}
              />
>>>>>>> qa
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        ...CommonStyles.container,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    meta: {
        width: '100%',
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f3354',
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
    moreButton: {
        width: '40%',
        borderRadius: 10,
        height: 40,
        fontSize: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    moreButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
        fontSize: 13,
        fontWeight: 'bold',
    },
    events: {
        padding: 30,
    },
    eventsTitle: {
        marginBottom: 15,
    },
    eventList: {},
    eventCard: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    eventTheme: {
        height: '100%',
        width: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(128,186,116,1)',
    },
    eventDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    eventInfo: {
        paddingRight: 5,
        flex: 5,
    },
    evnetTitle: {
        marginBottom: 5,
    },
    eventParagraph: {
        fontSize: 10,
    },
    eventDate: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(245,245,245,1)',
        borderRadius: 10,
        fontSize: 18,
    },
    eventDateText: {
        textAlign: 'center',
    },
=======
  container: {
    ...CommonStyles.container,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
    width: '100%',
    height: '100%',
  },
  meta: {
    width: '100%',
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3354',
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    marginTop: 5,
    marginBottom: 10,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  moreButton: {
    width: '40%',
    borderRadius: 10,
    height: 40,
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginLeft: 5,
  },
  moreButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 13,
    fontWeight: 'bold',
  },
  events: {
    padding: 30,
    width: '100%',
  },
  eventsTitle: {
    marginBottom: 34,
    fontWeight: 'semi-bold',
  },
  eventList: {},
  eventCard: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
  },
  eventTheme: {
    height: 84,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(128,186,116,1)',
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  eventTitle: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'medium',
  },
  eventParagraph: {
    fontSize: 8,
    fontWeight: 'regular',
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
    height: 62,
    width: 56,
  },
  eventDateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'medium',
  },
>>>>>>> qa
});
export default CouncilAllDetail;
