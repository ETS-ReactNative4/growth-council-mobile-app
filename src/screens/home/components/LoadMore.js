import React, {useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    FlatList,
} from 'react-native';

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
        pillar_id
    } = props;

    useEffect(() => {
        const fetchUpcomingEventAsync = async () => {
            await fetchUpcomingEventsByIdentifier(pillar_id);
        };

        fetchUpcomingEventAsync();
    }, []);

    console.log('Pillar Upcoming Detail:::::::::::::::::', upcomingEvents, pillar_id);

    const _renderItem = ({item, index}) => {

        return (
            <View style={styles.eventCard} key={index}>
                <View style={styles.eventTheme}/>
                <View style={styles.eventDetails}>
                    <View style={styles.eventInfo}>
                        <Text style={styles.evnetTitle}>
                            {item.title}
                        </Text>
                        <Text style={styles.eventParagraph}>
                            Hosted by {item?.organizer?.term_name} {item?.pillar_categories[0]?.slug}
                        </Text>
                    </View>
                    <View style={styles.eventDate}>
                        <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
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
        width: "100%",
        height: "100%"
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
        width: '100%'
    },
    eventsTitle: {
        marginBottom: 15,
    },
    eventList: {},
    eventCard: {
        width: "100%",
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5
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
});
export default CouncilAllDetail;
