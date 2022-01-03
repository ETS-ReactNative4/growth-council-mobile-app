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

const Event = props => {

    const {navigation, route, events, eventLoading, eventError, fetchEventByIdentifier, cleanEvent} = props;

    useEffect(() => {
        const fetchEventDetailAsync = async () => {
            await fetchEventByIdentifier(route.params.id);
        };
        fetchEventDetailAsync();

    }, []);

    console.log("route.params.id:::::::::::::::::", route.params.id);
    console.log("Event Detail:::::::::::::::::", events);

    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../../assets/img/event_main_image.png')}
                    resizeMode="cover">
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <View style={styles.topbanner}>
                            <Text style={styles.headingText1}>Executive Coaching</Text>
                            <Text style={styles.headingText1}>Clinic On Goal Setting</Text>
                        </View>
                    </View>
                    <View
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
                    </View>
                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>
                            <View style={{height: 150, flexDirection: 'column'}}>
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
                                        <MaterialIcons name={'event'} size={35} color={'white'}/>
                                    </View>
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
                                        <Ionicons
                                            name={'location-outline'}
                                            size={35}
                                            color={'white'}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 4,
                                            paddingLeft: 10,
                                        }}>
                                        <Text style={styles.contentHeading}>Albany , USA</Text>
                                        <Text> Long Street, Ullam Corporis</Text>
                                    </View>
                                    <View
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

                            <View style={{height: 150}}>
                                <View style={{marginTop: 25}}>
                                    <Text style={styles.contentHeading}>Hosted By</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                        marginTop: 10,
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
                                        <Image
                                            source={require('../../../assets/img/host_image.png')}
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

                            <View>
                                <Text style={styles.contentHeading}>Event Info</Text>
                                <Text style={styles.contentText}>
                                    It’s time to account for the full toll that modern work is
                                    exacting on our ability to keep up with and stay ahead of the
                                    pace of change. With our boundaries broken down by a more
                                    interconnected world, time has proven to be an insufficient
                                    resource in this era. It is energy, not time, that is our most
                                    precious and undervalued resource to solve this extraordinary
                                    challenge.
                                </Text>
                            </View>

                            <View>
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
        fontWeight: 'bold',
        fontSize: 17,
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
    acceptButtonText: {
        color: '#ffffff',
    },
    topbanner: {
        backgroundColor: 'rgba(54,147,172,1)',
        height: 100,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20,
        borderRadius: 12,
        padding: 10,
    },
    scrollBox: {
        height: '100%',
        width: '100%',
        marginBottom: 0,
    },
});
export default Event;
