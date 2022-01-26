import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
<<<<<<< HEAD:src/screens/event/component/index.js
=======
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
>>>>>>> qa:src/screens/event/components/index.js

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';

const Event = props => {
<<<<<<< HEAD:src/screens/event/component/index.js

    const {navigation, route, events, eventLoading, eventError, fetchEventByIdentifier, cleanEvent} = props;
=======
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
>>>>>>> qa:src/screens/event/components/index.js

    const toast = useToast();
    const [eventStatus, setEventStatus] = useState(events?.register_status);

    useEffect(() => {
        const fetchEventDetailAsync = async () => {
            await fetchEventByIdentifier(route.params.id);
        };
        fetchEventDetailAsync();

<<<<<<< HEAD:src/screens/event/component/index.js
    }, []);

    console.log("route.params.id:::::::::::::::::", route.params.id);
    console.log("Event Detail:::::::::::::::::", events);
=======
    const registerEventByEventID = async eventID => {
        const response = await registerEventByIdentifier({event_id: eventID});
        if (response?.payload?.status === 200) {
            setEventStatus(true);
            ToastMessage.show('You have successfully registered this event.');
        } else {
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
>>>>>>> qa:src/screens/event/components/index.js

    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                <ImageBackground
<<<<<<< HEAD:src/screens/event/component/index.js
                    source={require('../../../assets/img/event_main_image.png')}
                    resizeMode="cover">
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
=======
                    source={{uri: events?.image}}
                    resizeMode="cover"
                    style={{height: '55%'}}>
>>>>>>> qa:src/screens/event/components/index.js
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
<<<<<<< HEAD:src/screens/event/component/index.js
                        <View style={styles.topbanner}>
                            <Text style={styles.headingText1}>Executive Coaching</Text>
                            <Text style={styles.headingText1}>Clinic On Goal Setting</Text>
=======
                        <View
                            style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
                            {!isEventLoaded && (
                                <Text style={styles.headingText1}>{events.title}</Text>
                            )}
                            <View style={styles.poe}>
                                <Text style={{fontSize: 12}}>Megatrend Workshop</Text>
                            </View>
>>>>>>> qa:src/screens/event/components/index.js
                        </View>
                    </View>

                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>
                            <View style={{flexDirection: 'column'}}>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        flexDirection: 'row',
                                    }}>
                                    <View
<<<<<<< HEAD:src/screens/event/component/index.js
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <MaterialIcons name={'event'} size={35} color={'white'}/>
                                    </View>
=======
                                        style={[
                                            styles.infoicon,
                                            {backgroundColor: backgroundColor},
                                        ]}>
                                        <MaterialIcons name={'event'} size={20} color={'white'}/>
                                    </View>

>>>>>>> qa:src/screens/event/components/index.js
                                    <View
                                        style={{
                                            flex: 4,
                                            paddingLeft: 10,
                                        }}>
                                        <Text style={styles.contentHeading}>
                                            11 August, Wednesday
                                        </Text>
                                        <Text> 09:00 pm / 11:30 pm (PDT)</Text>
                                    </View>
<<<<<<< HEAD:src/screens/event/component/index.js
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Feather
                                            name={'plus-circle'}
                                            size={35}
                                            color={'rgba(54,147,172,1)'}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
=======
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
                                <View style={styles.address}>
                                    <View
                                        style={[
                                            styles.infoicon,
                                            {backgroundColor: backgroundColor},
                                        ]}>
>>>>>>> qa:src/screens/event/components/index.js
                                        <Ionicons
                                            name={'location-outline'}
                                            size={20}
                                            color={'white'}
                                        />
                                    </View>
<<<<<<< HEAD:src/screens/event/component/index.js
                                    <View
                                        style={{
                                            flex: 4,
                                            paddingLeft: 10,
                                        }}>
                                        <Text style={styles.contentHeading}>Albany , USA</Text>
                                        <Text> Long Street, Ullam Corporis</Text>
                                    </View>
                                    <View
=======

                                    {!isEventLoaded && (
                                        <View
                                            style={{
                                                flex: 4,
                                                paddingLeft: 10,
                                            }}>
                                            <Text style={styles.contentHeading}>
                                                {events?.location?.location_city}
                                                {', '}
                                                {events?.location?.location_state}
                                                {', '}
                                                {events?.location?.location_country}
                                            </Text>
                                            <Text>{events?.location?.location_address}</Text>
                                        </View>
                                    )}

                                    {eventLoading && (
                                        <View style={styles.loading1}>
                                            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80}/>
                                        </View>
                                    )}
                                    {/* <View
>>>>>>> qa:src/screens/event/components/index.js
                                        style={{
                                            flex: 1,
                                            height: 60,
                                            width: 30,
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
                            <View style={styles.seperationline}/>
                            <View>
                                <View>
                                    <Text style={styles.contentHeading}>Hosted By</Text>
                                </View>
                                <View style={styles.hostdetail}>
                                    <View
<<<<<<< HEAD:src/screens/event/component/index.js
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../../../assets/img/host_image.png')}
=======
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
>>>>>>> qa:src/screens/event/components/index.js
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 3,
                                            paddingLeft: 20,
                                        }}>
                                        <Text style={styles.contentHeading}>Andrew Deutscher</Text>
                                        <Text>Founder, Regenerate</Text>
                                    </View>
<<<<<<< HEAD:src/screens/event/component/index.js
                                    <View
                                        style={{
                                            flex: 2,
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                        }}>
                                        <Button
                                            style={{
                                                width: '85%',
                                                height: 40,
                                                backgroundColor: '#183863',
                                                borderRadius: 15,
                                            }}
=======
                                    <View style={styles.eventaddress}>
                                        {/* <Button
                                            style={styles.followbtn}
>>>>>>> qa:src/screens/event/components/index.js
                                            onPress={() => navigation.navigate('SignUp')}>
                                            <Text
                                                style={[
                                                    styles.acceptButtonText,
                                                    {fontWeight: 'bold', fontSize: 15},
                                                ]}>
                                                Follow
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.seperationline}/>
                            <View>
                                <Text style={styles.contentHeading}>Event Info</Text>
<<<<<<< HEAD:src/screens/event/component/index.js
                                <Text style={styles.contentText}>
                                    It’s time to account for the full toll that modern work is
                                    exacting on our ability to keep up with and stay ahead of the
                                    pace of change. With our boundaries broken down by a more
                                    interconnected world, time has proven to be an insufficient
                                    resource in this era. It is energy, not time, that is our most
                                    precious and undervalued resource to solve this extraordinary
                                    challenge.
                                </Text>
=======
                                {!isEventLoaded && (
                                    <HTMLView
                                        value={events?.description}
                                        style={{fontSize: 14}}
                                    />
                                )}
>>>>>>> qa:src/screens/event/components/index.js
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
<<<<<<< HEAD:src/screens/event/component/index.js
=======
            <View
                style={{
                    alignItems: 'center',
                    width: '35%',
                    marginLeft: 140,
                    marginBottom: 10,
                }}>
                <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/fristDigi.png')}
                    style={{width: '100%', height: 20}}
                />
            </View>
>>>>>>> qa:src/screens/event/components/index.js
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
<<<<<<< HEAD:src/screens/event/component/index.js
        fontSize: 22,
=======
        fontSize: 20,
>>>>>>> qa:src/screens/event/components/index.js
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
    topbanner: {
        backgroundColor: 'rgba(54,147,172,1)',
        height: 90,
        width: 318,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20,
<<<<<<< HEAD:src/screens/event/component/index.js
        borderRadius: 12,
        padding: 10,
    },
    scrollBox: {
        height: '100%',
        width: '100%',
        marginBottom: 0,
=======
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
    loading1: {
        marginLeft: 150,
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 1011,
>>>>>>> qa:src/screens/event/components/index.js
    },
});
export default Event;
