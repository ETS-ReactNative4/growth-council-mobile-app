import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {QUATERNARY_TEXT_COLOR} from '../../theme/colors';
import {
  FONT_EXTRA_BOLD,
  FONT_SF_MEDIUM,
  FONT_WEIGHT_HEAVY,
} from '../../theme/typography';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const SplashScreen = () => {
  const [animation, _] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const animatedInterpolate = animation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });

  const animatedStyles = {
    // transform: [{translateY: animatedInterpolate}],
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'cover',
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.content}
        source={require('../../assets/img/appBG.png')}
        resizeMode="cover">
        <Text style={styles.heading}>Growth Council</Text>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/img/GILCouncillog.png')}
        />
        <View style={styles.footerContent}>
          <Image
            style={styles.footerLogo}
            source={require('../../assets/img/footer_logo.png')}
          />
          <Text style={styles.poweredBy}>Powered by</Text>
          <Image
            style={styles.footerLogo1}
            source={require('../../assets/img/footer_logo_1.png')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONT_EXTRA_BOLD,
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 41,
    color: QUATERNARY_TEXT_COLOR,
  },
  footerContent: {
    position: 'absolute',
    bottom: 65,
    alignItems: 'center',
  },
  poweredBy: {
    textAlign: 'center',
    fontFamily: FONT_SF_MEDIUM,
    fontWeight: '600',
    fontSize: 6,
    lineHeight: 7,
    color: QUATERNARY_TEXT_COLOR,
    marginTop: 20,
  },
  mainLogo: {
    marginTop: 20,
  },
  footerLogo: {},
  footerLogo1: {
    width: 150,
    height: 20,
    resizeMode: 'contain',
    marginTop: 15,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default SplashScreen;
