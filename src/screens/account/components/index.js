import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
	Dimensions
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {Button} from 'native-base';
import {BubblesLoader} from 'react-native-indicator';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';


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

    const [value, setValue] = useState('My Sessions');

    const _renderItems = ({item, index}) => {
		const actualDate = moment(item?.event_start).format('LLLL').split(',', 6);
		const date = actualDate[1].split(' ', 3);
        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SessionDetail', {id: item.ID})}>
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

                                /><Text style={styles.text}>{date[2]} {date[1]}</Text>
                            </View>
                            <View style={styles.iconWrapper}>
                                <Ionicon
                                    name={'time'}
                                    size={15}
                                    color="#0B0B45"
                                />
                                <Text
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
                        <Button style={{height: 35, top: 40, backgroundColor: '#183863', borderRadius: 15,}}>
                            <Text style={{fontSize: 10, color: PRIMARY_BACKGROUND_COLOR}}>Upcoming</Text></Button>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderItem = ({item, index}) => {
		const actualDate = moment(item?.event_start).format('LLLL').split(',', 6);
		const date = actualDate[1].split(' ', 3);
		console.log(date[2])
        return (
            <View key={index}>
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

                                /><Text style={styles.text}>{date[2]} {date[1]}</Text>
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
                        <Button style={{height: 35, top: 40, backgroundColor: '#183863', borderRadius: 15, }}>
                            <Text style={{fontSize: 10, color: PRIMARY_BACKGROUND_COLOR}}>Upcoming</Text></Button>

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

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();

    }, []);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: PRIMARY_BACKGROUND_COLOR,}}>
            <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR, justifyContent:"center", alignContent:"center"}}>
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
                                   resizeMode='cover'/>
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
            </View>
			<Footer />
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        paddingLeft: 20,
        paddingRight: 20,
		justifyContent:'center',
		alignContent:'center'
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
    middle: {
		justifyContent:'center',
		alignContent:'center',
	},
    wrapper: {
        width:Platform.OS === 'ios' ? "65%" : "70%",
        marginLeft: 10,
        marginTop: 10,
    },
    middleWrapper: {
		paddingBottom:20,
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
        width: 267,
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        margin: 10,
        marginTop: 15,
		marginLeft:Platform.OS === 'ios' ? 10 : 40,
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
});

export default Profile;

