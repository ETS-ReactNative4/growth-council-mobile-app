import React, {useEffect, useState} from 'react';
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
import ButtonToggleGroup from 'react-native-button-toggle-group';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from "../../../shared/toast";

const CoachingSession = props => {
    const {
        navigation,
        route,
    } = props;

    // const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
    // const date = actualDate[1].split(' ', 3);

	const [value, setValue] = useState('About');

    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
              
                    
                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>

							<View style={styles.buttonWrapper}>
                                <ButtonToggleGroup
                                    highlightBackgroundColor={'white'}
                                    highlightTextColor={'#0B0B45'}
                                    inactiveBackgroundColor={'transparent'}
                                    inactiveTextColor={'grey'}
                                    values={['About', 'Self Assessment']}
                                    value={value}
                                    onSelect={val => setValue(val)}
                                    style={{height: 40, marginTop: 5, width: '90%', marginLeft: 10,}}
                                />
                            </View>
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
                                         
                                            <Text style={styles.contentHeading}>
												11 Augest, Wednesday
                                            </Text>
                                            <Text>
                                               09:00 pm / 11:30 pm (PDT)
                                            </Text>
                                        
                                    
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
								
										{/* <View
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
										</View> */}
								
                              
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

                                    
                                        <View
                                            style={{
                                                flex: 4,
                                                paddingLeft: 10,
                                            }}>
                                            <Text style={styles.contentHeading}>
                                                Albany USA
                                            </Text>
                                            <Text>
												Long Street, Ullam Corporis
											</Text>
                                        </View>
                                    
                                   
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
                                    style={styles.hostdetail}>
                                    <View
                                        style={styles.hostimage}>
                                        <Image source={require('../../../assets/img/welcome_profile_image.png')} style={{width: 30, height: 60}}/>
                                    </View>

                                    <View
                                        style={{
                                            flex: 3,
                                            paddingLeft: 20,
                                        }}>
                                        <Text style={styles.contentHeading}>
                                            Andrew Deutscher
                                        </Text>
                                        <Text>
											Founder, Regenerate
										</Text>
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
                                        
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.contentHeading}>Session Brief</Text>
                                
                            </View>

							<View style={{justifyContent: 'center', alignItems: 'center'}}>
								{/* {!sessions?.register_status && ( */}
								<Button
									style={styles.acceptButton}
									// onPress={() => registerEventByEventID(route?.params?.id)}
									>
									<Text style={styles.acceptButtonText}>
									Sign Up in One Click
									</Text>
								</Button>
								{/* )}
								{sessions?.register_status && (
								<TouchableOpacity style={styles.registeredButton}>
									<View style={{paddingLeft: 10}}>
									<Image
										source={require('../../../assets/img/tick-icon.png')}
										style={{width: 30, height: 30}}
									/>
									</View>
									<Text style={styles.registeredButtonText}>Registered</Text>
								</TouchableOpacity>
								)} */}
              		</View>
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
        width: 300,
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 10,
    
        

    },
});
export default CoachingSession;
