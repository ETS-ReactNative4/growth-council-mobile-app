import React, {useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import {Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from "../../../shared/toast";

const Session = props => {
    const {
        navigation,
        route,
		sessions,
		sessionLoading,
		sessionError,
		fetchSessionByIdentifier,
		cleanSession
       
    } = props;

	useEffect(() => {
        const fetchSessionDetailAsync = async () => {
            await fetchSessionByIdentifier(route.params.id);
        };
        fetchSessionDetailAsync();
    }, []);

	const isSessionLoaded = Object.keys(sessions).length === 0;
    const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                <ImageBackground
                    source={{uri:sessions?.image}}
                    resizeMode="cover"
                    style={{height: '55%'}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                        }}>

                        <View style={styles.topbanner}>
							{!isSessionLoaded && (
                                <Text style={styles.headingText1}>{sessions?.title}</Text>
							)}
                        </View>
                    </View>
                    {/* <View
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
                    </View> */}
                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>
                            <View style={{height: 150, flexDirection: 'column', marginTop:20}}>
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
                                                {sessions?.event_meta?._end_ampm} (PDT)
                                            </Text>
                                        )}
                                    
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

                                        <TouchableOpacity>
                                            <Feather
                                                name={'plus-circle'}
                                                size={35}
                                                color={'rgba(54,147,172,1)'}
                                            />
                                        </TouchableOpacity>
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
                                            backgroundColor: '#A1BA68',
                                            height: 60,
                                            width:30,
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

                                    {!isSessionLoaded && (
                                        <View
                                            style={{
                                                flex: 4,
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

							<View >
								<View style={{marginTop:20}}>
									<Text style={styles.contentHeading}>Traits</Text>
								</View>
								
								<View style={{display:'flex', flexDirection:'row'}}>
									<View 
									style={{
										paddingTop: 5,
										paddingBottom: 5,
										flexDirection: 'row',}}>
												
											<View
											style={{
											
												height: 60,
												width: 60,
												borderRadius: 15,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor:'white',
												borderWidth:0.3
											}}>
											<Ionicons
												name={'medkit'}
												size={30}
												color={'#A1BA68'}
											/>
										</View>

										<Text style={{ padding:20}}>Trait 1</Text>
									</View>

									<View 
									style={{
										paddingTop: 5,
										paddingBottom: 5,
										flexDirection: 'row',}}>
												
											<View
											style={{
											
												height: 60,
												width: 60,
												borderRadius: 15,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor:'white',
												borderWidth:0.3
											}}>
											<Ionicons
												name={'medkit'}
												size={30}
												color={'#A1BA68'}
											/>
										</View>

										<Text style={{padding:20}}>Trait 2</Text>
									</View>
								</View>
								
							</View>
							

                            <View style={{height: 150}}>
                                <View style={{marginTop: 25}}>
                                    <Text style={styles.contentHeading}>Coached By</Text>
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
                                            backgroundColor: '#A1BA68',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image source={{uri:sessions?.organizer_image}} style={{width: 30, height: 60}}/>
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
                                        }}>
                                        {/* <Button
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
                                        </Button> */}
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.contentHeading}>Event Info</Text>
                                {!isSessionLoaded && (
                                    <HTMLView value={sessions?.description} stylesheet={styles}/>
                                )}
                            </View>

                            <View>
                                <Button
                                    style={styles.acceptButton}
                                    onPress={() => registerEventByEventID(route?.params?.id)}>
                                    <Text style={styles.acceptButtonText}>
                                        Sign Up in One Click
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

            </View>
            <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/fristDigi.png')}
                    style={{width: "100%", height: 20}}
                />
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
		marginTop:170,
		borderTopStartRadius:20,
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
        backgroundColor: '#A1BA68',
        height: 60,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
        borderRadius: 12,
        padding: 20,
		zIndex:10,
		position:'absolute'
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
});
export default Session;
