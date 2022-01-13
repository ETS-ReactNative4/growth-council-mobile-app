import { position } from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    Switch,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';
import { PRIMARY_BACKGROUND_COLOR } from '../../../theme/colors';
import {clearAsyncStorage} from '../../../utils/storageUtil';

const Setting = (props) => {
    const {
        navigation,
        route,
        upcomingEvents,
        upcomingEventLoading,
        upcomingEventError,
        fetchAllUpcomingEvent,
        cleanUpcomingEvent,
        profile,
        profileLoading,
        profileError,
        fetchProfile,
        cleanProfile,
    } = props;

	
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfile();
        };
        fetchProfileAsync();

    }, []);

    const logout = () => {
        clearAsyncStorage();
        navigation.navigate('Home')
		ToastMessage.show('Your have successfully logout');
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:PRIMARY_BACKGROUND_COLOR}}>
			<View style={{backgroundColor:PRIMARY_BACKGROUND_COLOR}}>
			<Image source={require("../../../assets/img/appBG.png")} style={{height:160}}/>
						<View style={{display:'flex', marginTop:-90,alignContent:'center', marginLeft:'auto', marginRight:'auto'}}>
								<View style={{ padding:20,alignItems:"center", 
									width:328,backgroundColor:PRIMARY_BACKGROUND_COLOR, borderRadius:12, position:"relative",
									paddingTop:100, borderWidth: 1 , borderColor:'#707070'}}>
										<View style={styles.icon}>
											<Image source={{uri: profile.avatar}} style={{width:"100%", height:"100%"}} resizeMode='cover'
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
                            <View style={styles.wrapper}>

                                <View style={styles.middleWrapper}>

                                    <View style={styles.middleImage}>
                                        <Ionicons
                                            name="person-outline"
                                            color='white'
                                            size={20}/>
                                    </View>
                                    <Text style={styles.menuText}>Account</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ManageAccount')} style={{right:0,  position:'absolute'}}>
                                        <Ionicons
                                            name='chevron-forward-outline'
                                            size={20}
                                            color='#d7d7d7'
                                            
                                        />
                                    </TouchableOpacity>

                                </View>


                                <View style={styles.middleWrapper}>
                                    <View style={styles.middleImage}>
                                        <Material
                                            name={'payment'}
                                            size={20}
                                            color="white"

                                        />
                                    </View>
                                    <Text style={styles.menuText}>Payment Method</Text>
                                    <Ionicons
                                        name='chevron-forward-outline'
                                        size={20}
                                        color='#d7d7d7'
                                        style={{right:0 ,  position:'absolute'}}
                                    />

                                </View>
                                <View style={[styles.middleWrapper,{borderBottomWidth:0}]}>
                                    <View style={styles.middleImage}>
                                        <Ionicons
                                            name={'notifications'}
                                            size={20}
                                            color="white"

                                        />
                                    </View>
                                    <Text style={styles.menuText}>Notification</Text>

                                    <Switch
                                        trackColor={{false: "#767577", true: "#32a32e"}}
                                        thumbColor={isEnabled ? "white" : "white"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                        style={{transform: [{scaleX: 1.4}, {scaleY: 1.5}], right:0, position:'absolute'}}
                                    />

                                </View>
                            </View>
                            <View style={styles.wrapper}>

                                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                                    <View style={styles.middleWrapper}>
                                        <View style={styles.middleImage1}>
                                            <Ionicons
                                                name={'headset'}
                                                size={20}
                                                color="white"

                                            />
                                        </View>
                                        <Text style={styles.menuText}>Help</Text>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                                    <View style={styles.middleWrapper}>
                                        <View style={styles.middleImage1}>
                                            <Ionicons
                                                name={'lock-closed-outline'}
                                                size={20}
                                                color="white"

                                            />
                                        </View>
                                        <Text style={styles.menuText}>Privacy Policy</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={logout}>
                                    <View style={[styles.middleWrapper,{borderBottomWidth:0}]}>
                                        <View style={styles.middleImage1}>
                                            <Material
                                                name={'logout'}
                                                size={20}
                                                color="white"
                                            />
                                        </View>
                                        <Text style={styles.menuText}>Logout</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

						
                           

                        </View>
                    </View>
                
            </View>
			</View>
			<View style={{ alignItems:'center', width:'35%',marginLeft:140, marginBottom:10}}>
								<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
								<Image 
									source={require('../../../assets/img/fristDigi.png')}
									style={{width:"100%", height:20}}
								/>
							</View>
			
        </ScrollView>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
		paddingLeft:50,
		paddingRight:50,
		
    },
    header: {    
     alignItems:'center',
    },
    icon: {
        width: 110,
        height: 110,
        borderColor:PRIMARY_BACKGROUND_COLOR,
        borderRadius: 16,
        borderWidth: 3,
		overflow:"hidden",
		position:"absolute",
		top:-35,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: 22,
        fontWeight: '600',
    },
    middle: {
     
    },
    wrapper: {
        marginTop: 35,
    },
    middleWrapper: {
        display: 'flex',
        flexDirection: 'row',
		paddingTop:15,
		paddingBottom:15,
		borderBottomWidth:1 ,
		alignItems:'center',
		borderBottomColor:'#EDF1F7',
		position:'relative',
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
	menuText:{
		fontSize: 14, fontWeight: '500', margin: 15
	}

})
