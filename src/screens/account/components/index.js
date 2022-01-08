import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    FlatList,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {Button} from 'native-base';
import {BubblesLoader} from 'react-native-indicator';

const Profile = (props) => {
    const {
        navigation,
        route,
        profileEvent,
        profileEventLoading,
        profileEventError,
        fetchEventsByUserIdentifier,
        cleanProfileEvent,
        profile,
        profileLoading,
        profileError,
        fetchProfileByIdentifier,
        cleanProfile,
    } = props;

    const [value, setValue] = useState('My Events');

    const data = [
        {
            text: 'Executive Coaching Clinic On Goal Setting',
            text1: 'Hosted by Michael Cooper',
            text2: "3 persons",
            text3: "17 June 2021",
            text4: "10:00 am",
            text5: "Minima Room",
        },
        {
            text: 'Associate Member Meeting',
            text1: 'Hosted by Michael Cooper',
            text2: "3 persons",
            text3: "17 June 2021",
            text4: "10:00 am",
            text5: "Minima Room",
        },
        {
            text: 'Executive Coaching Clinic On Goal Setting',
            text1: 'Hosted by Michael Cooper',
            text2: "3 persons",
            text3: "17 June 2021",
            text4: "10:00 am",
            text5: "Minima Room",
        },
        {
            text: 'Associate Member Meeting',
            text1: 'Hosted by Michael Cooper',
            text2: "3 persons",
            text3: "17 June 2021",
            text4: "10:00 am",
            text5: "Minima Room",
        },

    ];

	const _renderItems = ({item, index}) => {
        return (
            <View style={[styles.middleWrapper, styles.shadowProp]}>
                <View style={styles.wrapper}>
                    <Text style={{fontSize: 15, fontWeight: "bold", color: "black"}}>{item.text}</Text>
                    <Text style={{fontSize: 10}}>{item.text1}</Text>
                    <View style={styles.iconWrapper}>
                        <Ionicon
                            name={'person'}
                            size={15}
                            color="#0B0B45"

                        />
						<Text style={{color: 'black', marginLeft: 5}}></Text>
                        <Ionicon
                            name={'calendar'}
                            size={15}
                            color="#0B0B45"
                            style={{marginLeft: 20}}

                        /><Text style={{color: 'black', marginLeft: 5}}>{item.text3}</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Ionicon
                            name={'time'}
                            size={15}
                            color="#0B0B45"


                        /><Text style={{color: 'black', marginLeft: 5}}>{item?.text4}</Text>
                        <Ionicon
                            name={'location'}
                            size={15}
                            color="#0B0B45"
                            style={{marginLeft: 20}}

                        />
						<Text style={{color: 'black', marginLeft: 5}}>{item?.text5}</Text>
                    </View>


                </View>
                <Button style={{height: 40, top: 40, backgroundColor: "#0B0B45", borderRadius: 15}}>Upcoming</Button>
            </View>

        );
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={[styles.middleWrapper, styles.shadowProp]}>
                <View style={styles.wrapper}>
                    <Text style={{fontSize: 15, fontWeight: "bold", color: "black"}}>{item.title}</Text>
                    <Text style={{fontSize: 10}}>Hosted by {item?.organizer?.term_name} {item?.organizer?.description}</Text>
                    <View style={styles.iconWrapper}>
                        <Ionicon
                            name={'person'}
                            size={15}
                            color="#0B0B45"

                        />
						<Text style={{color: 'black', marginLeft: 5}}></Text>
                        <Ionicon
                            name={'calendar'}
                            size={15}
                            color="#0B0B45"
                            style={{marginLeft: 20}}

                        /><Text style={{color: 'black', marginLeft: 5}}>{item.text3}</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Ionicon
                            name={'time'}
                            size={15}
                            color="#0B0B45"


                        /><Text style={{color: 'black', marginLeft: 5}}>{item?.event_meta._start_hour[0]}:{item?.event_meta._start_minute[0]}{item.event_meta._start_ampm[0]}</Text>
                        <Ionicon
                            name={'location'}
                            size={15}
                            color="#0B0B45"
                            style={{marginLeft: 20}}

                        />
						<Text style={{color: 'black', marginLeft: 5}}>{item.location?.location_address}</Text>
                    </View>


                </View>
                <Button style={{height: 40, top: 40, backgroundColor: "#0B0B45", borderRadius: 15}}>Upcoming</Button>
            </View>

        );
    };

    useEffect(() => {
        const fetchProfileEventAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let userID = decodeUserID(token);
            await fetchEventsByUserIdentifier(userID);
        };
        fetchProfileEventAsync();

    }, []);

    console.log("profileEvent::::::::::::::::::::;", profileEvent);

    useEffect(() => {
        const fetchProfileAsync = async () => {
            // let token = await getAsyncStorage(JWT_TOKEN);
            // let userID = decodeUserID(token);
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();

    }, []);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,}}>
            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover">


                    <View style={{height: '100%', marginTop: 30}}>
                        <View style={{
                            marginTop: 80,
                            justifyContent: 'center',
                            position: 'absolute',
                            zIndex: 20,
                            marginLeft: 310
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageAccount')}>
                                <Font
                                    name={'edit'}
                                    size={20}
                                    color="#808080"
                                    style={{marginTop: 5, marginLeft: 5}}

                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                                <Ionicon
                                    name={'settings-outline'}
                                    size={20}
                                    color="#808080"
                                    style={{marginTop: 10, marginLeft: 5}}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.icon}>
                            <Image source={{uri: profile.avatar}}
                                   style={{width: 90, height: 90, borderRadius: 19,}}
                            />

                        </View>
                        <View style={styles.textWrapper}>
                            <Ionicon
                                name={'star'}
                                size={20}
                                color="yellow"
                                style={{marginTop: 5, marginLeft: 5}}

                            />
                            <Text style={{fontSize: 18, marginTop: 5}}>1457</Text>
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.headingText1}>{profile?.display_name} </Text>
                            <Text style={{width: '60%', marginLeft: 40}}>{profile?.user_email} </Text>
                        </View>

						
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
							{profileLoading && (
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
									data={data}
									renderItem={_renderItems}
								/>
							}

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
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        height: '100%',
    },
    header: {
        width: '80%',
        height: 180,
        backgroundColor: "white",
        margin: 40,
        marginTop: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        borderWidth: 0.5,

    },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        marginLeft: 30,
        backgroundColor: '#0B0B45',
        borderRadius: 15,
        width: "47%"
    },
    icon: {
        width: 90,
        height: 90,
        backgroundColor: "white",
        borderRadius: 19,
        marginLeft: 150,
        marginTop: 30,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 20,
        borderWidth: 0.3,

    },
    textWrapper: {
        width: '20%',
        height: 30,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        position: 'absolute',
        zIndex: 30,
        marginLeft: 160, marginTop: 110, borderWidth: 0.5
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 60,

    },
    middle: {
        height: "100%",
        width: "100%",
        backgroundColor: 'white',
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonWrapper: {
        width: '65%',
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 10,

        margin: 10,
        marginTop: 110,

    },
    btn: {
        width: '40%',
        height: 50
    },
    middleWrapper: {
        height: 150,
        width: "100%",
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor:"red"
    },

    wrapper: {
        width: '70%',
        marginLeft: 10,
        marginTop: 10,
        // backgroundColor:"green",

    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },

    middleImage: {
        width: 40,
        height: 40,
        backgroundColor: '#3A9BDC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    middleImage1: {
        width: 40,
        height: 40,
        backgroundColor: '#d7d7d7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
    },
});

export default Profile;

