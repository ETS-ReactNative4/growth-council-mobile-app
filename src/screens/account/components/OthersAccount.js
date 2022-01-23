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
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {BubblesLoader} from 'react-native-indicator';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';

const OthersAccount = props => {
  const {
    navigation,
    route,
    otherProfileLoading,
    cleanProfile,
    otherProfiles,
    fetchOtherProfileByIdentifier,
  } = props;

  let Location = otherProfiles?.user_meta?.Location;
  if (typeof Location === 'undefined') {
    Location = ' ';
  } else {
    Location = otherProfiles?.user_meta?.Location[0];
  }

  let favorite_quote = otherProfiles?.user_meta?.favorite_quote;
  if (typeof favorite_quote === 'undefined') {
    favorite_quote = ' ';
  } else {
    favorite_quote = otherProfiles?.user_meta?.favorite_quote[0];
  }

  let professional_summary = otherProfiles?.user_meta?.professional_summary;
  if (typeof professional_summary === 'undefined') {
    professional_summary = ' ';
  } else {
    professional_summary = otherProfiles?.user_meta?.professional_summary[0];
  }

  let initatives = otherProfiles?.user_meta?.initatives;
  if (typeof initatives === 'undefined') {
    initatives = ' ';
  } else {
    initatives = otherProfiles?.user_meta?.initatives[0];
  }

  let insights = otherProfiles?.user_meta?.insights;
  if (typeof insights === 'undefined') {
    insights = ' ';
  } else {
    insights = otherProfiles?.user_meta?.insights[0];
  }

  useEffect(() => {
    const fetchOtherProfileAsync = async () => {
      await fetchOtherProfileByIdentifier(route.params.id);
    };
    fetchOtherProfileAsync();
  }, []);

  console.log('profile id =======', route.params.id);

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
              <Image
                source={{uri: otherProfiles?.avatar}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            <View style={styles.header}>
              <Text style={styles.headingText1}>
                {otherProfiles?.display_name}
              </Text>
              <Text>{otherProfiles?.user_email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <View style={styles.middle}>
              <View style={styles.wrapper}>
                <View style={styles.message}>
                  <Text style={styles.errorText}></Text>
                </View>
                <></>
                {otherProfileLoading && (
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
                )}
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
                    value={otherProfiles?.display_name}
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
                    value={otherProfiles?.user_meta?.first_name[0]}
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
                    value={otherProfiles?.user_meta?.last_name[0]}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Email
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={otherProfiles?.user_email}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Location
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={Location}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    FAVORITE QUOTE
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={favorite_quote}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    PROFESSIONAL SUMMARY
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={professional_summary}
                    editable={false}
                  />

                  {/* <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    EXPERTISE AREAS
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={otherProfiles?.user_meta?.first_name[0]}
                    editable={false}
                  /> */}

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    MOST RECENT GROWTH/INNOVATION INITIATIVE
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={initatives}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    I'M SEEKING INSIGHTS ON
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={insights}
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

export default OthersAccount;

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
