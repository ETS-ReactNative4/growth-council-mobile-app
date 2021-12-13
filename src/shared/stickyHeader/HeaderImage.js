import React from 'react';
import {Platform, Dimensions, StyleSheet, View} from 'react-native';
import {Extrapolate, interpolateNode} from 'react-native-reanimated';

import {CommonStyles, Colors, Typography} from '../../theme';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export const backgroundImage = require('../../../assets/img/bar.png');

export const HEADER_IMAGE_HEIGHT = Platform.OS === 'ios' ? 283 : 330;

const images = [
    {
        image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        title: 'Night Life',
    },
    {
        image: 'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
        title:
            'Food',
    },
];

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
        <View style={{}}>

        </View>
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
    parallaxHeader: {
        alignItems: 'flex-end',
        bottom: 250,
        justifyContent: 'space-between',
    },
    connectButtonWrapper: {
        ...CommonStyles.buttonWrapper,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: 'auto',
        paddingTop: 20,
        right: 15,
    },
    connectButton: {
        ...CommonStyles.button,
        backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
        width: 90,
        height: 30,
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
    },
    connectButtonText: {
        ...CommonStyles.buttonText,
        color: Colors.DUODENARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_LARGE,
    },
    menuWrapper: {
        ...CommonStyles.buttonWrapper,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 80,
        right: 15,
    },
    menuIcon: {
        width: 54,
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
    },
});


export default HeaderImage;
