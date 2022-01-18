import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {Button} from 'native-base';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';

const Profile = (props) => {
    const {
        navigation,
        route,
        profileEvent,
        profileEventLoading,
        profileEventError,
        fetchEventsByUserIdentifier,
        cleanProfileEvent,
        profileSession,
        profileSessionLoading,
        profileSessionError,
        fetchSessionsByUserIdentifier,
        cleanProfileSession,
        profile,
        profileLoading,
        profileError,
        fetchProfileByIdentifier,
        cleanProfile,
    } = props;

    const [value, setValue] = useState('My Events');


    const _renderItems = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
                    <View style={styles.middleWrapper} key={index}>
                        <View style={styles.wrapper}>

                            <Text style={styles.text}>{item.title}</Text>

                            <Text style={{fontSize: 6, fontFamily: Typography.FONT_SF_REGULAR,}}>Hosted
                                by {item?.organizer?.term_name} {item?.organizer?.description}</Text>
                            <View style={styles.iconWrapper}>
                                <Ionicon
                                    name={'person'}
                                    size={15}
                                    color="#0B0B45"

                                />
                                <Text style={styles.text}/>
                                <Ionicon
                                    name={'calendar'}
                                    size={15}
                                    color="#0B0B45"
                                    style={{marginLeft: 20}}

                                /><Text style={styles.text}>{item.text3}</Text>
                            </View>
                            <View style={styles.iconWrapper}>
                                <Ionicon
                                    name={'time'}
                                    size={15}
                                    color="#0B0B45"


                                /><Text
                                style={styles.text}>{item?.event_meta._start_hour[0]}:{item?.event_meta._start_minute[0]}{item.event_meta._start_ampm[0]}</Text>
                                <Ionicon
                                    name={'location'}
                                    size={15}
                                    color="#0B0B45"
                                    style={{marginLeft: 20}}

                                />
                                <Text style={styles.text}>{item.location?.location_address}</Text>
                            </View>


                        </View>
                        <Button style={{height: 30, top: 40, backgroundColor: '#183863', borderRadius: 15,}}>
                            <Text style={{fontSize: 12, color: PRIMARY_BACKGROUND_COLOR}}>Upcoming</Text></Button>
                    </View>
                </TouchableOpacity>
            </View>

        );
    };

    const _renderItem = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
                    <View style={styles.middleWrapper}>

                        <View style={[styles.wrapper]}>

                            <Text style={styles.text}>{item.title}</Text>

                            <Text style={{fontSize: 6, fontFamily: Typography.FONT_SF_REGULAR,}}>Hosted
                                by {item?.organizer?.term_name} {item?.organizer?.description}</Text>
                            <View style={styles.iconWrapper}>
                                <Ionicon
                                    name={'person'}
                                    size={15}
                                    color="#0B0B45"

                                />
                                <Text style={styles.text}/>
                                <Ionicon
                                    name={'calendar'}
                                    size={15}
                                    color="#0B0B45"
                                    style={{marginLeft: 20}}

                                /><Text style={styles.text}>{item.text3}</Text>
                            </View>
                            <View style={styles.iconWrapper}>
                                <Ionicon
                                    name={'time'}
                                    size={15}
                                    color="#0B0B45"


                                /><Text
                                style={styles.text}>{item?.event_meta._start_hour[0]}:{item?.event_meta._start_minute[0]}{item.event_meta._start_ampm[0]}</Text>
                                <Ionicon
                                    name={'location'}
                                    size={15}
                                    color="#0B0B45"
                                    style={{marginLeft: 20}}

                                />
                                <Text style={styles.text}>{item.location?.location_address}</Text>
                            </View>


                        </View>
                        <Button style={{height: 30, top: 40, backgroundColor: '#183863', borderRadius: 15,}}>
                            <Text style={{fontSize: 12, color: PRIMARY_BACKGROUND_COLOR}}>Upcoming</Text></Button>

                    </View>
                </TouchableOpacity>
            </View>


        );
    };

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();
    }, []);


    useEffect(() => {
        const fetchProfileEventAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let userID = decodeUserID(token);
            await fetchEventsByUserIdentifier(userID);
        };
        fetchProfileEventAsync();

    }, []);

    useEffect(() => {
        const fetchProfileSessionAsync = async () => {
            let token1 = await getAsyncStorage(JWT_TOKEN);
            let userID = decodeUserID(token1);
            await fetchSessionsByUserIdentifier(userID);
        };
        fetchProfileSessionAsync();

    }, []);

    console.log('profile sessions', profileSession)

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();

    }, []);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
            <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
                <Image source={require("../../../assets/img/appBG.png")} style={{height: 160}}/>
                <View style={{
                    display: 'flex',
                    marginTop: -90,
                    alignContent: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>

                    <View style={{
                        zIndex: 30,
                        position: 'absolute',
                        right: 5,
                        marginTop: 10,
                        marginRight: 10
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ManageAccount')}>
                            <Font
                                name={'edit'}
                                size={20}
                                color="#C4C8CC"
                                style={{marginTop: 5, marginLeft: 5}}

                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                            <Ionicon
                                name={'settings-outline'}
                                size={20}
                                color="#C4C8CC"
                                style={{marginTop: 10, marginLeft: 5}}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileWrapper}>
                        <View style={styles.icon}>
                            <Image source={{uri: profile.avatar}} style={{width: "100%", height: "100%"}}
                                   resizeMode='cover'
                            />
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.headingText1}>{profile.display_name}</Text>
                            <Text>{profile.user_email}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <View style={styles.middle}>
                            <View style={styles.buttonWrapper}>
                                <ButtonToggleGroup
                                    highlightBackgroundColor={'white'}
                                    highlightTextColor={'#0B0B45'}
                                    inactiveBackgroundColor={'transparent'}
                                    inactiveTextColor={'grey'}
                                    values={['My Sessions', 'My Events']}
                                    value={value}
                                    onSelect={val => setValue(val)}
                                    style={{height: 40, marginTop: 5, width: '90%', marginLeft: 10,}}
                                />
                            </View>
                            {profileLoading && profileEventLoading && (
                                <>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        position: 'absolute',
                                        zIndex: 1011,
                                        top: 120,
                                        left: 120
                                    }}>
                                        <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80}/>
                                    </View>
                                </>
                            )}
                            {value === 'My Events' &&
                            <FlatList
                                Vertical
                                showsVerticalScrollIndicator={false}
                                data={profileEvent}
                                renderItem={_renderItem}
                            />
                            }
                            {value === 'My Sessions' &&
                            <FlatList
                                Vertical
                                showsVerticalScrollIndicator={false}
                                data={profileSession}
                                renderItem={_renderItems}
                            />
                            }


                        </View>
                    </View>

                </View>
                <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                    <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                    <Image
                        source={require('../../../assets/img/fristDigi.png')}
                        style={{width: "100%", height: 20}}
                    />
                </View>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        paddingLeft: 20,
        paddingRight: 20,


    },
    header: {
        alignItems: 'center',
    },
    icon: {
        width: 110,
        height: 110,
        borderColor: PRIMARY_BACKGROUND_COLOR,
        borderRadius: 16,
        borderWidth: 3,
        overflow: "hidden",
        position: "absolute",
        top: -35,
    },
    text: {
        color: '#343537',
        marginLeft: 5,
        fontFamily: Typography.FONT_SF_REGULAR,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: 22,
        fontWeight: '600',


    },
    profileWrapper: {
        padding: 20,
        alignItems: "center",
        width: 328,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        borderRadius: 12,
        position: "relative",
        paddingTop: 100,
        borderWidth: 1,
        borderColor: '#707070'
    },
    middle: {},
    wrapper: {
        width: '70%',
        marginLeft: 10,
        marginTop: 10,

    },
    middleWrapper: {
        height: 142,
        width: "100%",
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 0.5,
        marginTop: 20,

    },

    middleImage: {
        width: 40,
        height: 40,
        backgroundColor: '#3A9BDC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,

    },
    middleImage1: {
        width: 40,
        height: 40,
        backgroundColor: '#d7d7d7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    menuText: {
        fontSize: 14, fontWeight: '500', margin: 15
    },
    buttonWrapper: {
        width: 268,
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        margin: 10,
        marginTop: 15,
        marginLeft: 40,

    },

    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },
    shadowProp: {


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },


    // container: {
    //     ...CommonStyles.container,
    //     backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    //     width: "100%",
    //     height: '100%',
    // },
    // header: {
    //     width: '80%',
    //     height: 180,
    //     backgroundColor: "white",
    //     margin: 40,
    //     marginTop: 50,
    //     borderRadius: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     zIndex: 10,
    //     borderWidth: 0.5,

    // },
    // headerWrapper: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     marginTop: 20,
    // },
    // button: {
    //     marginLeft: 30,
    //     backgroundColor: '#0B0B45',
    //     borderRadius: 15,
    //     width: "47%"
    // },
    // icon: {
    //     width: 90,
    //     height: 90,
    //     backgroundColor: "white",
    //     borderRadius: 19,
    //     marginLeft: 150,
    //     marginTop: 30,
    //     justifyContent: 'center',
    //     position: 'absolute',
    //     zIndex: 20,
    //     borderWidth: 0.3,

    // },
    // textWrapper: {
    //     width: '20%',
    //     height: 30,
    //     backgroundColor: 'white',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     borderRadius: 20,
    //     position: 'absolute',
    //     zIndex: 30,
    //     marginLeft: 160, marginTop: 110, borderWidth: 0.5
    // },
    // headingText1: {
    //     ...CommonStyles.headingText1,
    //     fontFamily: Typography.FONT_NORMAL,
    //     fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
    //     fontWeight: 'bold',
    //     color: 'black',
    //     marginTop: 60,

    // },
    // middle: {
    //     height: "100%",
    //     width: "100%",
    //     backgroundColor: 'white',
    //     marginTop: 150,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // shadowProp: {
    //     shadowColor: '#171717',
    //     shadowOffset: {width: 2, height: 2},
    //     shadowOpacity: 0.2,
    //     shadowRadius: 3,
    // },
    // buttonWrapper: {
    //     width: '65%',
    //     height: 50,
    //     backgroundColor: "#ECECEC",
    //     borderRadius: 10,

    //     margin: 10,
    //     marginTop: 110,

    // },
    // btn: {
    //     width: '40%',
    //     height: 50
    // },
    // middleWrapper: {
    //     height: 150,
    //     width: "100%",
    //     borderRadius: 15,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     borderWidth: 0.5,
    //     marginTop: 10,
    //     marginBottom: 10,
    //     // backgroundColor:"red"
    // },

    // wrapper: {
    //     width: '70%',
    //     marginLeft: 10,
    //     marginTop: 10,
    //     // backgroundColor:"green",

    // },
    // iconWrapper: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     marginLeft: 10,
    //     marginTop: 10,
    // },

    // middleImage: {
    //     width: 40,
    //     height: 40,
    //     backgroundColor: '#3A9BDC',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 10,
    //     marginLeft: 10,
    //     marginTop: 10,
    // },
    // middleImage1: {
    //     width: 40,
    //     height: 40,
    //     backgroundColor: '#d7d7d7',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 10,
    //     marginLeft: 10,
    //     marginTop: 10,
    // },
});

export default Profile;

