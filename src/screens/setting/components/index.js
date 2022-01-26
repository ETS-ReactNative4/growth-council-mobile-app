<<<<<<< HEAD
import React,{useState} from 'react'
import { StyleSheet,
	Text,
	View,
	ScrollView, 
	ImageBackground, 
	Dimensions,
	Image, Switch, TouchableOpacity} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
// import Switch from 'react-native-switch-toggles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import ToggleSwitch from 'toggle-switch-react-native';


const screenHeight = Math.round(Dimensions.get('window').height);

const Setting = ({navigation}) => {
	const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	return (
		<ScrollView contentContainerStyle={{flexGrow: 1,}} >
			<View style={styles.container} >
				<ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover" >
				<View style={{display:'flex', flexDirection:'row'}}>
						<Image
							source={require("../../../assets/img/dashboard_logo.png")}
							style={{
								position: 'absolute',
								top: 20,
								height: 30,
								width: 30,
								left: 10,
								borderWidth: 5,
							}}
						/>
						<View style={{marginLeft:50,}}>
						
						<Text style={{fontWeight:"700",  color:"white", fontSize:20, marginTop:20}}>Settings</Text>
						</View>

						<Font
							name={'search'}
							size={30}
							color="white"
							style={{marginLeft:170, marginTop:20}}
						/>
						<Image
						source={require("../../../assets/img/profile_image.png")}
						style={{
							height: 40,
							width:40,
							marginTop:10,
							marginLeft:10,
							borderRadius:50,
							
						}}
						/>
					</View>

				<View style={{height: '100%'}}>
				<View style={styles.icon}>
						<Image source={require("../../../assets/img/profile_image.png")}
							
						/>
					</View>
					<View style={styles.header}>
						<Text style={styles.headingText1}>Edward</Text>
						<Text>Edward@frostdigi.com</Text>
					</View>
					<View style={styles.middle}>
					<View style={styles.wrapper}>
							
								<View style={styles.middleWrapper}>
										<View style={styles.middleImage}>
										<Ionicons
											name="person-outline" 
											color='white' 
											size={20}/>
										</View>
										<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Account</Text>
										<TouchableOpacity onPress={() => navigation.navigate('Account')}>
											<Ionicons
												name='chevron-forward-outline'
												size={20}
												color='#d7d7d7'
												style={{marginTop:20, marginLeft:120}}
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
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Payment Method</Text>
								<Ionicons
									name='chevron-forward-outline'
									size={20}
									color='#d7d7d7'
									style={{marginTop:20, marginLeft:50}}
									/>
								
							</View> 
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage}>
									<Ionicons
										name={'notifications'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Notification</Text>
								
								
									<Switch
										trackColor={{ false: "#767577", true: "#32a32e" }}
										thumbColor={isEnabled ? "white" : "white" }
										ios_backgroundColor="#3e3e3e"
										onValueChange={toggleSwitch}
										value={isEnabled}
										style={{ transform: [{ scaleX: 1.4}, { scaleY: 1.5 }] , marginLeft:60}}
     								 />
									  {/* <ToggleSwitch
											isOn={false}
											onColor="green"
											labelStyle={{ color: "black", fontWeight: "900" }}
											size="large"
											onToggle={isOn => console.log("changed to : ", isOn)}
											style={{ transform: [{ scaleX: 0.7}, { scaleY: 0.7}] , marginLeft:60}}
											/> */}

								
							</View> 
						</View>
						<View style={styles.wrapper}>
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Ionicons
										name={'headset'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Help</Text>
								
							</View>
							
						
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Ionicons
										name={'lock-closed-outline'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Private Policy</Text>
							</View> 
							<View style={styles.middleWrapper}>
								<View style={styles.middleImage1}>
									<Material
										name={'logout'}
										size={20}
										color="white"
										
									/>
								</View>
								<Text style={{fontSize:18,fontWeight:'500', margin:15}}>Logout</Text>
							</View> 
						</View>
						
						
						<Text style={{fontSize: 10, marginTop: 10}}>Powered By</Text>
						<Image source={require('../../../assets/img/footer_company_name_image.png')}
							style={{width:'60%', marginTop:10, marginBottom:15}}
						/>
					
					</View>
				</View>
				</ImageBackground>
			</View>
		</ScrollView>
	)
}
=======
import {position} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {clearAsyncStorage} from '../../../utils/storageUtil';

const Setting = props => {
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
    navigation.navigate('Home');
    ToastMessage.show('Your have successfully logout');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
      }}>
      <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Image
          source={require('../../../assets/img/appBG.png')}
          style={{height: 160}}
        />
        <View
          style={{
            display: 'flex',
            marginTop: -90,
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <View
            style={{
              padding: 20,
              alignItems: 'center',
              width: 328,
              backgroundColor: PRIMARY_BACKGROUND_COLOR,
              borderRadius: 12,
              position: 'relative',
              paddingTop: 100,
              borderWidth: 1,
              borderColor: '#707070',
            }}>
            <View style={styles.icon}>
              <Image
                source={{uri: profile.avatar}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
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
                    <Ionicons name="person-outline" color="white" size={20} />
                  </View>
                  <Text style={styles.menuText}>Account</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ManageAccount')}
                    style={{right: 0, position: 'absolute'}}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#d7d7d7"
                    />
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.middleWrapper}>
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

                                </View> */}
                <View style={[styles.middleWrapper, {borderBottomWidth: 0}]}>
                  <View style={styles.middleImage}>
                    <Ionicons name={'notifications'} size={20} color="white" />
                  </View>
                  <Text style={styles.menuText}>Notifications</Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#32a32e'}}
                    thumbColor={isEnabled ? 'white' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{
                      transform: [{scaleX: 1.4}, {scaleY: 1.5}],
                      right: 0,
                      position: 'absolute',
                    }}
                  />
                </View>
              </View>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  onPress={() => Linking.openURL('mailto:contact@frost.com')}>
                  <View style={styles.middleWrapper}>
                    <View style={styles.middleImage1}>
                      <Ionicons name={'headset'} size={20} color="white" />
                    </View>
                    <Text style={styles.menuText}>Help</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Privacy')}>
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
                  <View style={[styles.middleWrapper, {borderBottomWidth: 0}]}>
                    <View style={styles.middleImage1}>
                      <Material name={'logout'} size={20} color="white" />
                    </View>
                    <Text style={styles.menuText}>Log Out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    </ScrollView>
  );
};
>>>>>>> qa

