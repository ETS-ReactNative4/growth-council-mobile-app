import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image, ImageBackground, TouchableOpacity
} from 'react-native';
import {Button} from 'native-base';
import Swiper from 'react-native-swiper'

import {CommonStyles, Colors, Typography} from '../../../theme';

const Home = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/img/home-background.png')} style={styles.background}>
                <StatusBar hidden/>
                <Swiper style={styles.wrapper} autoplay
                        paginationStyle={{top: '85%', backgroundColor: 'transparent'}}
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: '#91357A',
                                    width: 60,
                                    height: 8,
                                    borderRadius: 4,
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
                            <Image style={styles.iconImage} source={require('../../../assets/img/Slide3.png')}/>
                            <Text style={styles.text}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide2}>
                        <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                            <Image style={styles.iconImage} source={require('../../../assets/img/Slide2.png')}/>
                            <Text style={styles.text1}>We bring the televeison at your fingertips, now watch your
                                favorite TV programming right in your smartphone with direct broadcast.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide3}>
                        <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                            <Image style={styles.iconImage} source={require('../../../assets/img/Slide3.png')}/>
                            <Text style={styles.text1}>You can Register using the button below or simply login if you
                                already have an account to begin enjoying the experience.</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>

                <View style={styles.buttonWrapper}>
                    <Button style={[styles.button, styles.plainButton]}
                            onPress={() => navigation.navigate('SignUpNext')}>
                        <Text style={[styles.buttonText, styles.plainButtonText]}>Get Started</Text>
                    </Button>
                    <Button style={[styles.button, styles.plainButton]}
                            onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonText}>I already have an account </Text>
                    </Button>
                </View>
            </ImageBackground>
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
        resizeMode: "cover",
        justifyContent: "center",
    },
    wrapper: {
        top: '20%',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        ...CommonStyles.button,
        height: 56,
        width: '40%'
    },
    buttonText: {
        ...CommonStyles.buttonText,
        fontFamily: Typography.FONT_BOLD,
    },
    iconImage: {
        width: 120,
        height: 120,
    },
    plainButton: {
        width: '50%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    plainButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
});

export default Home;
