import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ScrollView
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import {CommonStyles, Colors} from '../../../theme';

const EventCalendar = (props) => {

    const {
        navigation,
        route,
        calendarEvents,
        calendarEventLoading,
        calendarEventError,
        fetchAllCalendarEvent,
        cleanCalendarEvent,
    } = props;

    const events = [
        {
            eventType: 'Best Practices',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Growth Coaching',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Best Practices',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Growth Community',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
    ];

    useEffect(() => {
        const fetchCalendarEventAsync = async () => {
            await fetchAllCalendarEvent();
        };
        fetchCalendarEventAsync();
    }, []);

    let markedDay = {};
    calendarEvents.map((item) => {
        const startDate = moment(item.event_start).format('YYYY-MM-DD');
        const endDate = moment(item.event_end).format('YYYY-MM-DD');
        if(startDate === endDate) {
            markedDay[startDate] = {
                color: 'green',
                textColor: 'white'
            };
        }else{
            markedDay[startDate] = {
                color: 'green',
                textColor: 'white'
            };
        }
    });

    console.log("markedDay:::::::::::::;", markedDay);

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.eventCard} key={index}>
                <Text style={{marginTop: 30, marginLeft: 10, marginRight: 10, fontSize: 17}}>{item.eventTime}</Text>
                <View style={styles.eventTheme}/>
                <View style={styles.eventDetails}>
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text style={styles.eventParagraph}>Hosted by {item?.organizer?.term_name}</Text>
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
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>August Events</Text>
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
        width: "90%",
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
