import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import SelfAssessment from './selfAssessment';
import SessionAbout from './sessionAbout';
import {CommonStyles, Colors, Typography} from '../../../theme';

const CoachingSession = props => {
  const {
    navigation,
    route,
    traits,
    traitsLoading,
    traitsError,
    fetchAllTraits,
    fetchAllTraitBySession,
    cleanTraits,
    sessions,
    sessionLoading,
    sessionError,
    fetchSessionByIdentifier,
    cleanSession,
    sessionRegisters,
    sessionRegisterLoading,
    sessionRegisterError,
    registerSessionByIdentifier,
    cleanSessionRegister,
  } = props;

  const [value, setValue] = useState('About');

  const [modalVisible, setModalVisible] = useState(false);
  const [answers, setAnswers] = useState({
    totalScore: 0,
    questions: [],
    yellowBenchmarkQuestions: [],
  });

  const [display, setDisplay] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />

        <View>
          <View style={[styles.content, {height: 'auto'}]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.buttonWrapper}>
                <ButtonToggleGroup
                  highlightBackgroundColor={'white'}
                  highlightTextColor={'#0B0B45'}
                  inactiveBackgroundColor={'transparent'}
                  inactiveTextColor={'grey'}
                  values={['About', 'SelfAssessment']}
                  value={value}
                  onSelect={val => setValue(val)}
                  style={{
                    height: 30,
                    marginTop: 5,
                    width: '88%',
                    marginLeft: 10,
                    fontSize: 12,
                    borderRadius: 15,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                onPressIn={() => {
                  setDisplay(!display);
                }}>
                <Ionicons
                  name={modalVisible ? 'close' : 'menu'}
                  size={35}
                  color={'black'}
                  //   style={{marginLeft: 5}}
                />
              </TouchableOpacity>

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  <View>
                    <View style={styles.modalView}>
                      {traits?.map((trait, index) => (
                        <View>
                          <View style={styles.wrapper}>
                            <View style={styles.traitWrapper}>
                              <View style={[styles.traitW, styles.shadowProp]}>
                                <Image
                                  source={{uri: trait?.image}}
                                  style={{width: 20, height: 20}}
                                />
                              </View>

                              <Text style={{padding: 10, fontSize: 12}}>
                                {trait?.title}
                              </Text>
                            </View>
                            {index === 0 && (
                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginTop: 15, fontSize: 12}}>
                                  Score
                                </Text>
                                <View
                                  style={{
                                    width: 40,
                                    height: 30,
                                    marginLeft: 5,
                                    backgroundColor: 'orange',
                                    borderRadius: 50,
                                    padding: 5,
                                    marginTop: 10,
                                    alignItems: 'center',
                                  }}>
                                  <Text style={{fontSize: 12}}>
                                    {answers.totalScore}
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                          <View style={{marginTop: 10, marginLeft: 50}}>
                            {trait?.sub_traits?.map((subTrait, index) => (
                              <View
                                style={[styles.textStyle, styles.shadowProp]}>
                                <Text style={{fontSize: 12}}>
                                  {subTrait?.title}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      ))}

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.textS}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>

            <View style={{marginTop: 32}}>
              {value === 'About' && (
                <SessionAbout
                  {...props}
                  traits={traits}
                  traitsLoading={traitsLoading}
                  traitsError={traitsError}
                  fetchAllTraitBySession={fetchAllTraitBySession}
                  cleanTraits={cleanTraits}
                  sessions={sessions}
                  sessionLoading={sessionLoading}
                  sessionError={sessionError}
                  fetchSessionByIdentifier={fetchSessionByIdentifier}
                  cleanSession={cleanSession}
                  sessionRegisters={sessionRegisters}
                  sessionRegisterLoading={sessionRegisterLoading}
                  sessionRegisterError={sessionRegisterError}
                  registerSessionByIdentifier={registerSessionByIdentifier}
                  cleanSessionRegister={cleanSessionRegister}
                />
              )}
              {value === 'SelfAssessment' && (
                <SelfAssessment
                  {...props}
                  traits={traits}
                  traitsLoading={traitsLoading}
                  traitsError={traitsError}
                  fetchAllTraitBySession={fetchAllTraitBySession}
                  cleanTraits={cleanTraits}
                  answers={answers}
                  setAnswers={setAnswers}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              )}
            </View>
          </View>
        </View>
      </View>
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
    padding: 20,
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
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingBottom: 5,
    paddingLeft: 10,
    borderBottomColor: '#EBECFO',
    marginTop: 10,
  },
  traitWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  traitW: {
    height: 50,
    width: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  modalView: {
    width: 295,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    marginTop: 110,
    marginLeft: 80,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 30,
    backgroundColor: '#2196F3',
  },
  textS: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    padding: 10,
    paddingLeft: 20,
    flexDirection: 'row',
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
export default CoachingSession;
