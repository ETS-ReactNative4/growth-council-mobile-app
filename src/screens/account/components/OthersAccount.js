import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';

const ManageAccount = props => {
  const {
    navigation,
    route,
    cleanProfile,
    otherProfile,
    fetchOtherProfileByIdentifier,
  } = props;

  useEffect(() => {
    const fetchOtherProfileAsync = async () => {
      await fetchOtherProfileByIdentifier(route.params.id);
    };
    fetchOtherProfileAsync();
  }, []);

  console.log('profile id =======', route.params.id);
  console.log('profile other ====== ', otherProfile);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
      }}>
      <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
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
              {/* <Image
                source={{uri: avatar}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              /> */}
            </View>
            <View style={styles.header}></View>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <View style={styles.middle}>
              <View style={styles.wrapper}>
                <View style={styles.message}>
                  <Text style={styles.errorText}></Text>
                </View>
                <>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      position: 'absolute',
                      zIndex: 1011,
                      top: 120,
                      left: 100,
                    }}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={80}
                    />
                  </View>
                </>
                <View style={styles.middleWrapper}>
                  <View style={styles.middleImage}>
                    <Ionicons name="person-outline" color="white" size={20} />
                  </View>
                  <Text style={styles.menuText}>Account</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color="#d7d7d7"
                    style={{right: 0, position: 'absolute'}}
                  />
                </View>
                <View style={styles.TextWrapper}>
                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    Username
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value="Read Only"
                    editable={false}
                  />

                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    First Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value="Read Only"
                    editable={false}
                  />

                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    Last Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value="Read Only"
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Email
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value="Read Only"
                    editable={false}
                  />
                </View>
              </View>
            </View>
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

export default ManageAccount;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
  },

  middleWrapper: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
  },
  TextWrapper: {
    height: 380,
    // backgroundColor:'green'
    marginTop: 10,
  },

  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },

  loginButtonWrapper: {
    marginLeft: 10,
    marginTop: 18,
  },
  loginButton: {
    width: '50%',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#3A9BDC',
  },
  loginButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  message: {
    ...CommonStyles.message,
    width: '86%',
  },
  errorWrapper: {
    width: '70%',
  },
  errorText: {
    ...CommonStyles.errorText,
  },

  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 50,
    paddingRight: 50,
  },
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
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
    borderColor: PRIMARY_BACKGROUND_COLOR,
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
  middle: {},
  wrapper: {
    marginTop: 35,
    borderBottomWidth: 1,

    borderBottomColor: '#EDF1F7',
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
  },
  TextWrapper: {
    height: 380,
    // backgroundColor:'green'
    marginTop: 10,
  },

  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  middleImage1: {
    width: 40,
    height: 40,
    backgroundColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
});
