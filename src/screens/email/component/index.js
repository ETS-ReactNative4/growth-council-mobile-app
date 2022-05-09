import React, {useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button} from 'native-base';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';

const emailSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required.'),
  message: Yup.string().required('Message is required.'),
});

const Email = props => {
  const {
    navigation,
    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,

    sendMail,
    sendMailLoading,
    sendMailError,
    sendMailUser,
    cleanSendMail,
  } = props;

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: emailSchema,
      initialValues: {
        From: profile?.user_email,
        subject: '',
        message: '',
      },
      onSubmit: async values => {
        await sendMailUser(values).then(response => {
          if (response?.payload?.code === 200) {
            navigation.navigate('Dashboard');
            ToastMessage.show(response?.payload?.message);
          }
        });
      },
    });

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);

  useEffect(() => {
    return () => {
      cleanSendMail();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={40}
                color="white"
                style={{marginTop: 15}}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  justifyContent: 'center',
                  width: '90%',
                  marginLeft: 10,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>New Messages</Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {profile?.user_email}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity onPress={handleSubmit}>
              <View style={{marginTop: 20, position: 'absolute', right: 20}}>
                <Ionicons name={'send-sharp'} size={30} color={'white'} />
              </View>
            </TouchableOpacity> */}

            {/**/}
          </View>
          <View style={{padding: 20, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, marginTop: 10}}>From :</Text>
              <TextInput
                multiline={true}
                style={styles.input}
                value={values.From}
                editable={false}
				onChangeText={handleChange('From')}
                onFocus={handleBlur('From')}
                error={errors.From}
                touched={touched.From}
              />
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, marginTop: 10}}>To :</Text>
              <TextInput
                multiline={true}
                style={styles.input}
                value="agajgjgjejkgsha"
              />
            </View> */}
            {sendMailLoading && <Loading />}

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18}}>Subject :</Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                style={styles.textarea}
                value={values.subject}
                onChangeText={handleChange('subject')}
                onFocus={handleBlur('subject')}
                error={errors.subject}
                touched={touched.subject}
              />
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18}}>Messages :</Text>
              <TextInput
                multiline={true}
                numberOfLines={15}
                style={styles.textarea}
                value={values.message}
                onChangeText={handleChange('message')}
                onFocus={handleBlur('message')}
                error={errors.message}
                touched={touched.message}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Email;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    height: 80,
    backgroundColor: '#02B0F0',
    borderTopWidth: 0.2,
    padding: 10,

    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    paddingLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  textarea: {
    paddingTop: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    lineHeight: 30,
  },
  buttonWrapper: {
    width: 200,
    marginTop: 20,
  },
  button: {
    width: '60%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02B0F0',
    height: 56,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
