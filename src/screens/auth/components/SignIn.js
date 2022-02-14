import React, {useCallback, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import {Linking} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {useAuthentication} from '../../../context/auth';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import Radar from '../../../shared/radar';

const screenHeight = Math.round(Dimensions.get('window').height);

const signInSchema = Yup.object().shape({
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
});

const SignInForm = props => {
    const {navigation} = props;

    const [hidePass, setHidePass] = useState(true);

    const {loading, setLoading, message, setMessage, signIn} =
        useAuthentication();

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
        // initialValues: {username: 'bikranshu.t@gmail.com', password: '123456'},
        initialValues: {username: '', password: ''},
        onSubmit: async values => {
            await signIn(values);
        },
    });

    useFocusEffect(
        useCallback(() => {
            setMessage(null);
            ``;
            setLoading(false);
        }, []),
    );

    return (
        <>
            <Radar {...props}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    header: {
        height: 50,
        marginTop: Platform.OS === 'ios' ? 20 : 50,
        marginBottom: Platform.OS === 'ios' ? 10 : 30,
        //width: '80%',
    },
    body: {
        width: '90%',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 18,
        paddingLeft: 25,
        height: '100%',
    },
    message: {
        ...CommonStyles.message,
        width: '86%',
        paddingTop: 29,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: 'bold',
        fontSize: 20,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        width: 210,
        marginBottom: 30,
    },
    loginButtonWrapper: {
        ...CommonStyles.buttonWrapper,
        alignItems: 'flex-start',
        marginTop: 10,
    },
    loginButton: {
        ...CommonStyles.button,
        height: 40,
        marginBottom: 15,
        borderRadius: 10,
        width: '50%',
    },
    loginButtonText: {
        ...CommonStyles.buttonText,
    },
    forgotButtonWrapper: {
        ...CommonStyles.forgotButtonWrapper,
        marginTop: Platform.OS === 'ios' ? 5 : 15,
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
    signuptext: {
        flexDirection: 'row',
    },

    loading1: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1011,
    },
});

export default SignInForm;
