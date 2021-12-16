import React, {useState} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import Icon from "react-native-vector-icons/Ionicons";

const screenHeight = Math.round(Dimensions.get('window').height);

const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email.').required('Email is required.'),
    password: Yup
        .string()
        .min(6, ({min}) => `Password must be at least ${min} characters.`)
        .required('Password is required.'),
});

const SignUpForm = (props) => {

    const [hidePass, setHidePass] = useState(true);

    const {navigation} = props;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        validationSchema: signUpSchema,
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            navigation.navigate('SignUpNext', {
                screen: 'SignUpNext',
                params: {customer: values},
            });
        },
    });

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>

                <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <View style={styles.header}>
                    <Text style={styles.headingText1}>Let's Create Your Account</Text>
                </View>

                <View style={styles.body}>
                    <FlatTextInput
                        label='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onFocus={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                    />

                    <FlatTextInput
                        label='Password'
                        value={values.password}
                        isPassword={true}
                        secureTextEntry={hidePass}
                        onChangeText={handleChange('password')}
                        onFocus={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                    />

                </View>
                <View style={styles.checkboxWrapper}>
                    <Icon name="ios-checkbox" size={25} color={Colors.NONARY_TEXT_COLOR}/>
                    <Text style={styles.checkboxText}>By clicking submit I agree to the <Text  style={styles.linkText}
                        onPress={() => navigation.navigate('Model', {screen: 'Terms'})}>Terms of Use</Text> and <Text
                        style={styles.linkText}  onPress={() => navigation.navigate('Model', {screen: 'PrivacyPolicy'})}>Privacy
                        Policy</Text></Text>
                </View>
                <View style={styles.loginButtonWrapper}>
                    <Button style={styles.loginButton} onPress={() => navigation.navigate('SignUpNext')}>
                        {/*<Button style={styles.loginButton} onPress={handleSubmit} disabled={!isValid}>*/}
                        <Text style={styles.loginButtonText}>Sign Up</Text>
                    </Button>
                </View>

                <View style={styles.signUpLinkWrapper}>
                    <Text style={{color: Colors.NONARY_TEXT_COLOR}}>Do you have already an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.linkText} onPress={() => navigation.navigate('SignIn')}>Click
                            Here</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: Platform.OS === 'ios' ? 60 : 70,
        marginBottom: 20,
    },
    body: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        ...CommonStyles.message,
    },
    profileImage: {
        marginBottom: 10,
        height: 50,
        width: 50,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        color: Colors.NONARY_TEXT_COLOR,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        width: 210,
        textAlign: 'center',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    checkboxText: {
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_MEDIUM,
        color: Colors.NONARY_TEXT_COLOR,
        paddingLeft: 5,
        paddingTop: 5,
    },
    loginButtonWrapper: {
        ...CommonStyles.buttonWrapper,
        width: '90%',
    },
    loginButton: {
        width: '50%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    loginButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
    signUpLinkWrapper: {
        ...CommonStyles.linkWrapper,
        marginTop: 10,
        alignItems: 'center',
    },
    linkText: {
        color: Colors.SENDENARY_TEXT_COLOR,
        fontFamily: Typography.FONT_NORMAL,
        paddingLeft: 5,
    },
    errorText: {
        ...CommonStyles.errorText,
        textAlign: 'left',
    },
});


export default SignUpForm;
