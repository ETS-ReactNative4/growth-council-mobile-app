import React, {useState, useEffect} from 'react';
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
import {Button} from 'native-base';
import HTMLView from 'react-native-htmlview';

import {BubblesLoader} from 'react-native-indicator';
import {CommonStyles, Colors, Typography} from '../../../theme';

const selfAbout = props => {
  const {
    navigation,
    route,
    selfLearns,
    selfLearnLoading,
    selfLearnError,
    fetchPoeSelfLearnById,
    cleanSelfLearnById,
  } = props;

  useEffect(() => {
    const fetchPoeSelfLearnByIdAsync = async () => {
      await fetchPoeSelfLearnById(route.params.selfLearnId);
    };
    fetchPoeSelfLearnByIdAsync();
  }, []);

  console.log('learn', route.params.selfLearnId);
  console.log('learn', selfLearns);

  let title = selfLearns?.title;
  if (title !== undefined) {
    title = selfLearns?.title;
  } else {
    title = '';
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.learnWrapper}>
          <Image
            source={{uri: selfLearns?.image}}
            style={{
              width: 163,
              height: 232,
              borderRadius: 10,
            }}
          />
          <View style={{width: 160, marginLeft: 20}}>
            <View style={{marginTop: 10, height: 130}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: '#080F18',
                }}>
                {title}
              </Text>

              <View
                style={{height: 2, width: 50, backgroundColor: '#4774B5'}}
              />

              <Text
                style={{fontSize: 10, marginTop: 5, color: '#77838F'}}></Text>
            </View>

            <Button
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate('pdf', {paramsFile: selfLearns?.file})
              }>
              <Text style={{color: 'white', fontSize: 11}}>Read E-Book</Text>
            </Button>
          </View>
        </View>

        {selfLearnLoading && (
          <View
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 1011,
            }}>
            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
          </View>
        )}
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Typography.FONT_SF_SEMIBOLD,
              color: 'black',
            }}>
            Book Summary
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontFamily: Typography.FONT_SF_REGULAR,
            }}></Text>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Typography.FONT_SF_SEMIBOLD,
              color: 'black',
            }}>
            Key Take-Aways:
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontFamily: Typography.FONT_SF_REGULAR,
            }}></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    marginLeft: 15,
  },
  learnWrapper: {
    height: 252,
    borderRadius: 8,

    display: 'flex',
    flexDirection: 'row',
  },
  buttonWrapper: {
    width: 165,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#F26722',
  },
});

export default selfAbout;