export default Setting;

const styles = StyleSheet.create({
<<<<<<< HEAD
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		width:"100%",
		height:'100%',
    },
	header:{
		width:'80%',
		height:190, 
		backgroundColor:"white",
		margin:40,
		marginTop:60,
		borderRadius:10, 
		justifyContent:'center',
		alignItems:'center', 
		position:'absolute',
		zIndex: 10,
		borderWidth: 0.5,
		
	},
	icon:{
		width:90,
		height:90, 
		backgroundColor:"white", 
		borderRadius:19, 
		marginLeft:140, 
		marginTop:30, 
		justifyContent:'center', 
		position:'absolute',
		zIndex: 20,
		borderWidth: 0.3,
	},
	headingText1: {
		...CommonStyles.headingText1,
    	fontFamily: Typography.FONT_NORMAL,
		fontSize:Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
      	marginTop:40,
		fontWeight:'800',
		
		
    },
	middle:{
		height:'80%',
		backgroundColor:'white',
		marginTop:150,
		justifyContent:'center',
		alignItems:'center', 
	},
	wrapper:{
		width:'80%',
		height:180, 
	
		marginTop:10,
	},
	middleWrapper:{
		height: 60,
		display:'flex',
		flexDirection:'row',
		
	
	},
	
	middleImage:{
		width:40, 
		height:40, 
		backgroundColor:'#3A9BDC',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
		marginLeft:10,
		marginTop:10,
	},
	middleImage1:{
		width:40, 
		height:40, 
		backgroundColor:'#d7d7d7',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
		marginLeft:10,
		marginTop:10,
	}

	
})
=======
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 50,
    paddingRight: 50,
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
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
  },
  middle: {},
  wrapper: {
    marginTop: 35,
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
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
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
});
>>>>>>> qa
