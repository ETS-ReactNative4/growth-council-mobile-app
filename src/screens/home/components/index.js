import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
  const itemWidth = slideWidth + r * 2;

  useEffect(() => {
    const fetchPillarSliderAsync = async () => {
      await fetchAllPillarSlider();
    };
    fetchPillarSliderAsync();
  }, []);

  console.log('Pillar Slider:::::::::::::::::', pillarSliders);

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
          size={40}
          color={'#0aade7'}
          onPress={() => {
            sliderRef.current.snapToNext();
          }}
        />
        <FeatherIcon
          name={'chevron-left'}
          style={styles.carouselLeft}
          size={40}
          color={'#0aade7'}
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
          //renderItem={_renderItem}
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
          inactiveSlideOpacity={0.7}
          onSnapToItem={index => setActiveSlider(index)}
        />

        <Pagination
          dotsLength={pillarSliders.length}
          activeDotIndex={activeSlider}
          dotStyle={{
            width: 20,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#2189b1',
          }}
          dotColor={'#2189b1'}
          inactiveDotOpacity={0.4}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          style={[
            styles.signupbutton,
            {backgroundColor: Colors.PRIMARY_BUTTON_COLOR},
          ]}
          onPress={() => navigation.navigate('HomeDetail')}>
          <Text style={[styles.signupbuttonText]}>Get Started</Text>
        </Button>
        <Button
          style={[styles.signinbutton]}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.signinbuttonText, {color: '#709caf'}]}>
            I already have an account{' '}
          </Text>
        </Button>
      </View>

      <View style={styles.footer}>
        <Image
          style={styles.footerlogo}
          source={require('../../../assets/img/footer_first_logo_image.svg')}
        />
        <Text style={{fontSize: 8, marginTop: 10, marginBottom: 10}}>
          Powered By
        </Text>
        <Image
          style={styles.footerlogo}
          source={require('../../../assets/img/footer_company_name_logo_image.svg')}
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
    width: 334,
    marginBottom: 10,
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupbuttonText: {
    ...CommonStyles.buttonText,
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 16,
    marginBottom: 20,
  },
  signinbuttonText: {
    ...CommonStyles.buttonText,
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontWeight: 'medium',
    fontSize: 16,
    marginBottom: 26,
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
    marginBottom: 25,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 18,
    fontWeight: 'semi-bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  signinbutton: {
    width: 336,
    borderRadius: 25,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf9f8',
    borderWidth: 2,
    borderColor: '#1580B7',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerlogo: {
    width: 120,
    height: 20,
  },
  sliderView: {
    position: 'relative',
    marginTop: 30,
  },
  sliderText: {
    position: 'absolute',
    top: '85%',
    left: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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
