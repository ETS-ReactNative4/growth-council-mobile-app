import React, {useEffect, useState} from 'react';
import {
    Platform,
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import LoadMore from './LoadMore';
import {fetchAllUpcomingEvents, resetUpcomingEvent} from '../slice/upcomingEventSlice';
const screenHeight = Math.round(Dimensions.get('window').height);

const CouncilDetail = props => {

	const dispatch = useDispatch();

    const {navigation, route, pillars, pillarLoading, pillarError, fetchPillarByIdentifier, cleanPillar} = props;
	const {upcomingEvents, upcomingEventLoading, upcomingEventError} = useSelector((state) => state.upcomingEvents);

    const [loadMore, setLoadMore] = useState(false);

	const fetchAllUpcomingEvent = () => {
        dispatch(fetchAllUpcomingEvents());
    };
	const cleanUpcomingEvent = () => {
        dispatch(resetUpcomingEvent());
    };

    useEffect(() => {
        const fetchPillarDetailAsync = async () => {
            await fetchPillarByIdentifier(route?.params?.id);
        };
        fetchPillarDetailAsync();

    }, []);

    // console.log("route.params.id:::::::::::::::::", route.params.id);
    // console.log("Pillar Detail:::::::::::::::::", pillars);

    return (
        <ScrollView >
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                />

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

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        style={styles.moreButton}
                        onPress={() => setLoadMore(!loadMore)}>
                        <Text style={styles.moreButtonText}>Load More</Text>
                    </Button>
                </View>
                {loadMore && 
					<LoadMore 
						{...props}
						
						upcomingEvents={upcomingEvents}
						upcomingEventLoading={upcomingEventLoading}
						upcomingEventError={upcomingEventError}
						fetchAllUpcomingEvent={fetchAllUpcomingEvent}
						cleanUpcomingEvent={cleanUpcomingEvent}/>
				}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        padding: 20,
    },
    meta: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 50 : 10,
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
});
export default CouncilDetail;
