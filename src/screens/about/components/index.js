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
import Footer from '../../../shared/footer'

import {CommonStyles, Colors, Typography} from '../../../theme';

const About = props => {
  const {navigation, about, aboutLoading, aboutError, fetchAbout} = props;

  const win = Dimensions.get('window');
  const imageContainerWidth = win.width - 20;

  useEffect(() => {
    const fetchAboutAsync = async () => {
      await fetchAbout();
    };
    fetchAboutAsync();
  }, []);



  return (
    <>
      <ScrollView
        style={{
          height: Platform.OS === 'ios' ? 400 : 350,
        }}>
        <View style={styles.container}>
          <View style={styles.about}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{about.heading1}</Text>
              <View style={styles.titleBorder}></View>
            </View>

            <Text style={styles.paragraph}>{about.content1}</Text>
          </View>
          <View style={styles.aboutImage}>
            <Image
              source={{uri: about?.image}}
              style={{width: imageContainerWidth}}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.backgroundText}>
            <View style={styles.backgroundTitle}>
              <Text style={styles.backgroundTitleText}>{about.heading2}</Text>

              <View style={styles.backgroundTitleBorder}></View>
            </View>

            <Text style={styles.backgroundParagraph}>{about.content2}</Text>
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
                Contact Us
              </Text>
            </Button>
          </View>
          <Footer />
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
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 14,
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
  paragraph: {
    fontSize: 14,
  },
});

export default About;
