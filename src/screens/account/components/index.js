import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import {useIsFocused} from '@react-navigation/native';
import MyEvent from './MyEvent';
import MySession from './MySession';
import BottomNav from '../../../layout/BottomLayout';

const Profile = props => {
  const {
    navigation,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
  } = props;

  const win = Dimensions.get('window');

  const [value, setValue] = useState('About Us');
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: PRIMARY_BACKGROUND_COLOR,
        }}>
        <View
          style={{
            backgroundColor: PRIMARY_BACKGROUND_COLOR,
            justifyContent: 'center',
            alignContent: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../../../assets/img/appBG.png')}
            style={{height: 160, width: win.width}}
          />
          <View
            style={{
              display: 'flex',
              marginTop: -90,
              alignContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <View
              style={{
                zIndex: 30,
                position: 'absolute',
                right: 5,
                marginTop: 10,
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicon
                  name={'settings-outline'}
                  size={24}
                  color="#A0A8B0"
                  style={{marginTop: 10, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profileWrapper}>
              <View style={styles.icon}>
                <Image
                  source={{uri: profile.avatar}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.header}>
                <Text style={styles.headingText1}>
                  {profile?.user_meta?.first_name}{' '}
                  {profile?.user_meta?.last_name}
                </Text>
                <Text style={{color: '#222B45'}}>{profile?.user_email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.middle}>
                <View style={styles.buttonWrapper}>
                  <ButtonToggleGroup
                    highlightBackgroundColor={'white'}
                    highlightTextColor={'#0B0B45'}
                    inactiveBackgroundColor={'transparent'}
                    inactiveTextColor={'grey'}
                    values={['About Us', 'My Point of Engagement']}
                    value={value}
                    onSelect={val => setValue(val)}
                    style={{
                      flex: 0,
                      height: 40,
                      marginTop: 5,
                      width: '96%',
                      marginLeft: 4,
                      borderRadius: 20,

                      alignContent: 'center',
                    }}
                    textStyle={{
                      paddingHorizontal: 0,
                      paddingLeft: 5,
                      fontSize: 13,
                      width: '100%',

                      alignContent: 'center',
                    }}
                  />
                </View>
                {profileLoading && (
                  <>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        left: 120,
                        top: 120,
                      }}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  </>
                )}
                {value === 'My Point of Engagement' && <MyEvent {...props} />}

                {/* {value === 'About Us' && <MySession {...props} />} */}
              </View>
            </View>
          </View>
          <Footer />
        </View>
      </ScrollView>
      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
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
  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
    color: '#222B45',
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
  middle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    width: Platform.OS === 'ios' ? '65%' : '70%',
    marginLeft: 10,
    marginTop: 10,
  },
  middleWrapper: {
    paddingBottom: 20,
    width: '100%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: 20,
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
  buttonWrapper: {
    height: 50,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    margin: 10,
    marginTop: 15,
    marginLeft: Platform.OS === 'ios' ? 10 : 10,
  },

  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Profile;
