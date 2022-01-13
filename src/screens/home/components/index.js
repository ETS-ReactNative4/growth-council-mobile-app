import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {CommonStyles, Colors, Typography} from '../../../theme';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const Home = props => {
  const {
    navigation,
    route,
    pillarSliders,
    pillarSliderLoading,
    pillarSliderError,
    fetchAllPillarSlider,
    cleanPillarSlider,
  } = props;

  const [activeSlider, setActiveSlider] = useState(1);
  const sliderRef = useRef(null);

  const wp = percentage => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  const slideHeight = viewportHeight * 0.36;
  const slideWidth = wp(50);
  const sliderWidth = viewportWidth;
  const itemHorizontalMargin = wp(2);
  const itemWidth = slideWidth + itemHorizontalMargin * 2;

  // const carouselItems = [
  //   {
  //     uri: require('../../../assets/img/welcome_screen_learn_more_image.png'),
  //     text: 'Growth Coaching',
  //     id: 121,
  //   },
  //   {
  //     uri: require('../../../assets/img/community_slider_image.png'),
  //     text: 'Growth Community',
  //     id: 120,
  //   },
  //   {
  //     uri: require('../../../assets/img/massk.png'),
  //     text: 'Best Practices',
  //     id: 119,
  //   },
  // ];

  useEffect(() => {
    const fetchPillarSliderAsync = async () => {
      await fetchAllPillarSlider();
    };
    fetchPillarSliderAsync();
  }, []);

  const _renderItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('CouncilDetail', {id: item?.term_id})
        }>
        <View
          style={{
            backgroundColor: 'floralwhite',
            height: 300,
            width: 200,
            marginLeft: 20,
            marginRight: 20,
            position: 'relative',
          }}>
          <Image
            source={{uri: item?.image}}
            style={{width: '100%', height: '100%', borderRadius: 20}}
          />
          <Text style={styles.sliderText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={styles.headingText1}>Welcome</Text>
        <Text style={styles.headingText2}>To The Growth Council</Text>
      </View>
      <View styyle={styles.sliderView}>
        <FeatherIcon
          name={'chevron-right'}
          style={styles.carouselRight}
          size={36}
          color={'#000000'}
          onPress={() => {
            sliderRef.current.snapToNext();
          }}
        />
        <FeatherIcon
          name={'chevron-left'}
          style={styles.carouselLeft}
          size={36}
          color={'#000000'}
          onPress={() => {
            sliderRef.current.snapToPrev();
          }}
        />
        <Carousel
          ref={sliderRef}
          layout={'default'}
          data={pillarSliders}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          renderItem={item => _renderItem(item, navigation)}
          firstItem={1}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContent}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={5000}
          hasParallaxImages={true}
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.5}
          onSnapToItem={index => setActiveSlider(index)}
        />

        <Pagination
          dotsLength={pillarSliders.length}
          activeDotIndex={activeSlider}
          dotStyle={{
            width: 16,
            height: 8,
            borderRadius: 3,
            backgroundColor: '#1580B7',
          }}
          dotColor={'#1580B7'}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          style={styles.signupbutton}
          onPress={() => navigation.navigate('HomeDetail')}>
          <Text style={styles.signupbuttonText}>Get Started</Text>
        </Button>
        <Button
          style={styles.signinbutton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.signinbuttonText, {color: '#709caf'}]}>
            I already have an account{' '}
          </Text>
        </Button>
      </View>

      <View style={styles.footer}>
        <Image
          style={styles.footerlogo}
          source={require('../../../assets/img/frost_sullivan_footer.svg')}
        />
        <Text style={{fontSize: 6, marginTop: 10, marginBottom: 10}}>
          Powered By
        </Text>
        <Image
          source={require('../../../assets/img/frost_footer.svg')}
          style={{marginTop: 4}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  wrapper: {
    top: '20%',
  },

  slider: {
    marginTop: 30,
    overflow: 'visible',
  },
  sliderContent: {
    paddingVertical: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ACACAC',
    fontSize: 30,
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 30,
  },
  text1: {
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_NORMAL,
    margin: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  signupbutton: {
    ...CommonStyles.button,
    height: 56,
    width: 336,
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
  },
  signupbuttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 16,
    color: '#ffffff',
  },
  signinbutton: {
    width: 336,
    borderRadius: 25,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf9f8',
    borderWidth: 2,
    borderColor: '#709caf',
  },
  signinbuttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 16,
    color: '#1580B7',
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 10,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f3354',
    textAlign: 'center',
    marginBottom: 18,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'semi-bold',
    marginBottom: 30,
  },

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerlogo: {
    width: '50%',
    height: 20,
  },
  sliderView: {
    position: 'relative',
    marginTop: 30,
  },
  sliderText: {
    position: 'absolute',
    top: '90%',
    left: 24,
    color: '#ffffff',
    fontWeight: 'semi-bold',
    fontSize: 13,
  },
  carouselLeft: {
    position: 'absolute',
    left: 15,
    top: '45%',
    zIndex: 99,
  },
  carouselRight: {
    position: 'absolute',
    right: 15,
    top: '45%',
    zIndex: 99,
  },
});

export default Home;
