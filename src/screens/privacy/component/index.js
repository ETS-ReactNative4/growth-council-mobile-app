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
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../../theme';

const privacy = props => {
  const {
    navigation,
    privacy,
    privacyLoading,
    privacyError,
    fetchPrivacyPolicy,
  } = props;

  const win = Dimensions.get('window');

  useEffect(() => {
    const fetchPolicyAsync = async () => {
      await fetchPrivacyPolicy();
    };
    fetchPolicyAsync();
  }, []);

  console.log('privacy policy::::::', privacy);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
      />
      <ScrollView
        style={{
          height: Platform.OS === 'ios' ? 400 : 350,
        }}>
        <View style={[styles.container, {height: win.height}]}>
          <View style={styles.privacy}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{privacy.heading1}</Text>
              <View style={styles.titleBorder}></View>
            </View>
            <Text style={styles.paragraph}>
              {/* As a member-driven organization, we thrive on maintaining an open
              and continuous dialog with our members. If you have privacy or an
              idea for making your membership experience most impactful, we
              welcome your input! */}
              {privacy.content1}
            </Text>
          </View>
          <View style={styles.cta}>
            <Button
              style={[
                styles.button,
                styles.plainButton,
                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
              ]}
              onPress={() => Linking.openURL('mailto:contact@frost.com')}>
              <Text style={[styles.buttonText, styles.plainButtonText]}>
                Contact Our Program Team
              </Text>
            </Button>
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
        </View>
      </ScrollView>
    </>
  );
};
export default privacy;
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  header: {
    ...CommonStyles.header,
    marginTop: Platform.OS === 'ios' ? 120 : 62,
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
  },
  privacy: {
    padding: 30,
  },
  title: {
    marginBottom: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 30,
    fontWeight: '600',
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  aboutImage: {
    marginBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundText: {
    padding: 30,
    flex: 1,
    backgroundColor: '#1f71cc',
  },
  backgroundTitle: {
    paddingBottom: 30,
  },
  backgroundTitleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 30,
  },
  backgroundTitleBorder: {
    height: 5,
    width: 50,
    backgroundColor: '#fff',
  },
  backgroundParagraph: {
    color: '#fff',
  },
  cta: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    ...CommonStyles.button,
    height: 60,
    width: 380,
    backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
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
  paragraph: {
    fontSize: 14,
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
  poweredBy: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});
