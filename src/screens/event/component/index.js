import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Event = props => {
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
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
          />

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

              {loading && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    position: 'absolute',
                    zIndex: 1011,
                  }}>
                  <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} />
                </View>
              )}

              <View style={styles.body}>
                <FlatTextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onFocus={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType={'email-address'}
                />

                <FlatTextInput
                  label="Password"
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

              <View style={styles.loginButtonWrapper}>
                <Button
                  style={styles.loginButton}
                  onPress={handleSubmit}
                  disabled={!isValid}>
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
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={'#31ade5'}
                />
                <Text>Need Help? </Text>
                <Text
                  style={{color: '#31ade5'}}
                  onPress={() => navigation.navigate('ContactUs')}>
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
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  swiper: {
    marginTop: 30,
    maxHeight: 350,
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ACACAC',
    fontSize: 30,
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 30,
  },
  text1: {
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_NORMAL,
    margin: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    ...CommonStyles.button,
    height: 56,
    width: '40%',
    marginBottom: 10,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 15,
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
  },
  plainButton: {
    width: '70%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  plainButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  header: {
    // top: '5%',
    // height: 50,
    paddingTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1f3354',
    textAlign: 'center',
    marginBottom: 10,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 20,
    textAlign: 'center',
  },
  button1: {
    height: 56,
    width: '40%',
    width: '70%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    backgroundColor: '#faf9f8',
    borderWidth: 3,
    borderColor: '#709caf',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerlogo: {
    width: '50%',
    height: 20,
  },
});

export default Event;
