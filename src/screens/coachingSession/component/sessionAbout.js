import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';

const sessionAbout = props => {
    const {
        navigation,
        route,
        traits,
        traitsLoading,
        traitsError,
        fetchAllTraitBySession,
        cleanTraits,

        sessions,
        sessionLoading,
        sessionError,
        fetchSessionByIdentifier,
        cleanSession,

        sessionRegisters,
        sessionRegisterLoading,
        sessionRegisterError,
        registerSessionByIdentifier,
        cleanSessionRegister,
    } = props;

    const toast = useToast();
    const [sessionStatus, setSessionStatus] = useState(sessions?.register_status);

	
	useEffect(() => {		
	  setSessionStatus(sessions?.register_status);	
	}, [sessions]);

    const registerSessionBySessionID = async sessionID => {
        const response = await registerSessionByIdentifier({session_id: sessionID});
        if (response?.payload?.code === 200) {	
            setSessionStatus(true);
            ToastMessage.show('You have successfully registered this event.');
        } else {	
            toast.closeAll();
            ToastMessage.show(response?.payload?.message);
        }
    };

    let description = sessions?.descirption;
    if (description !== undefined) {
        description = sessions?.descirption;
    } else {
        description = '';
    }

    const isSessionLoaded = Object.keys(sessions).length === 0;
    const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

    const _renderItem = ({item, index}, navigation) => {
        return (
            <View>
                <View style={styles.traitWrapper}>
                    <View style={[styles.traitW, styles.shadowProp]}>
                        <Image
                            source={{uri: item?.image}}
                            style={{width: 25, height: 25}}
                        />
                    </View>

                    <Text style={{padding: 10, width: 100}}>{item?.title}</Text>
                </View>
            </View>
        );
    };

    return (
        <View>
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
                            backgroundColor: '#A1BA68',
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
                        {!isSessionLoaded && (
                            <Text style={styles.contentHeading}>
                                {date[2]} {date[1]}, {actualDate[0]}
                            </Text>
                        )}

                        {!isSessionLoaded && (
                            <Text>
                                {sessions?.event_meta?._start_hour}:
                                {sessions?.event_meta?._start_minute}
                                {sessions?.event_meta?._start_ampm} /
                                {sessions?.event_meta?._end_hour}:
                                {sessions?.event_meta?._end_minute}
                                {sessions?.event_meta?._end_ampm}
								{'\n'}
								{sessions?.time_zone}
                            </Text>
                        )}
                    </View>
                    {!sessionStatus && (
                        <View
                            style={{
                                flex: 1,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={async() => await registerSessionBySessionID(sessions?.ID)}>
                                <Feather
                                    name={'plus-circle'}
                                    size={35}
                                    color={'rgba(54,147,172,1)'}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    {sessionStatus && (
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
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#A1BA68',
                            height: 60,
                            width: 48,
                            borderRadius: 14,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Ionicons name={'location-outline'} size={35} color={'white'}/>
                    </View>

                    {!isSessionLoaded && (
                        <View
                            style={{
                                flex: 5,
                                paddingLeft: 10,
                            }}>
                            <Text style={styles.contentHeading}>
                                {sessions?.location?.location_city} ,
                                {sessions?.location?.location_state} ,
                                {sessions?.location?.location_country}
                            </Text>
                            <Text>{sessions?.location?.location_address}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View>
                <View style={{marginTop: 20}}>
                    <Text style={styles.contentHeading}>Traits</Text>
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={traits}
                    renderItem={item => _renderItem(item, navigation)}
                />
            </View>

            <View style={{height: 150}}>
                <View style={{marginTop: 25}}>
                    <Text style={styles.contentHeading}>Coached By</Text>
                </View>
                <View style={styles.hostdetail}>
                    <View style={styles.hostimage}>
                        <Image
                            source={{uri: sessions?.organizer_image}}
                            style={{width: '100%', height: '100%'}}
                        />
                    </View>

                    <View
                        style={{
                            flex: 3,
                            paddingLeft: 20,
                        }}>
                        <Text style={styles.contentHeading}>
                            {sessions?.organizer?.term_name}
                        </Text>
                        <Text>{sessions?.organizer?.description}</Text>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            height: 60,
                            width: 30,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}/>
                </View>
            </View>

            <View>
                <Text style={styles.contentHeading}>Session Brief</Text>
                {!isSessionLoaded && (
                    <HTMLView value={description} stylesheet={styles}/>
                )}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {!sessionStatus && (
                    <Button
                        style={styles.acceptButton}
                        onPress={async () => await registerSessionBySessionID(sessions?.ID)}>
                        <Text style={styles.acceptButtonText}>Sign Up in One Click</Text>
                    </Button>
                )}
                {sessionStatus && (
                    <TouchableOpacity style={styles.registeredButton} disabled>
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
        borderTopStartRadius: 20,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffff',
    },
    contentHeading: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        color: Colors.NONARY_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
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
    topbanner: {
        backgroundColor: '#A1BA68',
        height: 60,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
        borderRadius: 12,
        padding: 20,
        zIndex: 10,
        position: 'absolute',
    },
    topbanner1: {
        backgroundColor: 'rgba(54,147,172,1)',
        height: 100,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
    },
    topbanner2: {
        backgroundColor: 'rgba(128,186,116,1)',
        height: 100,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
    },
    scrollBox: {
        height: '100%',
        width: '100%',
        marginBottom: 0,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
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
        backgroundColor: '#A1BA68',
        height: 64,
        width: 62,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonWrapper: {
        width: 308,
        height: 40,
        backgroundColor: '#ECECEC',
        borderRadius: 15,
    },
    traitWrapper: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    traitW: {
        height: 60,
        width: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 5,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default sessionAbout;
