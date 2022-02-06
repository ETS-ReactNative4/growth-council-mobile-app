import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import ToastMessage from '../../../shared/toast';

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Too Short!')
    .required('Old password is required.'),
  newPassword: Yup.string()
    .min(6, 'Too Short!')
    .required('New Password is required.'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Password and confirm password must be match.',
    )
    .required('Confirm password is required.'),
});

const ChangePasswordForm = props => {
  const {
    navigation,
    loading,
    error,
    updateCustomerPassword,
    cleanCustomerPassword,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
  } = props;

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
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async values => {
    
      delete values.confirmPassword;
      
      await updateCustomerPassword(values).then(response => {
        console.log({response});
        if (response?.payload?.code === 200) {
          navigation.navigate('SignIn');
          ToastMessage.show('Your password has been successfully changed.');
		  console.log(values);
        }
      });
    },
  });

  useEffect(() => {
    return () => {
      cleanCustomerPassword();
    };
  }, []);
  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfileByIdentifier();
    };
    fetchProfileAsync();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
      }}>
      <View style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <Image
          source={require('../../../assets/img/appBG.png')}
          style={{height: 160}}
        />

        <View
          style={{
            display: 'flex',
            marginTop: -90,
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <View style={styles.profileWrapper}>
            <View style={styles.icon}>
              <Image
                source={{uri: profile.avatar}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
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
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />

        <View style={styles.content}>
          {error && (
            <View style={styles.message}>
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          )}

          {loading && (
            <>
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
            </>
          )}

          <View style={styles.body}>
            <FlatTextInput
              label="Old Password"
              value={values.oldPassword}
              secureTextEntry={hidePass}
              onChangeText={handleChange('oldPassword')}
              onFocus={handleBlur('oldPassword')}
              error={errors.oldPassword}
              touched={touched.oldPassword}
            />
            {errors.oldPassword && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.oldPassword}
              </Text>
            )}
            {/* <Ionicons
              name={hidePass ? 'eye-outline' : 'eye-off-outline'}
              size={25}
              color={Colors.PRIMARY_HEADING_COLOR}
              onPress={() => setHidePass(!hidePass)}
              style={{
				zIndex: 1011,
				position: 'absolute',
               
                right: 10,
              }}
            /> */}

            <FlatTextInput
              label="New Password"
              value={values.newPassword}
              secureTextEntry={hidePass1}
              onChangeText={handleChange('newPassword')}
              onFocus={handleBlur('newPassword')}
              error={errors.newPassword}
              touched={touched.newPassword}
            />
            {errors.newPassword && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.newPassword}
              </Text>
            )}
            <Ionicons
              name={hidePass1 ? 'eye-outline' : 'eye-off-outline'}
              size={25}
              color={Colors.PRIMARY_HEADING_COLOR}
              onPress={() => setHidePass1(!hidePass1)}
              style={{
                position: 'absolute',
                bottom: 90,
                right: 10,
              }}
            />

            <FlatTextInput
              label="Re New Password"
              value={values.confirmPassword}
              secureTextEntry={hidePass2}
              onChangeText={handleChange('confirmPassword')}
              onFocus={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            {errors.confirmPassword && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.confirmPassword}
              </Text>
            )}
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
            <Button
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Update | Change</Text>
            </Button>
          </View>

          <View style={styles.cancelWrapper}>
            <TouchableOpacity>
              <Text
                style={styles.cancelText}
                onPress={() => navigation.goBack()}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '35%',
          marginLeft: 140,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
        <Image
          source={require('../../../assets/img/fristDigi.png')}
          style={{width: '100%', height: 20}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 50,
    paddingRight: 50,
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

  content: {
    ...CommonStyles.content,
  },

  message: {
    ...CommonStyles.message,
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
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
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 12,
    position: 'relative',
    paddingTop: 100,
    borderWidth: 1,
    borderColor: '#707070',
  },
  header: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
  },
});

export default ChangePasswordForm;
