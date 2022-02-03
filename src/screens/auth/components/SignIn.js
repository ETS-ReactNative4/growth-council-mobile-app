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
    initialValues: {username: 'bikranshu.t@gmail.com', password: '123456'},
    onSubmit: async values => {
      console.log({values});
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
    <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <View style={{height: '15%'}}></View>

          <View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.headingText1}>Growth Innovation </Text>
                <Text style={[styles.headingText1, {marginBottom: 10}]}>
                  Leadership Portal
                </Text>
                <Text>
                  Login to your account below. If you are having trouble logging
                  into your account contact us.
                </Text>
              </View>

              {!message?.success && (
                <View style={styles.message}>
                  <Text style={styles.errorText}>{message?.message}</Text>
                </View>
              )}

              <View style={styles.body}>
                {loading && (
                  <View style={styles.loading1}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={60}
                    />
                  </View>
                )}
                <FlatTextInput
                  label="Email *"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onFocus={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}

                  //keyboardType={'email-address'}
                />
                {errors.username && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.username}
                  </Text>
                )}

                <FlatTextInput
                  label="Password *"
                  value={values.password}
                  secureTextEntry={hidePass}
                  onChangeText={handleChange('password')}
                  onFocus={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                {errors.password && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.password}
                  </Text>
                )}

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

              <View style={styles.loginButtonWrapper}>
                <Button style={styles.loginButton} onPress={handleSubmit}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </Button>
              </View>
              <View style={styles.forgotButtonWrapper}>
                <TouchableOpacity>
                  <Text
                    style={styles.forgotButtonText}
                    onPress={() => navigation.navigate('Forgot')}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signuptext}>
                <Text>Not a member ?</Text>
                <Text
                  style={{color: '#31ade5'}}
                  onPress={() => navigation.navigate('SignUp')}>
                  {' '}
                  Sign Up{' '}
                </Text>
              </View>
              <View style={[styles.signuptext, {marginTop: 40}]}>
                {/* <Ionicons name="help-circle-outline" size={20} color={'#31ade5'}/> */}
                <Text>Need Help? </Text>
                <Text
                  style={{color: '#31ade5'}}
                  onPress={() => Linking.openURL('mailto:contact@frost.com')}>
                  {' '}
                  Contact Us{' '}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
    //width: '80%',
  },
  body: {
    width: '80%',

    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 25,
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
  signuptext: {
    flexDirection: 'row',
  },
  loading1: {
    marginLeft: 100,
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default SignInForm;
