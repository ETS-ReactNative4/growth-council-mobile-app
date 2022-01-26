import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity, Modal,Pressable
} from 'react-native';

import SelfAssessment from './selfAssessment';
import SessionAbout from './sessionAbout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {CommonStyles, Colors, Typography} from '../../../theme';

const CoachingSession = props => {
    const {
        navigation,
        route,
    } = props;

	const [value, setValue] = useState('About');
   
	const [modalVisible, setModalVisible] = useState(false);

	const [display, setDisplay] = useState(true);
	
    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
              
                    
                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>
							<View style={{display:'flex', flexDirection:'row'}}>
								<View style={styles.buttonWrapper}>
									<ButtonToggleGroup
										highlightBackgroundColor={'white'}
										highlightTextColor={'#0B0B45'}
										inactiveBackgroundColor={'transparent'}
										inactiveTextColor={'grey'}
										values={['About', 'Self Assessment']}
										value={value}
										onSelect={val => setValue(val)}
										style={{height: 30, marginTop: 5, width: '90%', marginLeft: 10, fontSize:12, borderRadius:15}}
									/>
								</View>
								{ display?
								<TouchableOpacity
										onPress={() => setModalVisible(true)}
										onPressIn={() => {
											setDisplay(!display)
										  }}
								>
									<Ionicons name={'menu'} size={35} color={'black'} style={{marginLeft:15}}/>
								</TouchableOpacity>
								:
								<TouchableOpacity
									onPress={() => setModalVisible(!modalVisible)}
									onPressIn={() => {
										setDisplay(!display)
									  }}
								>
									<Ionicons name={'close'} size={35} color={'black'} style={{marginLeft:15}}/>
								</TouchableOpacity>
								}
								<View style={styles.centeredView}>
									<Modal
										animationType="slide"
										transparent={true}
										visible={modalVisible}
										onRequestClose={() => {
										Alert.alert("Modal has been closed.");
										setModalVisible(!modalVisible);
										}}
									>
										<View>
										
										<View style={styles.modalView}>
										<View style={styles.wrapper}>
											<View style={styles.traitWrapper}>							
												<View style={[styles.traitW, styles.shadowProp]}>
													<Ionicons
														name={'medkit-sharp'}
														size={30}
														color={'#A1BA68'}
													/>
												</View>

												<Text style={{ padding:20}}>Traits 1</Text>
											</View>
											<View 
											style={{flexDirection: 'row',}}>
												<Text style={{marginTop:20}}>Score</Text>
												<View style={{width:60, height:30, marginLeft:5,backgroundColor:"orange", borderRadius:50,padding:5, marginTop:15, alignItems:"center"}}>
													<Text>2.0</Text>
												</View>
											</View>
											
										</View>

										<View style={{marginTop:10, marginLeft:80}}>
											<View style={[styles.textStyle, styles.shadowProp]}>
												<Text>Sub Traits 1</Text>
												<Ionicons
														name={'checkmark-outline'}
														size={25}
														color={'#A1BA68'}
													/>
												
											</View>
											<View style={[styles.textStyle, styles.shadowProp]}>
												<Text>Sub Traits 2</Text>
											</View>
											<View style={[styles.textStyle, styles.shadowProp]}>
												<Text>Sub Traits 3</Text>
											</View>
										</View>


										<View style={styles.wrapper}>
											<View style={styles.traitWrapper}>							
												<View style={[styles.traitW, styles.shadowProp]}>
													<Ionicons
														name={'medkit-sharp'}
														size={30}
														color={'#A1BA68'}
													/>
												</View>

												<Text style={{ padding:20}}>Traits 2</Text>
											</View>
											
											
										</View>
									

										<View style={{marginTop:10, marginLeft:80, marginBottom:20}}>
												<View style={[styles.textStyle, styles.shadowProp]}>
													<Text>Sub Traits 4</Text>
												</View>
												<View style={[styles.textStyle, styles.shadowProp]}>
													<Text>Sub Traits 5</Text>
												</View>
												<View style={[styles.textStyle, styles.shadowProp]}>
													<Text>Sub Traits 6</Text>
												</View>
										</View>
										
											<Pressable
											style={[styles.button, styles.buttonClose]}
											onPress={() => setModalVisible(!modalVisible)}
											>
											<Text style={styles.textS}>Hide Modal</Text>
											</Pressable>
										</View>
										</View>
									</Modal>
									
								</View>
								
								
								
							</View>

							<View style={{marginTop:32}}>
							{value === 'About' &&
								<SessionAbout  
								{...props}/>
                            }
                            {value === 'Self Assessment' &&
								<SelfAssessment
								{...props}/>
                            }
							</View>
							
							
                        </View>
                    </View>
               

            </View>
            {/* <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/fristDigi.png')}
                    style={{width: "100%", height: 20}}
                />
            </View> */}
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
        width: 308,
        height: 40,
        backgroundColor: "#ECECEC",
        borderRadius: 15,
    },
	centeredView: {
		flex: 1,
		marginTop: 22,
	

	  },
	wrapper:{
		display:'flex',
		flexDirection:'row',
		justifyContent:"space-between",
		borderBottomWidth:0.2,
		paddingBottom:5,
		 paddingLeft:10,
		  borderBottomColor:"#EBECFO",
		  marginTop:10,
	  },
	traitWrapper:{
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection: 'row',
	},
	traitW:{
		height: 60,
		width: 60,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'white',
		
	},
	  modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding:10,
		shadowColor: "#000",
		marginTop:110,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	  },
	  button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	  },
	  buttonOpen: {
		backgroundColor: "#F194FF",
	  },
	  buttonClose: {
		backgroundColor: "#2196F3",
	  },
	  textS: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	  },
	  textStyle:{
		width:220, 
		backgroundColor: '#ffff',
        height: 40,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginLeft: 10,
		marginTop:5,
		marginBottom:5,
		marginRight:10,
		padding:10,
		paddingLeft:20, 
		flexDirection:'row'
		
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
export default CoachingSession;
