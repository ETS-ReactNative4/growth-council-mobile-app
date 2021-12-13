import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash/lib/module/v1';

import HeaderImage from './HeaderImage';
import Header from './Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
});

const StickyHeader = (props) => {

    const {y, tabs} = props;

    const scrollView = useRef(null);

    const onScroll = onScrollEvent({y});

    return (
        <View style={styles.container}>
            {/*<HeaderImage {...{y}} />*/}
            <Animated.ScrollView
                ref={scrollView}
                style={StyleSheet.absoluteFill}
                scrollEventThrottle={1}
                {...{onScroll}}
            >
                {props.children}
            </Animated.ScrollView>
            <Header {...{y, tabs, scrollView}} />
        </View>
    );
};

export default StickyHeader;
