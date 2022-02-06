import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SelfAbout from './selfAbout';
import SelfAssessment from '../../coachingSession/component/SelfAssessment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {
  fetchSelfLearnById,
  resetSelfLearnById,
} from '../slice/selfLearnByIdSlice';

const SelfLearn = props => {
  const {navigation, route} = props;

  // const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
  // const date = actualDate[1].split(' ', 3);

  const [value, setValue] = useState('About');

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />

        <View>
          <View style={[styles.content, {height: 'auto'}]}>
            <View style={{display: 'flex', flexDirection: 'row', padding: 15}}>
              <View style={styles.buttonWrapper}>
                <ButtonToggleGroup
                  highlightBackgroundColor={'white'}
                  highlightTextColor={'#0B0B45'}
                  inactiveBackgroundColor={'transparent'}
                  inactiveTextColor={'grey'}
                  values={['About', 'Self Assessment']}
                  value={value}
                  onSelect={val => setValue(val)}
                  style={{
                    height: 30,
                    marginTop: 5,
                    width: '90%',
                    marginLeft: 10,
                    fontSize: 12,
                    borderRadius: 15,
                  }}
                />
              </View>

              <Ionicons
                name={'menu'}
                size={35}
                color={'black'}
                style={{marginLeft: 15}}
              />
            </View>

            <View style={{marginTop: 15}}>
              {value === 'About' && <SelfAbout {...props} />}
              {value === 'Self Assessment' && (
                <View>
                  <SelfAssessment />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      {/* <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/fristDigi.png')}
                    style={{width: "100%", height: 20}}
                />
            </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    borderTopStartRadius: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 17,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  acceptButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(242,103,34,1)',
  },
  acceptButtonText: {
    color: '#ffffff',
  },
  topbanner: {
    backgroundColor: '#A1BA68',
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  topbanner1: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  topbanner2: {
    backgroundColor: 'rgba(128,186,116,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  hostdetail: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  hostimage: {
    flex: 1,
    backgroundColor: '#A1BA68',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F26722',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#F26722',
    paddingLeft: 110,
  },
  buttonWrapper: {
    width: 308,
    height: 40,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
  },
});
export default SelfLearn;
