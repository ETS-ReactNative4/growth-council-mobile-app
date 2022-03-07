import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

const screenHeight = Math.round(Dimensions.get('window').height);

const Radar = props => {
  const {
    route,
    navigation,   
  } = props;

  return (
    <ScrollView style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>    

        <ScrollView style={styles.content}>
          <View style={styles.contentWrapper}>      
            <Text style={styles.title}> Radar</Text> 
            <WebView
                source={{ uri: 'https://beta.gilcouncil.com/frost-radar/' }}
                style={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default Radar;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 30,
  },
  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
  },

  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderTopWidth: 10,
    borderColor: Colors.COACHING_COLOR,
  },
  contentWrapper: {
    borderRadius: 18,
    backgroundColor: 'white',
    overflow: 'scroll',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
    color: '#77838F',
  },
  top: {
    height: 200,
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
    height: 144,
    width: 256,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
  },
  middle: {
    marginTop: 10,
    justifyContent: 'center',
  },
  middleWrapper: {
    height: 68,
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 14,
    borderWidth: 1.3,
	borderColor:"#9EBD6D"
  },
  learn: {
    height: 140,
    marginTop: 30,
    justifyContent: 'center',
  },
  learnWrapper: {
    height: 118,
    width: 224,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 10,
    borderWidth: 1.3,
    display: 'flex',
    flexDirection: 'row',
	borderColor:"#9EBD6D"
  },
  radar: {
    height: 350,
    margin: 10,
    marginTop: 30,
  },
  bottom: {
    marginTop: 25,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  chatIcon: {
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
    padding: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },
  growthContent: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  ContentWrapper: {
    height: 206,
    width: 364,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
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
