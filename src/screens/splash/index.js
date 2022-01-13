import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const SplashScreen = () => {

    const [animation, _] = useState(new Animated.Value(0));

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    };

    const animatedInterpolate = animation.interpolate({
        inputRange: [.5, 1],
        outputRange: [0, -200],
        extrapolate: 'clamp',
    });

    const animatedStyles = {
        transform: [
            {translateY: animatedInterpolate},
        ],
    };

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
               // style={[animatedStyles]}
                source={require('../../assets/img/splash-screen.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default SplashScreen;
