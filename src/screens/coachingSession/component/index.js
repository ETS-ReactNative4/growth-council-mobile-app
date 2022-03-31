import React, {useState, useEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import SelfAssessment from './selfAssessment';
import SessionAbout from './sessionAbout';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {BubblesLoader} from 'react-native-indicator';
import moment from 'moment';
import ToastMessage from '../../../shared/toast';
import {padding} from '@mui/system';
import {TextArea} from 'native-base';

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

  const scrollRef = useRef();
  const [value, setValue] = useState('About');

  const [modalVisible, setModalVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [answers, setAnswers] = useState({
    questions: {
      growthIndex: [],
      innovativeIndex: [],
    },
    yellowQuestions: [],
  });
  const [score, setScore] = useState({
    growthIndexScore: 0,
    innovativeIndexScore: 0,
  });

  const [display, setDisplay] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const checkMark = (traitIndex, subTraitIndex) => {
    if (traitIndex === 0) {
      return answers.questions.growthIndex[subTraitIndex];
    } else {
      return answers.questions.innovativeIndex[subTraitIndex];
    }
  };

  useEffect(() => {
    let traitsLength = traits.length;
    let subtraitsLength = [];
    let growthIndexScore = 0;
    let innovativeIndexScore = 0;
    traits?.map((trait, index) => {
      subtraitsLength[index] = trait?.sub_traits.length;
    });
    answers?.questions?.growthIndex?.map(value => {
      if (value) {
        growthIndexScore += parseInt(value);
      }
    });
    answers?.questions?.innovativeIndex?.map(value => {
      if (value) {
        innovativeIndexScore += parseInt(value);
      }
    });
    setScore({
      growthIndexScore: growthIndexScore / subtraitsLength[0],
      innovativeIndexScore: innovativeIndexScore / subtraitsLength[1],
    });
  }, [answers]);

  // score
  let num = 0.0;
  if (sessions?.session_score) {
    num = sessions.session_score.toFixed(2);
  } else {
    num = ((score.growthIndexScore + score.innovativeIndexScore) / 2).toFixed(
      2,
    );
    if (isNaN(num)) num = 0.0;
  }

  return traitsLoading && sessionLoading ? (
    <View style={styles.bubblesLoader}>
      <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
    </View>
  ) : (
    <ScrollView style={styles.scrollBox} ref={scrollRef}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />
        <View>
          <View style={[styles.content, {height: 'auto'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.buttonWrapper}>
                <ButtonToggleGroup
                  highlightBackgroundColor={'white'}
                  highlightTextColor={'#0B0B45'}
                  inactiveBackgroundColor={'transparent'}
                  inactiveTextColor={'grey'}
                  values={['About', 'Self-Assessment']}
                  value={value}
                  onSelect={val => {
                    if (moment(sessions?.event_end).isBefore()) {
                      if (sessions?.completed_status) {
                        ToastMessage.show('You have completed this assessment');
                      } else {
                        return setValue(val);
                      }
                    } else {
                      ToastMessage.show('Session has not ended');
                    }
                  }}
                  style={{
                    height: 30,
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
                  <ScrollView
                    style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
                    contentContainerStyle={{
                      alignItems: 'center',
                      paddingBottom: 10,
                    }}>
                    <View style={styles.modalView}>
                      {traits?.map((trait, index1) => (
                        <View key={index1}>
                          <View style={styles.wrapper}>
                            <View style={styles.traitWrapper}>
                              <View style={[styles.traitW, styles.shadowProp]}>
                                <Image
                                  source={{uri: trait?.image}}
                                  style={{width: 20, height: 20}}
                                />
                              </View>

                              <Text
                                style={{
                                  paddingLeft: 10,
                                  fontSize: 12,
                                  width: '53%',
                                }}>
                                {trait?.title}
                              </Text>
                            </View>
                            {index1 === 0 && (
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
                                  <TouchableOpacity
                                    onPress={() =>
                                      setScoreVisible(!scoreVisible)
                                    }
                                    onPressIn={() => {
                                      setDisplay(!display);
                                    }}>
                                    <Text style={{fontSize: 12}}>{num}</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )}
                          </View>
                          <View style={{marginTop: 10, marginLeft: 50}}>
                            {trait?.sub_traits?.map((subTrait, index2) => (
                              <View
                                style={[styles.textStyle, styles.shadowProp]}
                                key={index2}>
                                <Text style={{fontSize: 12}}>
                                  {subTrait?.title}
                                </Text>
                                {(checkMark(index1, index2) ||
                                  sessions?.completed_status) && (
                                  <Ionicons
                                    name={'checkmark-outline'}
                                    size={20}
                                    color={'#A1BA68'}
                                  />
                                )}
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
                  </ScrollView>
                </Modal>
              </View>
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={scoreVisible}
                  onRequestClose={() => {
                    setScoreVisible(false);
                  }}>
                  <ScrollView
                    style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
                    contentContainerStyle={{
                      alignItems: 'center',
                      paddingBottom: 10,
                    }}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'center',
                          justifyContent: 'center',
                          padding: 20,
                        }}>
                        <Text
                          style={{
                            width: '80%',
                            paddingTop: 20,
                            paddingLeft: 80,
                            fontSize: 18,
                            color: 'black',
                            fontWeight: '700',
                          }}>
                          Scores Chart
                        </Text>
                        <Pressable onPress={() => setScoreVisible(false)}>
                          <Ionicons
                            name={'close'}
                            size={35}
                            color={'#4936BE'}
                          />
                        </Pressable>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {traits?.map((trait, index1) => (
                          <View
                            style={[
                              {
                                backgroundColor: '#ffff',
                                borderRadius: 20,
                                marginLeft: 10,
                                marginBottom: 5,
                                padding: 10,
                                width: '45%',
                                alignItems: 'center',
                              },
                              styles.shadowProp,
                            ]}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#8DC182',
                                fontWeight: '700',
                              }}>
                              {trait?.title}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: '35%',

                            alignContent: 'center',
                          }}>
                          <View
                            style={[
                              {
                                backgroundColor: '#97CB0A',
                                borderRadius: 20,
                                marginLeft: 10,
                                marginTop: 5,
                                marginBottom: 5,
                                padding: 10,
                                width: '100%',
                                alignItems: 'center',
                              },
                              styles.shadowProp,
                            ]}>
                            <Text style={{fontSize: 12, color: 'white'}}>
                              EXPLICITY
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                            }}>
                            <Text>4.1 - 5</Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            width: '60%',
                            marginLeft: 30,

                            fontSize: 12,
                            paddingRight: 15,
                          }}>
                          {' '}
                          You create a transparent environment where the flow of
                          information is seamless. EveryBody around you is aware
                          about the expectations for performance, quality and
                          results. You often express your discontentment when
                          benchmarks are not met and provide candid reactions
                          when they are met.
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: '35%',
                          }}>
                          <View
                            style={[
                              {
                                backgroundColor: '#FCCC4D',
                                borderRadius: 20,
                                marginLeft: 10,
                                marginTop: 5,
                                marginBottom: 5,
                                padding: 10,
                                width: '100%',
                                alignItems: 'center',
                              },
                              styles.shadowProp,
                            ]}>
                            <Text style={{fontSize: 12, color: 'white'}}>
                              INCONSISTENT
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                            }}>
                            <Text>2.6 - 4</Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            width: '60%',
                            marginLeft: 30,

                            fontSize: 12,
                            paddingRight: 15,
                          }}>
                          {' '}
                          There is an appreciation for honestlty and sincerity,
                          however you are isnconsistent when it comes to
                          integrating it into your system. You try your best to
                          build a transparent communication channel around you
                          but often fear that it might lead to a toxic
                          environemnt.
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: '35%',

                            alignContent: 'center',
                          }}>
                          <View
                            style={[
                              {
                                backgroundColor: '#FC8935',
                                borderRadius: 20,
                                marginLeft: 10,
                                marginTop: 5,
                                marginBottom: 5,
                                padding: 10,
                                width: '100%',
                                alignItems: 'center',
                              },
                              styles.shadowProp,
                            ]}>
                            <Text style={{fontSize: 12, color: 'white'}}>
                              AMBIGIOUS
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                            }}>
                            <Text>4.1-5</Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            width: '60%',
                            marginLeft: 30,

                            fontSize: 12,
                            paddingRight: 15,
                          }}>
                          {' '}
                          You are unexpressive of your true emotions. There is a
                          belief that your words might hurt others, so you
                          creaft the carefully to the xtent at which it distorts
                          the real essence of the message your are trying to get
                          across. Yo hesitate to transparently display
                          dissatisfaction when standards are not met and express
                          joy when they are met.
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
              </View>
            </View>

            <View style={{marginTop: 32}}>
              {value === 'About' && (
                <SessionAbout
                  {...props}
                  traits={traits}
                  score={score}
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
              {value === 'Self-Assessment' && (
                <SelfAssessment
                  {...props}
                  score={score}
                  traits={traits}
                  traitsLoading={traitsLoading}
                  traitsError={traitsError}
                  fetchAllTraitBySession={fetchAllTraitBySession}
                  cleanTraits={cleanTraits}
                  answers={answers}
                  setAnswers={setAnswers}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  scrollRef={scrollRef}
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
    width: Dimensions.get('window').width - 70,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#ECECEC',
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
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    marginTop: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    right: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
  bubblesLoader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
export default CoachingSession;
