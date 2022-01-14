import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
	ScrollView,
	Image
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatOutlineTextInput from '../../../shared/form/FlatOutlineTextInput';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';

const passwordSchema = Yup.object().shape({
    current_password: Yup.string()
        .min(6, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Old Password is required.'),
    new_password: Yup.string()
        .min(6, 'Too Short!')
        .max(10, 'Too Long!')
        .required('New Password is required.'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Password and confirm password must be match.')
        .required('Confirm password is required.'),
});

const ChangePasswordForm = (props) => {

    const {navigation,
		loading, 
		error, 
		updateCustomerPassword, 
		cleanCustomerPassword,
		profile,
        profileLoading,
        profileError,
        fetchProfileByIdentifier,
        cleanProfile,} = props;

    const [hidePass, setHidePass] = useState(true);
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        validationSchema: passwordSchema,
        initialValues: {
			current_password: '', 
			new_password: '', 
			confirm_password: ''},
        onSubmit: async (values) => {
            // let token = await getAsyncStorage(JWT_TOKEN);
            // values.id = decodeUserID(token);
            delete values.confirm_password;
            await updateCustomerPassword(values).then(response => {
                if (response?.payload?.status === 200) {
                    navigation.navigate('SignIn');
                    ToastMessage.show('Your password has been successfully changed.');
                }
            });
        },
    });

    useEffect(
        () => {
            return () => {
                cleanCustomerPassword();
            };
        },
        [],
    );
	useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfileByIdentifier();
        };
        fetchProfileAsync();
    }, []);


    return (

		<ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR}}>
			<View style={{backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR}}>
	
				<Image source={require("../../../assets/img/appBG.png")} style={{height:160}}/>
				
						<View style={{display:'flex', marginTop:-90,alignContent:'center', marginLeft:'auto', marginRight:'auto'}}>
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
						</View>
			</View>

		<View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

            <View style={styles.content}>

                {error && <View style={styles.message}>
                    <Text style={styles.errorText}>{error.message}</Text>
                </View>
                }

                {loading && (
                    <>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            zIndex: 1011,
                        }}>
                            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR}/>
                        </View>
                    </>
                )}

                <View style={styles.body}>
                    <FlatOutlineTextInput
                        label='Current Password'
                        value={values.current_password}
                        isPassword={true}
                        secureTextEntry={hidePass}
                        onChangeText={handleChange('current_password')}
                        onBlur={handleBlur('current_password')}
                        onFocus={handleBlur('current_password')}
                        error={errors.current_password}
                        touched={touched.current_password}
                    />
                    <Ionicons
                        name={hidePass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass(!hidePass)}
                        style={{
                            position: 'absolute',
                            bottom: 160,
                            right: 10,
                        }}
                    />

                    <FlatOutlineTextInput
                        label='New Password'
                        value={values.new_password}
                        isPassword={true}
                        secureTextEntry={hidePass1}
                        onChangeText={handleChange('new_password')}
                        onBlur={handleBlur('new_password')}
                        onFocus={handleBlur('new_password')}
                        error={errors.new_password}
                        touched={touched.new_password}
                    />
                    <Ionicons
                        name={hidePass1 ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass1(!hidePass1)}
                        style={{
                            position: 'absolute',
                            bottom: 92,
                            right: 10,
                        }}
                    />

                    <FlatOutlineTextInput
                        label='Re New Password'
                        value={values.confirm_password}
                        isPassword={true}
                        secureTextEntry={hidePass2}
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        onFocus={handleBlur('confirm_password')}
                        error={errors.confirm_password}
                        touched={touched.confirm_password}
                    />
                    <Ionicons
                        name={hidePass2 ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass2(!hidePass2)}
                        style={{
                            position: 'absolute',
                            bottom: 25,
                            right: 10,
                        }}
                    />
                </View>


                <View style={styles.buttonWrapper}>
                    <Button style={styles.button} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.buttonText}>Update | Change</Text>
                    </Button>
                </View>

                <View style={styles.cancelWrapper}>
                    <TouchableOpacity>
                        <Text style={styles.cancelText} onPress={() => navigation.goBack()}>Cancel</Text>
                    </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    content: {
        ...CommonStyles.content,
    },
    body: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
		borderRadius:20,
    },
    message: {
        ...CommonStyles.message,
    },
    buttonWrapper: {
        ...CommonStyles.buttonWrapper,
        marginTop: 20,
    },
    button: {
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        height: 56,
    },
    buttonText: {
        ...CommonStyles.buttonText,
    },
    errorWrapper: {
        width: '70%',
    },
    errorText: {
        ...CommonStyles.errorText,
    },
    hideShowCustomWrapper: {
        ...CommonStyles.hideShowWrapper,
        bottom: 165,
    },
    hideShowWrapper: {
        ...CommonStyles.hideShowWrapper,
    },
    hideShowWrapper1: {
        ...CommonStyles.hideShowWrapper,
        bottom: 25,
    },
    hideShow: {
        ...CommonStyles.hideShow,
    },
    cancelWrapper: {
        ...CommonStyles.linkWrapper,
        paddingTop: 20,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        color: Colors.SECONDARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_MEDIUM,
        paddingLeft: 8,
    },
	container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        height: '100%',
    },
 
 
    middleWrapper: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
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
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
		paddingLeft:50,
		paddingRight:50,
		
    },
	profileWrapper:{
		padding:20,
		alignItems:"center", 
		width:328,
		backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR,
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
        borderColor:Colors.PRIMARY_BACKGROUND_COLOR,
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
        height: 380,
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
		fontSize: 14, 
		fontWeight: '500',
		margin: 15
	}

});


export default ChangePasswordForm;
