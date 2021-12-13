import React, {useCallback, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {useAuthentication} from '../../../context/auth';
import FlatOutlineTextInput from '../../../shared/form/FlatOutlineTextInput';

const screenHeight = Math.round(Dimensions.get('window').height);

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email.').required('Email is required.'),
    password: Yup
        .string()
        .min(6, ({min}) => `Password must be at least ${min} characters.`)
        .required('Password is required.'),
});

const SignInForm = () => {

    const [hidePass, setHidePass] = useState(true);

    const {loading, setLoading, message, setMessage, signIn} = useAuthentication();

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        validationSchema: signInSchema,
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            signIn(values);
        },
    });

    useFocusEffect(
        useCallback(() => {
            setMessage(null);
            setLoading(false);
        }, []),
    );

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <View style={styles.header}>
                    <Text style={styles.headingText1}>Growth Innovation <Text style={{fontFamily: Typography.FONT_BOLD}}>Leadership Portal</Text></Text>
                    <Text style={styles.headingText2}>Login to your account below. If you are having trouble logging into your account contact us.</Text>
                </View>

                {!message?.success &&<View style={styles.message}>
                   <Text style={styles.errorText}>{message?.message}</Text>
                </View>
                }

                {loading &&
                    <View style={{ flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    position: 'absolute',
                    zIndex: 1011,
                    }}>
                        <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} />
                    </View>
                }

                <View style={styles.body}>
                    <FlatOutlineTextInput
                        label='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onFocus={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        keyboardType={'email-address'}
                    />

                    <FlatOutlineTextInput
                        label='Password'
                        value={values.password}
                        secureTextEntry={hidePass}
                        onChangeText={handleChange('password')}
                        onFocus={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                    />
                    <Ionicons
                        name={hidePass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass(!hidePass)}
                        style={{
                            position: 'absolute',
                            bottom: 25,
                            right: 15,
                        }}
                    />

                </View>

                <View style={styles.forgotButtonWrapper}>
                    <TouchableOpacity>
                        <Text style={styles.forgotButtonText} onPress={() => navigation.navigate('Forgot')}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginButtonWrapper}>
                    <Button style={styles.loginButton} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 50,
        width: '80%',
    },
    body: {
        width: '80%',
       // marginTop: 15,
    },
    message: {
        ...CommonStyles.message,
        width: '86%',
        paddingTop:29
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginBottom: 20,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        width: 210,
        marginBottom: 30,
    },
    loginButtonWrapper: {
        ...CommonStyles.buttonWrapper,
    },
    loginButton: {
        ...CommonStyles.button,
        height: 50,
        marginBottom: 15,
    },
    loginButtonText: {
        ...CommonStyles.buttonText,
    },
    forgotButtonWrapper: {
        ...CommonStyles.forgotButtonWrapper,
        marginTop: 15,
    },
    forgotButtonText: {
        ...CommonStyles.forgotButtonText,
    },
    signUpLinkWrapper: {
        ...CommonStyles.linkWrapper,
    },
    signUpButtonText: {
        color: Colors.SECONDARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_MEDIUM,
        paddingLeft: 8,
    },
    errorText: {
        ...CommonStyles.errorText,
        textAlign: 'left',
    },
});


export default SignInForm;
