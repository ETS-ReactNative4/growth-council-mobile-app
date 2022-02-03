import React, {useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import {CommonStyles, Colors} from '../../../theme';

const EventCalendar = props => {
  const {
    navigation,
    route,
    calendarEvents,
    calendarEventLoading,
    calendarEventError,
    fetchAllCalendarEvent,
    cleanCalendarEvent,
  } = props;

  useEffect(() => {
    const fetchCalendarEventAsync = async () => {
      await fetchAllCalendarEvent();
    };
    fetchCalendarEventAsync();
  }, []);

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  const tt = [
    {
      ID: 4848,
      title: 'Executive Coaching Clinic on 10x Productivity',
      descirption:
        '<div>\r\n\r\n<strong>Abstract:\r\n</strong>Coaching is about gaining clarity, creating change and making progress on your goals, outcomes, or strategies. This will be a live coaching call in which Coop will walk you through concrete exercises to bolster your success in rising to a designated professional challenge. Humans are capable of so much more than they are currently producing - with the right framework and applied thinking, we’ll help participants lean into the vision of producing 10X what they currently are.\r\n\r\n<strong><span style="text-decoration: underline;">Your Executive Coach:\r\n</span></strong>Michael O. “Coop” Cooper, Founder of Innovators + Influencers, will be your Virtual Executive Coach. Coop is an internationally recognized executive coach, advisor, facilitator and trainer who specializes in working with executive teams to develop the leadership skills, alignment and strategies to grow and thrive in a constantly changing environment. Coop has 23 years of experience as a coach, management consultant, strategist and project leader with Fortune 1000 companies and small businesses in over 20 countries. He has worked with leaders at Accuray, eBay, Genentech, Google, Novell, Sony Computer Entertainment America, Southwest Airlines, TeleNav, Wells Fargo, Yahoo, Yammer and hundreds of other organizations large and small. He co-led the teams to develop the world’s first wireless web platform for Vodafone and Verizon deployed in 27 countries and developed the specifications for the first custom internet car-ordering system for Honda. He has also been selected to coach the prestigious TED Fellows. Coop is a contributor to Fast Company. Learn more about Coop and his Executive Coaching at <a href="http://www.innovatorsandinfluencers.com" target="_blank" rel="noopener">www.innovatorsandinfluencers.com</a>.\r\n\r\n</div>',
      post_name: 'executive-coaching-clinic-on-10x-productivity',
      guid: 'https://www.gilcouncil.com/event/executive-coaching-clinic-on-10x-productivity/',
      post_date: '2021-08-06 16:04:13',
      post_date_gmt: '2021-08-06 16:04:13',
      event_start: '2022-01-10 13:00:00',
      event_end: '2022-01-12 14:00:00',
      time_zone: 'America/New_York',
      image: false,
      pillar_categories: [
        {
          term_id: 121,
          name: 'Growth Coaching',
          slug: 'growth-coaching',
          term_group: 0,
          term_taxonomy_id: 121,
          taxonomy: 'event_type_3',
          description:
            'Leveraging the power of a robust online platform for connection and education, you and select members of your executive team can network with peers around the world, accelerate your learning and pass along value to your internal teams.\r\n\r\nLeveraging the power of a robust online platform for connection and education, you and select members of your executive team can network with peers around the world, accelerate your learning and pass along value to your internal teams.\r\n\r\nLeveraging the power of a robust online platform for connection and education, you ',
          parent: 0,
          count: 4,
          filter: 'raw',
        },
      ],
      location: {
        location_address: '',
        location_city: '',
        location_state: '',
        location_country: '',
        location_getdir_latlng: 'no',
        evcal_location_link: '',
        evo_loc_img: '',
      },
    },
    {
      ID: 4738,
      title: 'Council Virtual Event on Business Model Strategy',
      descirption:
        '<strong>Moderator:\r\n</strong>Stuart Hayton, Managing Director, Weir Minerals Netherlands\r\n\r\n<em><b>More details coming soon!</b></em>',
      post_name: 'council-virtual-event-on-business-model-strategy',
      guid: 'https://www.gilcouncil.com/event/council-virtual-event-on-business-model-strategy/',
      post_date: '2021-06-24 16:12:44',
      post_date_gmt: '2022-06-24 16:12:44',
      event_start: '2022-01-20 14:00:00',
      event_end: '2022-01-20 15:00:00',
      time_zone: 'America/New_York',
      image: false,
      pillar_categories: [
        {
          term_id: 120,
          name: 'Growth Community',
          slug: 'growth-community',
          term_group: 0,
          term_taxonomy_id: 120,
          taxonomy: 'event_type_3',
          description:
            'Connect monthly with peers from a wide range of industries and functions to share insights and solve real-world problems with proven strategies. A balance of in-person and virtual events throughout the year gives you access to deep discussions so you can build your expertise and deepen your professional relationships.\r\n\r\nConnect monthly with peers from a wide range of industries and functions to share insights and solve real-world problems with proven strategies. A balance of in-person and virtual events throughout the year gives you access to deep discussions so',
          parent: 0,
          count: 5,
          filter: 'raw',
        },
      ],
      location: {
        location_address: '',
        location_city: '',
        location_state: '',
        location_country: '',
        location_getdir_latlng: 'no',
        evcal_location_link: '',
        evo_loc_img: '',
      },
    },
  ];

  let markedDay = {};
  tt.map(item => {
    const startDate = moment(item.event_start).format('YYYY-MM-DD');
    const endDate = moment(item.event_end).format('YYYY-MM-DD');
    if (moment(startDate).isSame(endDate)) {
      markedDay[startDate] = {
        color: 'green',
        textColor: 'white',
      };
    } else {
      const dates = getDates(
        new Date(moment(startDate).format('YYYY-MM-DD')),
        new Date(moment(endDate).format('YYYY-MM-DD')),
      );
      dates.map((item, index) => {
        if (index === 0) {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            startingDay: true,
            color: 'green',
            textColor: 'white',
          };
        } else if (dates?.length - 1 === index) {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            endingDay: true,
            color: 'green',
            textColor: 'white',
          };
        } else {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            color: 'green',
            textColor: 'white',
          };
        }
      });
    }
  });

  console.log('markedDay:::::::::::::;', markedDay);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.eventCard} key={index}>
        <Text
          style={{
            marginTop: 30,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 17,
          }}>
          {item.eventTime}
        </Text>
        <View style={styles.eventTheme} />
        <View style={styles.eventDetails}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventParagraph}>
              Hosted by {item?.organizer?.term_name}
            </Text>
          </View>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>
              {item.eventDay}
              {'\n'}
              {item.eventMonth}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            markingType={'period'}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            markedDates={markedDay}
            //  markedDates={{
            //      '2022-01-10': { color: 'green',textColor: 'white'},
            //      '2022-01-12': { color: 'green',textColor: 'white'},
            //      '2022-01-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
            //      '2022-01-22': {color: '#70d7c7', textColor: 'white'},
            //      '2022-01-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
            //      '2022-01-24': {color: '#70d7c7', textColor: 'white'},
            //      '2022-01-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
            //  }}
          />
        </View>
        <View style={styles.events}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>August Events</Text>
          <FlatList
            Vertical
            showsVerticalScrollIndicator={false}
            data={calendarEvents}
            renderItem={renderItem}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
  },
  yearTab: {
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
  },
  activeWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  passiveWrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 30,
  },
  wrapper: {
    top: '20%',
  },
  calendar: {
    marginTop: 20,
  },
  events: {
    padding: 20,
  },
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
  eventTitle: {
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
});

export default EventCalendar;
