import React, {useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
	StatusBar
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';
import { PRIMARY_BACKGROUND_COLOR } from '../../../theme/colors';

const profileUpdateSchema = Yup.object().shape({
    display_name: Yup
        .string()
        .required('Name is required.'),

    first_name: Yup
        .string()
        .required('First name is required.'),

    last_name: Yup
        .string()
        .required('last Name is required.'),

    email: Yup.string()
        .email('Please enter a valid email.')
        .required('Email is required.'),

});

const ManageAccount = (props) => {
    const {
        navigation,
        route,
        profile,
        profileLoading,
        profileError,
        fetchProfileByIdentifier,
        cleanProfile,
        userLoading,
        updateUser
    } = props;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        enableReinitialize: true,
        validationSchema: profileUpdateSchema,
        initialValues: {
            display_name: profile?.display_name,
            first_name: profile?.user_meta?.first_name[0],
            last_name: profile?.user_meta?.last_name[0],
            email: profile?.user_email,
        },
        onSubmit: async values => {
            await updateUser(values).then(response => {
                if (response?.payload?.status === 200) {
                    navigation.navigate('Person');
                    ToastMessage.show('Your information has been successfully updated.');
                    ToastMessage.show(values.email)
                }
            });
        },
    });

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();

    }, []);


    console.log(values);


    return (
		<ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:PRIMARY_BACKGROUND_COLOR}}>

		<View style={{backgroundColor:PRIMARY_BACKGROUND_COLOR}}>
	
				<Image source={require("../../../assets/img/appBG.png")} style={{height:160}}/>

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

			
					{/* <View style={{display:'flex', marginTop:-90,alignContent:'center', marginLeft:'auto', marginRight:'auto'}}>
							<View style={styles.profileWrapper}>
									<View style={styles.icon}>
										<Image source={{uri: profile.avatar}} style={{width:"100%", height:"100%"}} resizeMode='cover'
										/>
									</View>
									<View style={styles.header}>
										<Text style={styles.headingText1}>{profile.display_name}</Text>
										<Text>{profile.user_email}</Text>
									</View>
							</View>
					</View> */}
					
			<View style={styles.container}>
				
					<View style={styles.middle}>
						<View style={styles.wrapper}>
						{profileError && <View style={styles.message}>
                                     <Text style={styles.errorText}>{profileError.message}</Text>
                                 </View>
                                 }
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
                                             left: 100
                                         }}>
                                             <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80}/>
                                         </View>
                                     </>
                                )}

							<View style={styles.middleWrapper}>

								<View style={styles.middleImage}>
									<Ionicons
										name="person-outline"
										color='white'
										size={20}/>
								</View>
								<Text style={styles.menuText}>Account</Text>
									<Ionicons
										name='chevron-down-outline'
										size={20}
										color='#d7d7d7'
										style={{right:0,  position:'absolute'}}
									/>
								

							</View>

								<View style={styles.TextWrapper}>

                                     <Text style={{size: 7, marginLeft: 10, fontSize:10, color:'#8F9BB3'}}>Username</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
                                         value={values.display_name}
                                         onChangeText={handleChange('display_name')}
                                         onBlur={handleBlur('display_name')}
                                         error={errors.display_name}
                                         touched={touched.display_name}
										 editable={false}
                                     />

                                     <Text style={{size: 7, marginLeft: 10, fontSize:10, color:'#8F9BB3'}}>First Name</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
                                         value={values.first_name}
                                         onChangeText={handleChange('first_name')}
                                         onBlur={handleBlur('first_name')}
                                         error={errors.first_name}
                                         touched={touched.first_name}
                                     />

                                     <Text style={{size: 7, marginLeft: 10,  fontSize:10, color:'#8F9BB3'}}>Last Name</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
                                         value={values.last_name}
                                         onChangeText={handleChange('last_name')}
                                         onBlur={handleBlur('last_name')}
                                         error={errors.last_name}
                                         touched={touched.last_name}
                                     />

                                     <Text style={{ marginLeft: 10,  fontSize:10, color:'#8F9BB3'}}>Email Address</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
                                         value={values.email}
                                         onChangeText={handleChange('email')}
                                         onBlur={handleBlur('email')}
                                         error={errors.email}
                                         touched={touched.email}
                                     />
									   <Text style={{ marginLeft: 10,  fontSize:10, color:'#8F9BB3'}}>Favorite Quote</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
                                         multiline={true}
    									numberOfLines={3}
                                     />
									  <Text style={{ marginLeft: 10,  fontSize:10, color:'#8F9BB3'}}>Professional Summary</Text>
                                     <TextInput
                                         style={styles.input}
                                         keyboardType="text"
										 numberOfLines={5}
                                     />

									  
                                     <View style={styles.loginButtonWrapper}>
                                         <TouchableOpacity>
                                             <Button style={styles.loginButton} onPress={handleSubmit}>
                                                 <Text style={styles.loginButtonText}>Update</Text>
                                             </Button>
                                       </TouchableOpacity>

                                   </View>

                              </View>

							<View>
							<TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')}>
								<View style={[styles.middleWrapper,{borderBottomWidth:0, }]}>
									<View style={styles.middleImage}>
											<Ionicons
												name="key"
												color='white'
												size={20}/>
										</View>
										<Text style={styles.menuText}>Change Password</Text>

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


export default ManageAccount

const styles = StyleSheet.create({
    input: {
       
        margin: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },


   loginButtonWrapper: {
        marginLeft: 10,
		marginTop:18,
      
    }, 
    loginButton: {
        width: '50%',
        borderRadius: 10,
        height: 50,
        backgroundColor: '#3A9BDC',
    },
    loginButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,

    },
    message: {
        ...CommonStyles.message,
        width: '86%',
    },
    errorWrapper: {
        width: '70%',
    },
    errorText: {
        ...CommonStyles.errorText,
    },

	container: {
        ...CommonStyles.container,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
		paddingLeft:40,
		paddingRight:40,
		
    },
	profileWrapper:{
		padding:20,
		alignItems:"center", 
		width:328,
		backgroundColor:PRIMARY_BACKGROUND_COLOR,
		borderRadius:12, 
		position:"relative",
		paddingTop:100, 
		borderWidth: 1 , 
		borderColor:'#707070'
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
        marginTop: 30,
		borderBottomWidth:1 ,
		borderBottomColor:'#EDF1F7',
		
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
	TextWrapper: {
        // backgroundColor:'green'
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
       
    },
 
	menuText:{
		fontSize: 14, fontWeight: '500', margin: 15
	}

});
