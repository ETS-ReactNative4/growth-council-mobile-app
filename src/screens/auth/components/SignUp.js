import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import CheckBox from '../../../shared/form/Checkbox';
import ToastMessage from '../../../shared/toast';

const signUpSchema = Yup.object().shape({
  //first_name: Yup.string().required('First Name is required.'),
  // last_name: Yup.string().required('Last Name is required.'),
  // password: Yup
  //     .string()
  //     .min(6, ({min}) => `Password must be at least ${min} characters.`)
  //     .required('Password is required.'),
});

const SignUpForm = props => {
  const {navigation, loading, error, registerCustomer, cleanCustomer} = props;

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
    initialValues: {
      name: 'Admin21',
      first_name: '',
      last_name: '',
      username: 'admin21',
      password: 'admin21',
      title: '',
      company: '',
      phone: '',
      email: '',
    },
    onSubmit: async values => {
      console.log(values);
      await registerCustomer(values).then(response => {
        if (!response.error) {
          navigation.navigate('SignUpNext');
          ToastMessage.show('You have successfully registered.');
        }
      });
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/splash-screen.png')}
        resizeMode="cover">
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />

        <View style={{height: '15%'}} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headingText1}>Let's Create </Text>
            <Text style={styles.headingText1}>Your Account!</Text>
          </View>

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
          <ScrollView style={styles.scrollBox}>
            <View style={styles.body}>
              <FlatTextInput
                label="First Name"
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onFocus={handleBlur('first_name')}
                error={errors.first_name}
                touched={touched.first_name}
              />

              <FlatTextInput
                label="Last Name"
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onFocus={handleBlur('last_name')}
                error={errors.last_name}
                touched={touched.last_name}
              />

              <FlatTextInput
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onFocus={handleBlur('title')}
                error={errors.title}
                touched={touched.title}
              />

              <FlatTextInput
                label="Company"
                value={values.company}
                onChangeText={handleChange('company')}
                onFocus={handleBlur('company')}
                error={errors.company}
                touched={touched.company}
              />

              <FlatTextInput
                label="Business Phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onFocus={handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
              />

              <FlatTextInput
                label="Business Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onFocus={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
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
              <Button
                style={styles.loginButton}
                onPress={handleSubmit}
                disabled={!isValid}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </Button>
            </View>

            <View style={styles.signUpLinkWrapper}>
              <Text style={{color: Colors.NONARY_TEXT_COLOR}}>
                Do you have already an account?
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.signUpButtonText}
                  onPress={() => navigation.navigate('SignIn')}>
                  Click Here
                </Text>
              </TouchableOpacity>
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
  scrollBox: {
    height: '65%',
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 0,
  },
  body: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
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
