import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
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
import {BubblesLoader} from 'react-native-indicator';
import {CommonStyles, Colors, Typography} from '../../../theme';


const sessionAbout = props => {
	const{
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
        cleanSessionRegister
	 }= props;

	const data= [
		{
		  icon:'medkit-sharp',
		  name:'Trait 1'
		},
		{
		  icon:'medkit-sharp',
		  name:'Trait 2'
		},
	  ];
	 
	 

	  const toast = useToast();
	  const [sessionStatus, setSessionStatus] = useState(sessions?.register_status);

	  useEffect(()=>{
		const fetchAllTraitsAsync = async () =>{
			await fetchAllTraitBySession(route.params.sessionId);
		};
		fetchAllTraitsAsync();
	},[])
	  useEffect(() => {
		  const fetchSessionDetailAsync = async () => {
			  await fetchSessionByIdentifier(route.params.id);
		  };
		  fetchSessionDetailAsync();
	  }, []);
  
	  const registerSessionBySessionID = async (sessionID) => {
		  const response = await registerSessionByIdentifier({session_id: sessionID});
		  if (response?.payload?.status === 200) {
			  setSessionStatus(true);
			  ToastMessage.show('You have successfully registered this event.');
		  } else {
			  toast.closeAll();
			  ToastMessage.show(response?.payload?.response);
		  }
	  };
	
	  console.log("traits", route.params.sessionId);

	const isSessionLoaded = Object.keys(sessions).length === 0;
    const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

	const _renderItem = ({item, index}, navigation) => {
		return (
			<View>
				<TouchableOpacity onPress={() => navigation.navigate('selflearn')}>
						<View style={styles.traitWrapper}>							
							<View style={styles.traitW}>
							<Image
								source={{uri: item?.image}}
								style={{width: 25, height: 25}}
								/>
							</View>

							<Text style={{padding:10, width:100}}>{item?.title}</Text>
						</View>
				</TouchableOpacity>
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
					        {sessions?.event_meta?._end_ampm} (PDT)
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
			        onPress={() => registerSessionBySessionID(route?.params?.id)}>
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
			<View
				style={styles.hostdetail}>
				<View
					style={styles.hostimage}>
					<Image source={{uri: sessions?.organizer_image}}
                    style={{width: 30, height: 60}}/>
				</View>

				<View
					style={{
						flex: 3,
						paddingLeft: 20,
					}}>
					<Text style={styles.contentHeading}>
					{sessions?.organizer?.term_name}
					</Text>
					<Text>
					{sessions?.organizer?.description}
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
			{!isSessionLoaded && (
                <HTMLView value={sessions?.description} stylesheet={styles}/>
            )}
		</View>

		<View style={{justifyContent: 'center', alignItems: 'center'}}>
			{!sessionStatus && (
			    <Button
			        style={styles.acceptButton}
			        onPress={() => registerSessionBySessionID(route?.params?.id)}>
			        <Text style={styles.acceptButtonText}>
			            Sign Up in One Click
			        </Text>
			    </Button>
			)}
			{sessionStatus && (
			    <TouchableOpacity style={styles.registeredButton}>
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
	traitWrapper:{
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection:"row"
	},
	traitW:{
		height: 60,
		width: 60,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'white',
		borderWidth:0.3
	}
});

export default sessionAbout;