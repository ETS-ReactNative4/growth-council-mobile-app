import React from 'react';
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
import style from 'react-native-datepicker/style';

import {CommonStyles, Colors, Typography} from '../../theme';

const AboutScreen = () => {
  const win = Dimensions.get('window');
  const containerWidth = win.width - 60;
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
        <View style={styles.container}>
          <View style={styles.about}>
            <View style={styles.title}>
              <Text style={styles.titleText}>
                About the Growth Innovation Leadership Council
              </Text>
              <View style={styles.titleBorder}></View>
            </View>
            <Text style={styles.paragraph}>
              The Growth Innovation Leadership Council’s mission is to enable
              executives to achieve transformational growth for themselves,
              their companies and for industry and society at large through
              enlightened leadership. The Council delivers thought leadership
              and year-round networking around a member-defined set of Critical
              Issues shaping our futures. Each year, Council Members work
              together to set the Critical Issues Agenda for the year ahead.
              These issues then guide the development of our live events,
              virtual events and curated content on the portal. Setting the
              Critical Issues Agenda is a key role in ensuring the content for
              the Council is driven by its members
            </Text>
          </View>
          <View style={styles.aboutImage}>
            <Image
              source={require('../../assets/img/contactus.png')}
              style={{width: containerWidth}}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.backgroundText}>
            <View style={styles.backgroundTitle}>
              <Text style={styles.backgroundTitleText}>
                About Frost & Sullivan
              </Text>
              <View style={styles.backgroundTitleBorder}></View>
            </View>
            <Text style={styles.backgroundParagraph}>
              For the past 60 years, Frost & Sullivan has partnered with
              corporations, cities, governments, and the investor communities to
              identify, prioritize, and execute on new business opportunities
              powering clients toward a future shaped by growth. We are
              committed to providing CEOs and corporate leaders actionable
              intelligence spanning 10 industries, 35 sectors and 300 markets to
              help navigate economic changes, industry convergence, disruptive
              technologies and transformative business models by creating a
              continuous flow of growth opportunities with innovative
              go-to-market strategies and proven implementation best practices.
            </Text>
          </View>
          <View style={styles.cta}>
            <Button
              style={[
                styles.button,
                styles.plainButton,
                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
              ]}
              onPress={() => navigation.navigate('About')}>
              <Text style={[styles.buttonText, styles.plainButtonText]}>
                Contact Us
              </Text>
            </Button>
          </View>
          <View style={styles.poweredBy}>
            <Text style={{fontSize: 7, marginTop: 2}}>Powered By</Text>
            <Image
              source={require('../../assets/img/footer_company_name_image.png')}
              style={{marginTop: 2}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

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
  about: {
    marginBottom: 20,
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
    height: 56,
    width: '40%',
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

export default AboutScreen;
