import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import {Colors} from '../../../theme';
import Trait from './Traits';
import Question from './Question';
import {fetchAllSubTraits, resetSubTraits} from '../slice/subTraitsSlice';
import {submitSessionScores} from '../slice/sessionScoreSlice';
import {
  fetchTraitsAnswerByUserId,
  updateTraitsAnswerByUserId,
  resetTraitsAnswer,
} from '../slice/traitAnswerbyUserId';
import {BubblesLoader} from 'react-native-indicator';
import ToastMessage from '../../../shared/toast';
import {store} from '../../../utils/httpUtil';

const SelfAssessment = props => {
  const {
    navigation,
    route,
    score,
    traits,
    traitsLoading,
    traitsError,
    fetchAllTraitBySession,
    cleanTraits,

    answers,
    setAnswers,
    selectedId,
    setSelectedId,
  } = props;

  const dispatch = useDispatch();

  const {traitsAnswer, traitsAnswerLoading, traitsAnswerError} = useSelector(
    state => state.traitsAnswer,
  );

  const [value, setValue] = useState('Sub Trait');
  const [index, setIndex] = useState({
    traitIndex: 0,
    subTraitIndex: 0,
  });
  const [traitLength, setTraitLength] = useState(0);
  const [subTraitLength, setSubTraitLength] = useState(0);

  const [subTraits, setSubTraits] = useState(traits[index.traitIndex]);

  useEffect(() => {
    setSubTraits(traits[index.traitIndex]);
  }, [traits]);

  const fetchAllSubTrait = identifier => {
    dispatch(fetchAllSubTraits(identifier));
  };

  const fetchTraitsAnswer = identifier => {
    dispatch(fetchTraitsAnswerByUserId(identifier));
  };

  const updateTraitsAnswer = identifier => {
    dispatch(updateTraitsAnswerByUserId(identifier));
  };

  const cleanSubTrait = () => {
    dispatch(resetSubTraits());
  };

  const cleanTraitsAnswer = () => {
    dispatch(resetTraitsAnswer());
  };

  useEffect(() => {
    if (traits?.length) {
      setTraitLength(traits.length);
    }
    if (subTraits?.sub_traits?.length) {
      setSubTraitLength(traits[index.traitIndex]?.sub_traits?.length);
    }
  }, [traits, index]);

  useEffect(() => {}, [traitLength, subTraitLength]);

  const handleNextButtonClick = async () => {
    if (
      index.traitIndex === traitLength - 1 &&
      index.subTraitIndex === subTraitLength - 1
    ) {
      store(`jwt-auth/v1/sessions/${route?.params?.id}/score`, score)
        .then(response => {
          if (response?.data?.code === 200) {
            ToastMessage.show(
              'You score has submitted. Please complete all the session.',
            );
            setAnswers({
              questions: {
                growthIndex: [],
                innovativeIndex: [],
              },
              yellowQuestions: [],
            });
            navigation.navigate('radar');
          } else {
            toast.closeAll();
            ToastMessage.show(response?.payload?.response);
          }
        })
        .catch(error => {
          toast.closeAll();
          ToastMessage.show('Something is wrong, please contact admin.');
        });
    } else if (index.subTraitIndex === subTraitLength - 1) {
      setIndex({...index, subTraitIndex: 0, traitIndex: index.traitIndex + 1});
    } else {
      setIndex({...index, subTraitIndex: index.subTraitIndex + 1});
    }
  };
  const handlePreviousButtonClick = () => {
    if (index.subTraitIndex === 0 && index.traitIndex > 0) {
      setIndex({
        ...index,
        traitIndex: index.traitIndex - 1,
        subTraitIndex: traits[index.traitIndex - 1]?.sub_traits?.length - 1,
      });
    } else if (index.subTraitIndex > 0) {
      setIndex({...index, subTraitIndex: index.subTraitIndex - 1});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      {traits?.length > 0 ? (
        <View style={{flex: 1}}>
          <View style={styles.Wrapper}>
            <ButtonToggleGroup
              highlightBackgroundColor={'white'}
              highlightTextColor={'#0B0B45'}
              inactiveBackgroundColor={'transparent'}
              inactiveTextColor={'grey'}
              values={['Sub Trait', 'Yellow Questions']}
              value={value}
              onSelect={val => setValue(val)}
              style={{
                height: 30,
                marginTop: 5,
                width: '95%',
                marginLeft: 10,
                fontSize: 12,
                borderRadius: 15,
              }}
            />
          </View>

          <View>
            {value === 'Sub Trait ' && (
              <Trait
                {...props}
                subTraits={traits[index.traitIndex]}
                // subTraitsLoading={subTraitsLoading}
                // subTraitsError={subTraitsError}
                fetchAllSubTrait={fetchAllSubTrait}
                cleanSubTrait={cleanSubTrait}
                count={index.subTraitIndex}
                traitIndex={index}
                answers={answers}
                setAnswers={setAnswers}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                traitsAnswer={traitsAnswer}
                traitsAnswerLoading={traitsAnswerLoading}
                traitsAnswerError={traitsAnswerError}
                fetchTraitsAnswer={fetchTraitsAnswer}
                updateTraitsAnswer={updateTraitsAnswer}
                cleanTraitsAnswer={cleanTraitsAnswer}
              />
            )}
            {value === 'Yellow Questions' && (
              <Question
                {...props}
                subTraits={traits[index.traitIndex]}
                traitIndex={index}
                // subTraitsLoading={subTraitsLoading}
                // fetchAllSubTrait={fetchAllSubTrait}

                count={index.subTraitIndex}
                answers={answers}
                setAnswers={setAnswers}
                traitsAnswer={traitsAnswer}
                traitsAnswerLoading={traitsAnswerLoading}
                traitsAnswerError={traitsAnswerError}
                fetchTraitsAnswer={fetchTraitsAnswer}
                updateTraitsAnswer={updateTraitsAnswer}
                cleanTraitsAnswer={cleanTraitsAnswer}
              />
            )}
          </View>
        </View>
      ) : (
        <View style={styles.bubblesLoader}>
          <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
        </View>
      )}
      <View
        style={{
          height: 90,
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 15,
          borderTopWidth: 0.4,
          marginTop: 20,
        }}>
        <Button
          style={styles.buttonWrapper}
          onPress={handlePreviousButtonClick}
          disabled={index.traitIndex === 0 && index.subTraitIndex === 0}>
          <Text style={{color: '#FFFFFF', marginTop: 2, fontSize: 14}}>
            Previous
          </Text>
        </Button>
        <Button style={styles.buttonWrapper} onPress={handleNextButtonClick}>
          <Text style={{color: '#FFFFFF', marginTop: 2, fontSize: 14}}>
            {index.traitIndex === traitLength - 1 &&
            index.subTraitIndex === subTraitLength - 1
              ? 'Complete'
              : 'Next'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    height: 40,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
  },
  buttonWrapper: {
    width: 147,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#9FBC6C',
    borderRadius: 10,
    fontSize: 14,
    alignContent: 'center',
  },
  scrollBox: {
    height: '65%',
    width: '100%',
  },
  bubblesLoader: {
    top: '50%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default SelfAssessment;
