import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import BottomNav from '../../../layout/BottomLayout';
import ArticleFeedbackCard from '../../../shared/card/ArticleFeedbackCard';
import Footer from '../../../shared/footer';
import SearchHeader from '../../../shared/header/SearchHeader';
import {Colors, CommonStyles} from '../../../theme';

const ContentLibraryDetail = props => {
  const {navigation} = props;

  const callToAction = [
    {id: 1, text: 'Create a realistic company vision for change'},
    {
      id: 2,
      text: 'Build a framework for leading with compassion in times of change',
    },
  ];

  const tags = [
    {id: 1, title: 'Business and Corporate Development'},
    {id: 2, title: 'Customer Experience'},
    {id: 3, title: 'Growth Leadership'},
    {id: 4, title: 'Strategy'},
    {id: 5, title: 'Talent'},
  ];

  const [isTrue, setIsTrue] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleFeedbackChange = value => {
    setIsTrue(value);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <SearchHeader
        navigation={navigation}
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <View style={styles.bodyContainer}>
        {/* Breadcrumb Section */}
        <View style={styles.breadcrumbContainer}>
          <View style={styles.singleBreadcrumb}>
            <Text style={styles.inactiveBreadcrumbText}>
              Customer Experience Ecosystem
            </Text>
            <FeatherIcon name="chevron-right" size={10} color="#B2B3B9" />
          </View>
          <View style={{...styles.singleBreadcrumb, flex: 1}}>
            <Text style={styles.activeBreadcrumbText}>
              2021: Effective Change Management Across the CX Ecosystem
            </Text>
          </View>
        </View>

        {/* Main Body Section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 25}}
          contentContainerStyle={{paddingBottom: 90}}>
          <View style={{marginBottom: 30}}>
            <Image
              source={require('../../../assets/img/image.png')}
              style={styles.contentImage}
            />
          </View>

          <View style={styles.sectionContainerBorder}>
            <Text style={styles.bodyTitleText}>Presented By:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/img/connection-image.png')}
                style={styles.userImage}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userNameText}>Michael "Coop" Cooper</Text>
                <Text style={styles.userInfoText}>
                  Founder, Innovators + Influencers
                </Text>
              </View>
            </View>
          </View>

          {/* Abstract Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitleText}>Abstract:</Text>
            <Text style={styles.abstractDescriptionText}>
              Employee experience is the foundation of a truly customer centric
              organization and with any organization, there will be change —
              expect constant change — especially in today’s climate. Managing
              change with a top down approach from leadership to individuals is
              a crucial part of the process to become customer centric. Whether
              it is political events, diversity and inclusion, or a changing
              business model, the employee is the one who translates emotions
              and therefore impacts the customer experience.
            </Text>
          </View>

          {/* Call To Action Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitleText}>Call to Action:</Text>
            {callToAction.map(item => (
              <View style={{marginBottom: 10, flexDirection: 'row'}}>
                <Text
                  style={{marginRight: 5, color: Colors.SECONDARY_TEXT_COLOR}}>
                  {item.id.toString()})
                </Text>
                <Text
                  style={{
                    fontFamily: 'SFProText-Regular',
                    color: Colors.SECONDARY_TEXT_COLOR,
                  }}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Attachments Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitleText}>Attachments:</Text>
            <View style={styles.attachmentContainer}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <FontAwesomeIcon name="file-pdf-o" size={35} color="#9B9CA0" />
                <Text style={styles.attachmentTitle}>Presentation</Text>
              </View>

              <TouchableOpacity
                style={styles.attachmentDownloadButton}
                onPress={() => console.warn('Download Pdf !!!')}>
                <FeatherIcon name="arrow-down" size={20} color="#9B9CA0" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tags Section */}
          <View style={styles.sectionContainerBorder}>
            <Text style={styles.bodyTitleText}>Tags:</Text>
            <View style={styles.tagsContainer}>
              {tags.map(item => (
                <View style={styles.singleTagContainer}>
                  <FeatherIcon
                    name="tag"
                    size={20}
                    color="#9B9CA0"
                    style={{marginTop: 5}}
                  />
                  <Text style={styles.tagTitleText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Article Feedback Section */}
          <ArticleFeedbackCard
            isTrue={isTrue}
            handleValue={handleFeedbackChange}
          />

          {/* Footer Section */}
          <Footer />
        </ScrollView>
      </View>

      {/* Bottom Navigation Section */}
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  bodyContainer: {
    ...CommonStyles.container,
    marginTop: 25,
  },
  breadcrumbContainer: {
    marginHorizontal: 25,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.13)',
  },
  singleBreadcrumb: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveBreadcrumbText: {
    marginRight: 10,
    fontFamily: 'SFProText-Medium',
    fontSize: 8,
    color: '#B2B3B9',
  },
  activeBreadcrumbText: {
    marginRight: 10,
    fontFamily: 'SFProText-Medium',
    fontSize: 8,
    color: Colors.TERTIARY_BUTTON_COLOR,
  },
  contentImage: {width: '100%', height: 205, borderRadius: 16},
  sectionContainerBorder: {
    marginBottom: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.13)',
  },
  bodyTitleText: {
    marginBottom: 20,
    fontFamily: 'SFProText-SemiBold',
    color: Colors.PRIMARY_TEXT_COLOR,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
    resizeMode: 'contain',
  },
  userNameText: {
    marginBottom: 10,
    fontFamily: 'SFProText-Medium',
    color: Colors.PRIMARY_TEXT_COLOR,
  },
  userInfoText: {
    fontFamily: 'SFProText-Medium',
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  abstractDescriptionText: {
    flex: 1,
    fontFamily: 'SFProText-Regular',
    lineHeight: 22,
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  attachmentContainer: {
    height: 63,
    paddingLeft: 20,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  attachmentTitle: {
    marginLeft: 25,
    marginTop: 5,
    fontFamily: 'SFProText-Regular',
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  attachmentDownloadButton: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleTagContainer: {
    width: '49%',
    height: 47,
    marginBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  tagTitleText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'SFProText-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: Colors.SECONDARY_TEXT_COLOR,
  },
});

export default ContentLibraryDetail;
