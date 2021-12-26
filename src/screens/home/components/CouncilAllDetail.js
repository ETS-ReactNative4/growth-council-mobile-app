import React from 'react';
import {
  Platform,
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Button} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import style from 'react-native-datepicker/style';

const screenHeight = Math.round(Dimensions.get('window').height);

const CouncilAllDetail = props => {
  const {navigation, route} = props;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
      />
      <View style={styles.container}>
        <ScrollView style={{height: screenHeight}}>
          <View style={styles.meta}>
            <Image
              style={{
                width: '100%',
                height: 230,
                alignItems: 'center',
              }}
              source={require('../../../assets/img/welcome_screen_info_image.png')}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
              }}>
              <Ionicons
                name={'md-close-circle-sharp'}
                size={40}
                color={'#0aade7'}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>

          <View style={{padding: 30}}>
            <Text style={styles.headingTitle}>Growth Coaching</Text>
            <Text style={styles.paragraph}>
              This Agreement governs your use of Apple’s services (“Services”),
              through which you can buy, get, license, rent or subscribe to
              content, Apps (as defined below), and other in-app services
              (collectively, “Content”). ontent may be offered through the
            </Text>
            <Text style={styles.paragraph}>
              By creating an account for use of the Services in a particular
              country or territory you are specifying it as your Home Country.
            </Text>
          </View>
          <View style={styles.events}>
            <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
            <View styles={styles.eventList}>
              <View style={styles.eventCard}>
                <View style={styles.eventTheme}></View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventInfo}>
                    <Text style={styles.evnetTitle}>
                      Executive Coaching Clinic On Goal Setting
                    </Text>
                    <Text style={styles.eventParagraph}>
                      Hosted by Michael “Coop” Cooper Founder, Innovators +
                      Influencer
                    </Text>
                  </View>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                  </View>
                </View>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventTheme}></View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventInfo}>
                    <Text style={styles.evnetTitle}>
                      Executive Coaching Clinic On Goal Setting
                    </Text>
                    <Text style={styles.eventParagraph}>
                      Hosted by Michael “Coop” Cooper Founder, Innovators +
                      Influencer
                    </Text>
                  </View>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                  </View>
                </View>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventTheme}></View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventInfo}>
                    <Text style={styles.evnetTitle}>
                      Executive Coaching Clinic On Goal Setting
                    </Text>
                    <Text style={styles.eventParagraph}>
                      Hosted by Michael “Coop” Cooper Founder, Innovators +
                      Influencer
                    </Text>
                  </View>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                  </View>
                </View>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventTheme}></View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventInfo}>
                    <Text style={styles.evnetTitle}>
                      Executive Coaching Clinic On Goal Setting
                    </Text>
                    <Text style={styles.eventParagraph}>
                      Hosted by Michael “Coop” Cooper Founder, Innovators +
                      Influencer
                    </Text>
                  </View>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>01{'\n'}AUG</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  meta: {
    width: '100%',
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3354',
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 5,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  moreButton: {
    width: '40%',
    borderRadius: 10,
    height: 40,
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginLeft: 5,
  },
  moreButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 13,
    fontWeight: 'bold',
  },
  events: {
    padding: 30,
  },
  eventsTitle: {
    marginBottom: 15,
  },
  eventList: {},
  eventCard: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  eventTheme: {
    height: '100%',
    width: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(128,186,116,1)',
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  evnetTitle: {
    marginBottom: 5,
  },
  eventParagraph: {
    fontSize: 10,
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
  },
  eventDateText: {
    textAlign: 'center',
  },
});
export default CouncilAllDetail;
