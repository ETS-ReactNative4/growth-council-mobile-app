import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import moment from 'moment';

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
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,
    pillar_id,
  } = props;

  useEffect(() => {
    const fetchUpcomingEventAsync = async () => {
      await fetchUpcomingEventsByIdentifier(pillar_id);
    };

    fetchUpcomingEventAsync();
  }, []);

  useEffect(() => {
    const fetchAllPillarPOEAsync = async () => {
      await fetchAllPillarPOE(pillar_id);
    };
    fetchAllPillarPOEAsync();
    return () => {
      cleanPillarPOE();
    };
  }, []);

  // console.log('Pillar Upcoming Events:::::::::::::::::', pillarPOEs, pillar_id);
  // console.log({pillarPOEs});

  const _renderItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    // console.log(date[1]);
    return (
      <View style={styles.eventCard} key={index}>
        <View style={styles.eventTheme} />
        <View style={styles.eventDetails}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventParagraph}>
              Hosted by {item?.organizer?.term_name}{' '}
              {item?.organizer?.description}
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

  const _renderPOE = ({item, index}) => {
    return (
      <View style={styles.poeCard} key={index}>
        <View style={[styles.poeTheme, styles.shadowProp]}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
        <View style={styles.eventDetails}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{item.name}</Text>
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
            <Text style={styles.poeTitle}>POINTS OF ENGAGEMENT</Text>
            <View styles={styles.eventList}>
              <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={pillarPOEs}
                renderItem={_renderPOE}
              />
            </View>
          </View>

          <View style={styles.events}>
            <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
            <View styles={styles.eventList}>
              <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={upcomingEvents}
                renderItem={_renderItem}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  poeTitle: {
    marginTop: 10,
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
  poeCard: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
	marginLeft:2,
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
  poeTheme: {
    height: 50,
    width: 50,
	justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
	backgroundColor: '#fff',
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
    fontWeight: 'normal',
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
    fontWeight: 'normal',
  },
});
export default CouncilAllDetail;
