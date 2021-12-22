import React, {useState} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image, TouchableOpacity, Dimensions
} from 'react-native';
import {Button} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {CommonStyles, Colors, Typography} from '../../../theme';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const Home = ({navigation}) => {

    const [activeSlider, setActiveSlider] = useState(1);

    const wp = (percentage) => {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    };

    const slideHeight = viewportHeight * 0.36;
    const slideWidth = wp(60);
    const sliderWidth = viewportWidth;
    const itemHorizontalMargin = wp(2);
    const itemWidth = slideWidth + itemHorizontalMargin * 2;

    const carouselItems = [
        {
            uri: require('../../../assets/img/slider1_image.png'),
            text: "Growth Coaching",
        },
        {
            uri: require('../../../assets/img/community_slider_image.png'),
            text: "Community",
        },
        {
            uri: require('../../../assets/img/best_practices_slider_image.png'),
            text: "Best Practices",
        },
    ];

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Model', {screen: 'CouncilDetail'})}>
                <View
                    style={{
                        backgroundColor: "floralwhite",
                        borderRadius: 5,
                        height: 250,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                >
                    <Image source={item?.uri} style={{resizeMode: 'cover'}}/>
                    <Text>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <View style={styles.header}>
                <Text style={styles.headingText1}>Welcome</Text>
                <Text style={styles.headingText2}>To The Growth Council</Text>
            </View>
            <Carousel
                layout={"default"}
                data={carouselItems}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                renderItem={_renderItem}
                firstItem={1}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContent}
                loop={true}
                loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                hasParallaxImages={true}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                onSnapToItem={(index) => setActiveSlider(index)}
            />

            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeSlider}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />

            <View style={styles.buttonWrapper}>
                <Button style={[styles.button, styles.plainButton]}
                        onPress={() => navigation.navigate('HomeDetail')}>
                    <Text style={[styles.buttonText, styles.plainButtonText]}>Get Started</Text>
                </Button>
                <Button style={[styles.button, styles.plainButton]}
                        onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.buttonText}>I already have an account </Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginBottom: 20,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        marginBottom: 20,
    },
    slider: {
        marginTop: 15,
        overflow: 'visible'
    },
    sliderContent: {
        paddingVertical: 10
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_NORMAL,
        top: -40,
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
        width: 250,
        height: 250,
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
