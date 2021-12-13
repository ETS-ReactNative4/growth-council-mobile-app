import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {interpolateNode, Extrapolate, useCode, greaterThan, set, block} from 'react-native-reanimated';
import {useValues, withTimingTransition} from 'react-native-redash/lib/module/v1';
import Icon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';

import {Typography} from '../../theme';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

const Header = (props) => {

    const {y, tabs, scrollView} = props;

    const [toggle] = useValues(0);
    const insets = useSafeAreaInsets();
    const transition = withTimingTransition(toggle, {duration: 100});
    const {top: paddingTop} = insets;

    const translateX = interpolateNode(y, {
        inputRange: [0, HEADER_IMAGE_HEIGHT],
        outputRange: [-ICON_SIZE - PADDING, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    const translateY = interpolateNode(y, {
        inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
        outputRange: [
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
            0,
        ],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const opacity = transition;

    useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
        toggle,
        y,
    ]);

    return (
        <Animated.View style={[styles.container, {paddingTop}]}>
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    backgroundColor: 'black',
                }}
            />
            <View style={styles.header}>
                <Animated.View style={{opacity: transition}}>
                    <Icon name="arrow-left" size={ICON_SIZE} color="black"/>
                </Animated.View>
                <Animated.Text
                    style={[
                        styles.title,
                        {transform: [{translateY}]},
                    ]}
                >
                    Camida Restro & Bar
                </Animated.Text>
                {/*<Icon name="heart" size={ICON_SIZE} color="white"/>*/}
            </View>
            <TabHeader {...{y, transition, tabs, scrollView}} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    header: {
        flexDirection: 'row',
        height: MIN_HEADER_HEIGHT,
        alignItems: 'center',
        paddingHorizontal: PADDING,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: Typography.FONT_SIZE_LARGE,
        fontFamily: Typography.FONT_SEMI_BOLD,
    },
});

export default Header;
