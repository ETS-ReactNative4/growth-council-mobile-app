import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import Searchbox from '../../../shared/form/SearchBar';

const events = [
  {
    eventType: 'Best Practices',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Growth Coaching',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Best Practices',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Growth Community',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
];

const eventItems = ({item, index}) => {
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventTheme}></View>
      <View style={styles.eventDetails}>
        <View style={styles.eventInfo}>
          <Text style={styles.evnetTitle}>{item.eventTitle}</Text>
          <Text style={styles.eventParagraph}>Hosted by {item.eventHost}</Text>
        </View>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>
            {item.eventDay}
            {'\n'}
            {item.eventMonth}
          </Text>
        </View>
      </View>
    </View>
  );
};

const data1 = [
  {
    icon: 'brain',
    text: 'Executive MindChange',
  },
  {
    icon: 'location-arrow',
    text: 'Megatrends Workshop',
  },
  {
    icon: 'brain',
    text: 'Executive MindChange',
  },
  {
    icon: 'location-arrow',
    text: 'Megatrends Workshop',
  },
];

const _renderMiddleItem = ({item, index}) => {
  return (
    <View style={styles.middleWrapper}>
      <View style={styles.middleW}>
        <Font name={item.icon} size={40} color="skyblue" />
      </View>
      <Text style={{marginTop: 10}}>{item.text}</Text>
    </View>
  );
};

const Search = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: 150}}
          source={require('../../../assets/img/search_back_image.png')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Image
                source={require('../../../assets/img/dashboard_logo.png')}
                style={{
                  position: 'absolute',
                  top: 20,
                  height: 40,
                  width: 40,
                  left: 10,
                  borderWidth: 5,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../../../assets/img/dashboard_logo.png')}
                style={{
                  position: 'absolute',
                  top: 20,
                  height: 40,
                  width: 40,
                  left: 10,
                  borderWidth: 5,
                }}
              />
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text
                style={{
                  marginTop: 15,
                  fontWeight: '700',
                  color: 'white',
                  fontSize: 24,
                }}>
                Search
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Image
                source={require('../../../assets/img/small_profile_image.png')}
                style={{
                  height: 50,
                  width: 50,
                  marginTop: 10,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
            </View>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Searchbox />
          </View>
        </ImageBackground>

        <View style={styles.middle}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Suggestions</Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data1}
              renderItem={_renderMiddleItem}
            />
          </View>
        </View>
        <View style={styles.events}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={events}
            renderItem={eventItems}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    width: '100%',
  },
  top: {
    height: 200,
    marginTop: 80,
    margin: 10,
    justifyContent: 'center',
  },

  topWrapper: {
    height: 170,
    width: 300,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 50,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: '700',
    color: 'white',
  },
  middle: {
    width: 400,
    height: 200,
    marginLeft: 10,
    marginTop: 15,
  },
  middleWrapper: {
    height: 150,
    width: 100,
    borderRadius: 20,
    marginTop: 10,
    // backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    height: 190,
    margin: 10,
    width: 400,
  },
  bottomWrapper: {
    width: 120,
    height: 140,
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  events: {
    padding: 20,
  },
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

export default Search;
