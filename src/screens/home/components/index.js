import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Home = ({navigation}) => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingText1}>Welcome</Text>
          <Text style={styles.headingText2}>To The Growth Council</Text>
        </View>
        <Swiper
          style={styles.swiper}
          autoplay
          paginationStyle={{top: '95%', backgroundColor: 'transparent'}}
          dot={
            <View
              style={{
                backgroundColor: '#2189b1',
                opacity: 0.3,
                width: 20,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#2189b1',
                width: 20,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
              }}
            />
          }
          nextButton={
            <FeatherIcon name={'chevron-right'} size={40} color={'#0aade7'} />
          }
          prevButton={
            <FeatherIcon name={'chevron-left'} size={40} color={'#0aade7'} />
          }
          showsButtons={true}>
          <View style={styles.slide1}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Model', {screen: 'CouncilDetail'})
              }>
              <Image
                style={styles.iconImage}
                source={require('../../../assets/img/community_slider_image.png')}
              />
              <Text style={styles.text}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide1}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Model', {screen: 'CouncilDetail'})
              }>
              <Image
                style={styles.iconImage}
                source={require('../../../assets/img/growth_coaching_slider_image.png')}
              />
              <Text style={styles.text}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide1}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Model', {screen: 'CouncilDetail'})
              }>
              <Image
                style={styles.iconImage}
                source={require('../../../assets/img/best_practices_slider_image.png')}
              />
              <Text style={styles.text}></Text>
            </TouchableOpacity>
          </View>
        </Swiper>


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headingText1}>Welcome</Text>
                <Text style={styles.headingText2}>To The Growth Council</Text>
            </View>

            <StatusBar hidden/>
            <Swiper style={styles.wrapper} autoplay
                    paginationStyle={{top: '95%', backgroundColor: 'transparent'}}
                    activeDot={
                        <View
                            style={{
                                backgroundColor: '#2189b1',
                                width: 20,
                                height: 8,
                                borderRadius: 2,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3,
                            }}
                        />
                    }
                    showsButtons={true}
            >

                <View style={styles.slide1}>
                    <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                        <Image style={styles.iconImage} source={require('../../../assets/img/community_slider_image.png')}/>
                        <Text style={styles.text}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.slide1}>
                    <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                        <Image style={styles.iconImage} source={require('../../../assets/img/growth_coaching_slider_image.png')}/>
                        <Text style={styles.text}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.slide1}>
                    <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                        <Image style={styles.iconImage} source={require('../../../assets/img/best_practices_slider_image.png')}/>
                        <Text style={styles.text}/>
                    </TouchableOpacity>
                </View>
            </Swiper>

            <View style={styles.buttonWrapper}>
                <Button style={[styles.button, styles.plainButton , {backgroundColor: Colors.PRIMARY_BUTTON_COLOR}]}
                        onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={[styles.buttonText, styles.plainButtonText]}>Get Started</Text>
                </Button>
                <Button style={[styles.button1]}
                        onPress={() => navigation.navigate('SignIn')}>
                    <Text style={[styles.buttonText, {color : '#709caf' } ]}>I already have an account </Text>
                </Button>
            </View>

            <View style={styles.footer}>
                <Image style={styles.footerlogo} source={require('../../../assets/img/footer_logo.png')} />
                <Image source={require('../../../assets/img/footer_company_name_image.png')} style={{marginTop:10}} />
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
          <Text style={{fontSize: 7, marginTop: 2}}>Powered By</Text>
          <Image
            source={require('../../../assets/img/footer_company_name_image.png')}
            style={{marginTop: 2}}
          />
        </View>
      </View>
    </>
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
  swiper: {
    marginTop: 30,
    maxHeight: 350,
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
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
    borderRadius: 15,
    overflow: 'hidden',
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
    // top: '5%',
    // height: 50,
    paddingTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 56,
    width: '40%',
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
});

export default Home;
