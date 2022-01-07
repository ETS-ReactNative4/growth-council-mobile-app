import React, {useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatOutlineTextInput from '../../../shared/form/FlatOutlineTextInput';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';

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
		
	user_email: Yup.string()
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
        // fetchProfileByIdentifier,
		fetchProfile,
        cleanProfile,
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
            first_name: profile?.user_meta.nickname[0],
            last_name: profile?.user_meta.account_status[0],
            user_email: profile?.user_email,
        },
        onSubmit: async values => {
            // values.id = profile?.id;
            await updateUser(values).then(response => {
                if (!response.error) {
                    navigation.navigate('Profile');
                    ToastMessage.show('Your information has been successfully updated.');
                }
            });
        },
    });

	

	useEffect(() => {
        const fetchProfileAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let userID = decodeUserID(token);
            await fetchProfile(userID);
        };
        fetchProfileAsync();

    }, []);

	console.log("user_meta.nickname::::::", profile.user_meta.nickname[0]);
	console.log("usermeta::::::", profile.user_meta);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,}}>
            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover">
                
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <View style={styles.arrow}>
                            <Ionicons
                                name={'arrow-back'}
                                size={50}
                                color='white'

                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{height: '100%'}}>

                        <View style={styles.icon}>
							<Image source={{uri:profile.avatar}}
							style={{width:90, height:90, borderRadius: 19,}}
                            />
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.headingText1}>{profile.display_name} </Text>
                            <Text>{profile.user_email} </Text>
                        </View>

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
											left:100
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
                                    <Text style={{fontSize: 18, fontWeight: '500', margin: 10}}>Account</Text>
                                </View>

                                <View style={{height: 1, width: '100%', backgroundColor: '#ECECEC'}}/>

                                <View style={styles.TextWrapper}>

                                    <Text style={{size: 7, marginLeft: 10}}>Username</Text>
                                    <TextInput
                                        style={styles.input}
                                        // placeholder="Edward"
                                        keyboardType="text"
										value={values.display_name}
										onChangeText={handleChange('display_name')}
										onBlur={handleBlur('display_name')}
										error={errors.display_name}
										touched={touched.display_name}
                                    />

                                    <Text style={{size: 7, marginLeft: 10}}>First Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        // placeholder="useless placeholder"
                                        keyboardType="text"
										value={values.first_name}
										onChangeText={handleChange('first_name')}
										onBlur={handleBlur('first_name')}
										error={errors.first_name}
										touched={touched.first_name}
                                    />

                                    <Text style={{size: 7, marginLeft: 10}}>Last Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        // placeholder="useless placeholder"
                                        keyboardType="text"
										value={values.last_name}
										onChangeText={handleChange('last_name')}
										onBlur={handleBlur('last_name')}
										error={errors.last_name}
										touched={touched.last_name}
                                    />

                                    <Text style={{size: 7, marginLeft: 10}}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        // placeholder="Edward@frostdigi.com"
                                        keyboardType="text"
										value={values.user_email}
										onChangeText={handleChange('user_email')}
										onBlur={handleBlur('user_email')}
										error={errors.user_email}
										touched={touched.user_email}
                                    />

                                    <View style={styles.loginButtonWrapper}>
										<TouchableOpacity >
										<Button style={styles.loginButton} onPress={handleSubmit} >
                                            <Text style={styles.loginButtonText}>Update</Text>
                                        </Button>
										</TouchableOpacity>
                                        
                                    </View>

                                </View>

                                <View style={{height: 1, width: '100%', backgroundColor: '#ECECEC'}}/>

                                <View style={styles.middleWrapper}>
                                    <View style={styles.middleImage}>
                                        <Ionicons
                                            name="key"
                                            color='white'
                                            size={20}/>
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Change Password</Text>
                                </View>

                            </View>

                            <Text style={{fontSize: 10, marginTop: 10}}>Powered By</Text>
                            <Image source={require('../../../assets/img/footer_company_name_image.png')}
                                   style={{width: '60%', marginTop: 10, marginBottom: 15}}
                            />

                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}


export default ManageAccount

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        height: '100%',
    },
    header: {
        width: '80%',
        height: 160,
        backgroundColor: "white",
        margin: 40,
        marginTop: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        borderWidth: 0.5,

    },
    icon: {
        width: 90,
        height: 90,
        backgroundColor: "white",
        borderRadius: 19,
        marginLeft: 150,
        marginTop: 50,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 20,
        borderWidth: 0.3,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
        marginTop: 40,
        fontWeight: '800',


    },
    middle: {
        height: 700,
        backgroundColor: 'white',
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: '80%',
        height: 500,
        // backgroundColor:"red",
        marginTop: 100,
    },
    middleWrapper: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
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
    TextWrapper: {
        height: 380,
        // backgroundColor:'green'
        marginTop: 10,
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },

    loginButtonWrapper: {
        marginLeft: 20,
        width: '90%',
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

});
