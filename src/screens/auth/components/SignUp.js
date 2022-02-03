import React, {useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import {BubblesLoader} from 'react-native-indicator';
import uuid from 'react-native-uuid';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import CheckBox from '../../../shared/form/Checkbox';
import ToastMessage from '../../../shared/toast';
import {auth} from '../../../utils/firebaseUtil';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signUpSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required.'),
  last_name: Yup.string().required('Last Name is required.'),
  email: Yup.string()
    .email('Please enter valid email')
    .trim()
    .required('Email Address is Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone Number is required.'),
  title: Yup.string().required('Title is required.'),
  company: Yup.string().required('Company is required.'),
  country: Yup.string().required('Country is required.'),
  checked: Yup.boolean()
    .required('Please agree to terms and conditon for signup.')
    .oneOf([true], 'Please agree to terms and conditon for signup.'),
});

const SignUpForm = props => {
  const {navigation, loading, error, registerCustomer, cleanCustomer} = props;

  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setErrors,
    touched,
    isValid,
    setFieldValue,
  } = useFormik({
    validationSchema: signUpSchema,
    initialValues: {
      name: '',
      first_name: '',
      last_name: '',
      username: `admin${rand}`,
      password: 'admin21',
      title: '',
      company: '',
      phone: '',
      email: '',
      country: '',
      checked: false,
      firebase_password: uuid.v4(),
    },
    onSubmit: async values => {
      values.name = values.first_name + ' ' + values.last_name;
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          values?.email?.trim(),
          values?.firebase_password,
        );
        console.log({response});
        const token = await response.user.getIdToken();
        if (token) {
          await registerCustomer(values).then(response => {
            console.log('response:::::::::::::::', response);
            if (response?.payload?.code === 200) {
              // navigation.navigate('SignUpNext');
              navigation.navigate('SignIn');
              ToastMessage.show(
                'You have successfully registered. Please wait for admin approval.',
              );
            } else {
              ToastMessage.show(response?.payload?.response);
            }
          });
        }
      } catch (error) {
        console.log({error});
        switch (error.code) {
          case 'auth/email-already-in-use':
            ToastMessage.show(
              'The email address is already in use by another account.',
            );
            break;
          case 'auth/argument-error':
            ToastMessage.show('Authentication error. Please try again.');
            break;
          case 'auth/invalid-email':
            ToastMessage.show('Please enter valid email.');
            break;
          case 'auth/user-not-found':
            ToastMessage.show('User not found.');
            break;
          case 'auth/wrong-password':
            ToastMessage.show('Invalid password.');
            break;
        }
      }
    },
  });

  const [checked, setChecked] = React.useState(false);

  const [country, setCountry] = useState('Country');

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua & Deps',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Rep',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo {Democratic Rep}',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland {Republic}',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea North',
    'Korea South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar, {Burma}',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'St Kitts & Nevis',
    'St Lucia',
    'Saint Vincent & the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome & Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad & Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/splash-screen.png')}
        resizeMode="cover">
        <View style={{height: '15%'}} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headingText1}>
              Let's Create
              {'\n'}
              Your Account!
            </Text>
          </View>

          {loading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60} />
            </View>
          )}

          <ScrollView style={styles.scrollBox}>
            <View style={styles.body}>
              <FlatTextInput
                label="First Name *"
                // mode='outlined'
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onFocus={handleBlur('first_name')}
                error={errors.first_name}
                touched={touched.first_name}
              />
              {errors.first_name && (
                <Text style={styles.errorMessage}>{errors.first_name}</Text>
              )}

              <FlatTextInput
                label="Last Name *"
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onFocus={handleBlur('last_name')}
                error={errors.last_name}
                touched={touched.last_name}
              />

              {errors.last_name && (
                <Text style={styles.errorMessage}>{errors.last_name}</Text>
              )}

              <FlatTextInput
                label="Title *"
                value={values.title}
                onChangeText={handleChange('title')}
                onFocus={handleBlur('title')}
                error={errors.title}
                touched={touched.title}
              />
              {errors.title && (
                <Text style={styles.errorMessage}>{errors.title}</Text>
              )}

              <FlatTextInput
                label="Company *"
                value={values.company}
                onChangeText={handleChange('company')}
                onFocus={handleBlur('company')}
                error={errors.company}
                touched={touched.company}
              />
              {errors.company && (
                <Text style={styles.errorMessage}>{errors.company}</Text>
              )}

              <FlatTextInput
                label="Business Phone *"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onFocus={handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
              />
              {errors.phone && (
                <Text style={styles.errorMessage}>{errors.phone}</Text>
              )}

              <FlatTextInput
                label="Business Email *"
                value={values.email}
                onChangeText={handleChange('email')}
                onFocus={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />
              {errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}

              <Text style={{marginTop: 20, color: 'black'}}>Country *</Text>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 0.5,
                  overflow: 'hidden',
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Picker
                  selectedValue={country}
                  mode={'dropdown'}
                  // onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                  onValueChange={(itemValue, itemIndex) => {
                    setFieldValue('country', itemValue);
                    setCountry(itemValue);
                    setErrors({});
                  }}>
                  <Picker.Item label="Select Country" style={{fontSize: 12}} />
                  {countries.map((value, index) => {
                    return (
                      <Picker.Item
                        label={value}
                        value={value}
                        style={{fontSize: 12}}
                      />
                    );
                  })}
                </Picker>
              </View>
              {errors.country && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.country}
                </Text>
              )}

              <View>
                <CheckBox
                  label="By Clicking submit, I agree to Frost & Sullivan's Terms of Use and Privacy Policy."
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setFieldValue('checked', !checked);
                    setChecked(!checked);
                  }}
                />
                {errors.checked && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.checked}
                  </Text>
                )}
              </View>
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
    height: 70,
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    marginBottom: 30,
  },
  scrollBox: {
    height: '65%',
    width: '100%',
    marginBottom: 0,
  },
  body: {
    width: '80%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '86%',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 30,
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
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 24,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    width: 210,
    textAlign: 'center',
  },
  loginButtonWrapper: {
    ...CommonStyles.buttonWrapper,
    width: '100%',
    marginTop: 10,
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
    marginBottom: 30,
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
  loading1: {
    marginLeft: 150,
    marginTop: 250,
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1011,
  },
  errorMessage: {
    fontSize: 10,
    color: 'red',
  },
});

export default SignUpForm;
