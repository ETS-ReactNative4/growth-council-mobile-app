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
    ImageBackground,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import CheckBox from '../../../shared/form/Checkbox';

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

    const [checked, setChecked] = React.useState(false);

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

        <View style={styles.container}>

            <ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover">

                <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <View style={{height: '15%'}}/>


                <View style={styles.content}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.header}>
                            <Text style={styles.headingText1}>Let's Create </Text>
                            <Text style={styles.headingText1}>Your Account!</Text>
                        </View>
                        <View>

                            <View style={styles.body}>

                                <FlatTextInput
                                    label='First Name'
                                    value={values.firstname}
                                    onChangeText={handleChange('firstname')}
                                    onFocus={handleBlur('firstname')}
                                    error={errors.firstname}
                                    touched={touched.firstname}
                                />

                                <FlatTextInput
                                    label='Last Name'
                                    value={values.lastname}
                                    onChangeText={handleChange('lastname')}
                                    onFocus={handleBlur('lastname')}
                                    error={errors.lastname}
                                    touched={touched.lastname}
                                />

                                <FlatTextInput
                                    label='Title'
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    onFocus={handleBlur('title')}
                                    error={errors.title}
                                    touched={touched.title}
                                />

                                <FlatTextInput
                                    label='Company'
                                    value={values.company}
                                    onChangeText={handleChange('company')}
                                    onFocus={handleBlur('company')}
                                    error={errors.company}
                                    touched={touched.company}
                                />

                                <FlatTextInput
                                    label='Business Phone'
                                    value={values.business_phone}
                                    onChangeText={handleChange('business_phone')}
                                    onFocus={handleBlur('business_phone')}
                                    error={errors.business_phone}
                                    touched={touched.business_phone}
                                />

                                <FlatTextInput
                                    label='Business Email'
                                    value={values.business_email}
                                    onChangeText={handleChange('business_email')}
                                    onFocus={handleBlur('business_email')}
                                    error={errors.business_email}
                                    touched={touched.business_email}
                                />

                                <CheckBox
                                    label="By Clicking submit, I agree to Frost & Sullivan's Terms of Use and Privacy Policy."
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />

                            </View>


                            <View style={styles.loginButtonWrapper}>
                                <Button style={styles.loginButton} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.loginButtonText}>Sign Up</Text>
                                </Button>
                            </View>

                            <View style={styles.signUpLinkWrapper}>
                                <Text style={{color: Colors.NONARY_TEXT_COLOR}}>Do you have already an account?</Text>
                                <TouchableOpacity>
                                    <Text style={styles.signUpButtonText} onPress={() => navigation.navigate('SignIn')}>Click
                                        Here</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,

    },
    header: {
        height: 50,
        marginTop: Platform.OS === 'ios' ? 60 : 50,
        marginBottom: 30,
    },
    body: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 20
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
    signUpButtonText: {
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
