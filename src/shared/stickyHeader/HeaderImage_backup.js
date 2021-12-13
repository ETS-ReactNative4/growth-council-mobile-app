import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export const backgroundImage = require('../../../assets/img/bar.png');

export const HEADER_IMAGE_HEIGHT = wHeight / 3;

const HeaderImage = (props) => {

    const {y} = props;

    const height = interpolateNode(y, {
        inputRange: [-100, 0],
        outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const top = interpolateNode(y, {
        inputRange: [0, 100],
        outputRange: [0, -100],
        extrapolateLeft: Extrapolate.CLAMP,
    });

    return (
        <Animated.Image
            source={backgroundImage}
            style={[styles.image, {top, height}]}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wWidth,
        resizeMode: 'cover',
    },
});


export default HeaderImage;
