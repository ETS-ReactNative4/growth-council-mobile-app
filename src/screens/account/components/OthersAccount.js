import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {BubblesLoader} from 'react-native-indicator';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import ToastMessage from '../../../shared/toast';
import Loading from '../../../shared/loading';

const OthersAccount = props => {
  const {
    navigation,
    route,
    otherProfileLoading,
    cleanProfile,
    otherProfiles,
    fetchOtherProfileByIdentifier,

    memberConnections,
    memberConnectionLoading,
    memberConnectionError,
    connectMemberByIdentifier,
    cleanConnectMember,
  } = props;

  let Location = otherProfiles?.user_meta?.Location;

  let favorite_quote = otherProfiles?.user_meta?.favorite_quote;

  const expertise_areas1 = otherProfiles?.expertise_areas1
    ? otherProfiles?.expertise_areas1?.join(',')
    : [];

  let professional_summary = otherProfiles?.user_meta?.professional_summary;

  let initatives = otherProfiles?.user_meta?.initatives;

  let insights = otherProfiles?.user_meta?.insights;

  useEffect(() => {
    const fetchOtherProfileAsync = async () => {
      await fetchOtherProfileByIdentifier(route.params.id);
    };
    fetchOtherProfileAsync();
  }, []);

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
          <View style={styles.middle}>
            <View style={styles.wrapper}>
              <View style={styles.message}>
                <Text style={styles.errorText} />
              </View>

              {otherProfileLoading && <Loading />}
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
                <Text style={styles.title}>Username</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={otherProfiles?.display_name}
                  editable={false}
                />

                <Text style={styles.title}>First Name</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={otherProfiles?.user_meta?.first_name[0]}
                  editable={false}
                />

                <Text style={styles.title}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={otherProfiles?.user_meta?.last_name[0]}
                  editable={false}
                />

                <Text style={styles.title}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={otherProfiles?.user_email}
                  editable={false}
                />

                <Text style={styles.title}>Location</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={
                    typeof Location === 'undefined'
                      ? ''
                      : otherProfiles?.user_meta?.Location[0]
                  }
                  editable={false}
                />

                <Text style={styles.title}>Favorite Quote</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof favorite_quote === 'undefined'
                      ? ''
                      : otherProfiles?.user_meta?.favorite_quote[0]
                  }
                  editable={false}
                />

                <Text style={styles.title}>Professional Summary</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof professional_summary === 'undefined'
                      ? ''
                      : otherProfiles?.user_meta?.professional_summary[0]
                  }
                  editable={false}
                />

                <Text style={styles.title}>Expertise Areas</Text>

                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={expertise_areas1}
                  editable={false}
                />

                <Text style={styles.title}>
                  Most Recent Growth/Innovation Initative
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof initatives === 'undefined'
                      ? ''
                      : otherProfiles?.user_meta?.initatives[0]
                  }
                  editable={false}
                />

                <Text style={styles.title}>I'm Seeking Insights On</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof insights === 'undefined'
                      ? ''
                      : otherProfiles?.user_meta?.insights[0]
                  }
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OthersAccount;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    size: 7,
    marginLeft: 15,
    fontSize: 10,
    color: '#8F9BB3',
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
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
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

  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#707070',
  },
  textarea: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#707070',
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
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '30%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#F26722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '30%',
    height: 40,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    position: 'relative',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 16,
    color: '#ffffff',
    paddingLeft: 10,
  },
  registeredButtonText: {
    color: '#F26722',
  },
});
