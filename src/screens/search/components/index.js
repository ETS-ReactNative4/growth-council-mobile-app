import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
} from 'react-native';
import {Button} from 'react-native-paper';
import Font from 'react-native-vector-icons/FontAwesome5';

import SearchBox from '../../../shared/form/SearchBar';

import {CommonStyles, Colors, Typography} from '../../../theme';

const events = [
    {
        eventType: 'Best Practices',
        eventTitle: 'Executive Coaching Clinic On Goal Setting',
        eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
        eventDay: '01',
        eventMonth: 'AUG',
    },
    {
        eventType: 'Growth Coaching',
        eventTitle: 'Executive Coaching Clinic On Goal Setting',
        eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
        eventDay: '01',
        eventMonth: 'AUG',
    },
    {
        eventType: 'Best Practices',
        eventTitle: 'Executive Coaching Clinic On Goal Setting',
        eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
        eventDay: '01',
        eventMonth: 'AUG',
    },
    {
        eventType: 'Growth Community',
        eventTitle: 'Executive Coaching Clinic On Goal Setting',
        eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
        eventDay: '01',
        eventMonth: 'AUG',
    },
];

const eventItems = ({item, index}) => {
    return (
        <View style={styles.eventCard} key={index}>
            <View style={styles.eventTheme}/>
            <View style={styles.eventDetails}>
                <View style={styles.eventInfo}>
                    <Text style={styles.evnetTitle}>{item?.title}</Text>
                    <Text style={styles.eventParagraph}>Hosted by {item?.organizer?.term_name}</Text>
                </View>
                <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>
                        {/* {item.eventDay}
                        {'\n'}
                        {item.eventMonth} */}
                    </Text>
                </View>
            </View>
        </View>
    );
};


const searchTags = [
    'Growth Coaching',
    'Community',
    'Artificial Intelligence',
    'Best Practices',
];

const searchTag = ({item, index}) => {
    return (
        <Button style={styles.searchTagBtn}>
            <Text style={styles.searchTabBtnText}>{item}</Text>
        </Button>
    );
};

const data1 = [
    {
        icon: 'brain',
        text: 'Executive MindChange',
    },
    {
        icon: 'location-arrow',
        text: 'Megatrends Workshop',
    },
    {
        icon: 'brain',
        text: 'Executive MindChange',
    },
    {
        icon: 'location-arrow',
        text: 'Megatrends Workshop',
    },
];

const _renderMiddleItem = ({item, index}) => {
    return (
        <View style={styles.middleWrapper}>
            <View style={styles.middleW}>
                <Font name={item.icon} size={40} color="skyblue"/>
            </View>
            <Text style={{marginTop: 10}}>{item.text}</Text>
        </View>
    );
};

const Search = (props) => {

    const {
        navigation,
        searches,
        searchLoading,
        searchError,
        searchEventsByIdentifier,
        cleanSearch,
    } = props;

    console.log("searches::::::::::::", searches);

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    style={{width: '100%', height: 150}}
                    source={require('../../../assets/img/search_back_image.png')}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <SearchBox searchEventsByIdentifier={searchEventsByIdentifier}/>
                    </View>
                </ImageBackground>

                <View style={{marginTop: 20}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={searchTags}
                        renderItem={searchTag}
                    />
                </View>

                <View style={styles.middle}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Suggestions</Text>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data1}
                            renderItem={_renderMiddleItem}
                        />
                    </View>
                </View>
                <View style={styles.events}>
				<Text style={{fontWeight: 'bold', fontSize: 15}}>Events</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={searches.events_sessions}
                        renderItem={eventItems}
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
        width: '100%',
    },
    top: {
        height: 200,
        marginTop: 80,
        margin: 10,
        justifyContent: 'center',
    },

    topWrapper: {
        height: 170,
        width: 300,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 50,
    },
    header: {
        margin: 10,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginTop: 10,
        fontWeight: '800',
        color: 'white',
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: '700',
        color: 'white',
    },
    middle: {
        width: 400,
        height: 200,
        marginLeft: 10,
        marginTop: 15,
    },
    middleWrapper: {
        height: 150,
        width: 100,
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleW: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    headingText3: {
        ...CommonStyles.headingText3,
        fontFamily: Typography.FONT_NORMAL,
        padding: 4,
    },
    bottom: {
        height: 190,
        margin: 10,
        width: 400,
    },
    bottomWrapper: {
        width: 120,
        height: 140,
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    bottomImage: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    searchTagBtn: {
        backgroundColor: '#ffff',
        height: 50,
        width: 170,
        borderRadius: 20,
        justifyContent: 'center',
        marginLeft: 10,
    },
    searchTabBtnText: {
        color: '#060606',
        fontSize: 12,
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

export default Search;
