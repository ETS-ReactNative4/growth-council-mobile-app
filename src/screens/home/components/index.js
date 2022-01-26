import React, {useState, useRef, useEffect} from 'react';
import {
<<<<<<< HEAD
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions, FlatList,
=======
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
>>>>>>> qa
} from 'react-native';
import {Button} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const Home = (props) => {

    const {navigation, route, pillarSliders, pillarSliderLoading, pillarSliderError, fetchAllPillarSlider, cleanPillarSlider} = props;

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

    const carouselItems = [
        {
            uri: require('../../../assets/img/growth_coaching_slider_image.png'),
            text: 'Growth Coaching',
            id:121,
        },
        {
            uri: require('../../../assets/img/community_slider_image.png'),
            text: 'Growth Community',
            id:120,
        },
        {
            uri: require('../../../assets/img/best_practices_slider_image.png'),
            text: 'Best Practices',
            id:119,
        },
    ];

<<<<<<< HEAD
    useEffect(() => {
        const fetchPillarSliderAsync = async () => {
            await fetchAllPillarSlider();
        };
        fetchPillarSliderAsync();

    }, []);

    console.log("Pillar Slider:::::::::::::::::", pillarSliders);

    const _renderItem = ({item, index}, navigation) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('CouncilDetail', {id: item?.id})}>
                <View
                    style={{
                        backgroundColor: 'floralwhite',
                        borderRadius: 5,
                        height: 250,
                        marginLeft: 20,
                        marginRight: 20,
                        postion: 'relative',
                    }}>
                    <Image source={item?.uri} style={{width: '100%', height: '100%'}}/>
                    <Text style={styles.sliderText}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
=======
  useEffect(() => {
    const fetchPillarSliderAsync = async () => {
      await fetchAllPillarSlider();
>>>>>>> qa
    };

    return (
<<<<<<< HEAD
        <View style={styles.container}>
            <StatusBar hidden/>
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
                    data={carouselItems}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    //renderItem={_renderItem}
                    renderItem={(item) => _renderItem(item, navigation)}
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
                    dotsLength={carouselItems.length}
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
                        styles.button,
                        styles.plainButton,
                        {backgroundColor: Colors.PRIMARY_BUTTON_COLOR},
                    ]}
                    onPress={() => navigation.navigate('HomeDetail')}>
                    <Text style={[styles.buttonText, styles.plainButtonText]}>
                        Get Started
                    </Text>
                </Button>
                <Button
                    style={[styles.button1]}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={[styles.buttonText, {color: '#709caf'}]}>
                        I already have an account{' '}
                    </Text>
                </Button>
            </View>

            <View style={styles.footer}>
                <Image
                    style={styles.footerlogo}
                    source={require('../../../assets/img/footer_logo.png')}
                />
                <Text style={{fontSize: 7, marginTop: 4}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/footer_company_name_image.png')}
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
    button: {
        ...CommonStyles.button,
        height: 56,
        width: '40%',
        marginBottom: 10,
    },
    buttonText: {
        ...CommonStyles.buttonText,
        fontFamily: Typography.FONT_BOLD,
        fontSize: 15,
    },
    iconImage: {
        width: 300,
        height: 350,
        borderRadius: 10,
    },
    plainButton: {
        width: '70%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    plainButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
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
        fontSize: 35,
        fontWeight: 'bold',
        color: '#1f3354',
        textAlign: 'center',
        marginBottom: 10,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: 20,
        textAlign: 'center',
    },
    button1: {
        width: '70%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        backgroundColor: '#faf9f8',
        borderWidth: 3,
        borderColor: '#709caf',
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
        postion: 'absolute',
        top: '45%',
        left: 10,
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
=======
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('CouncilDetail', {id: item?.term_id})
        }>
        <View
          style={{
            backgroundColor: 'floralwhite',
            height: viewportWidth - 100,
            marginLeft: 20,
            marginRight: 20,
            position: 'relative',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item?.image}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
          <Text style={styles.sliderText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingText1}>Welcome</Text>
          <Text style={styles.headingText2}>To The Growth Council</Text>
        </View>
        <View styyle={styles.sliderView}>
          {!pillarSliderLoading ? (
            <View>
              <FeatherIcon
                name={'chevron-right'}
                style={styles.carouselRight}
                size={36}
                color={'#00000099'}
                onPress={() => {
                  sliderRef.current.snapToNext();
                }}
              />
              <FeatherIcon
                name={'chevron-left'}
                style={styles.carouselLeft}
                size={36}
                color={'#00000099'}
                onPress={() => {
                  sliderRef.current.snapToPrev();
                }}
              />
              <Carousel
                ref={sliderRef}
                layout={'default'}
                data={pillarSliders}
                sliderWidth={sliderWidth}
                itemWidth={viewportWidth - 150}
                renderItem={item => _renderItem(item, navigation)}
                firstItem={1}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContent}
                loop={false}
                loopClonesPerSide={3}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={5000}
                hasParallaxImages={true}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.5}
                onSnapToItem={index => setActiveSlider(index)}
              />

              <Pagination
                dotsLength={pillarSliders.length}
                activeDotIndex={activeSlider}
                dotStyle={{
                  width: 16,
                  height: 6,
                  borderRadius: 3,
                }}
                inactiveDotScale={1}
                inactiveDotOpacity={1}
                inactiveDotColor="#DDDCFF"
                dotColor={'#1580B7'}
              />
            </View>
          ) : (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.signupbutton}
          onPress={() => navigation.navigate('coachingSession')}>
          <Text style={styles.signupbuttonText}>Get Started</Text>
        </Button>
        <Button
          style={styles.signinbutton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.signinbuttonText]}>
            I already have an account{' '}
          </Text>
        </Button>
      </View>

      <View style={styles.footer}>
        <Image
          style={styles.footerlogo}
          source={require('../../../assets/img/frost-sullivan.png')}
        />
        <Text style={{fontSize: 6, marginTop: 10, marginBottom: 10}}>
          Powered By
        </Text>
        <Image
          source={require('../../../assets/img/frost_digital_logo_1.png')}
          style={styles.footerlogo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
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
    width: 336,
    marginBottom: 20,
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
  },
  signupbuttonText: {
    ...CommonStyles.buttonText,
    fontSize: 16,
    fontFamily: Typography.FONT_SF_BOLD,
    color: '#ffffff',
  },
  signinbutton: {
    width: 336,
    borderRadius: 25,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderWidth: 2,
    borderColor: '#1580B7',
  },
  signinbuttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_SF_BOLD,
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
    // ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#183863',
    textAlign: 'center',
  },
  headingText2: {
    // ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SEMI_BOLD,
    fontSize: 18,
    lineHeight: 18,
    color: '#6F8BA4',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 30,
  },

  footer: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerlogo: {
    width: 120,
    height: 18,
    resizeMode: 'contain',
    opacity: 0.75,
  },
  sliderView: {
    position: 'relative',
    marginTop: 50,
  },
  sliderText: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#ffffff',
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 13,
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
  loading1: {
    marginLeft: 150,
    marginTop: 150,
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1011,
  },
>>>>>>> qa
});

export default Home;
