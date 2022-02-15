import React, {useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import Svg, {Circle, Line, Polygon} from "react-native-svg";
import times from "lodash/times";
import {Keyframe} from 'react-native-reanimated';

const svgY = (degrees) => degrees + 180;
const degToRadians = deg => (deg * Math.PI) / 180.0;
const radsToDegs = rad => rad * 180 / Math.PI;

const calculateEdgePointFn = (center, radius) => (
    degree: number,
    scale: number = 1
) => {
    const degreeInRadians = degToRadians(degree);
    const degreeInRadiansY = degToRadians(svgY(degree));
    return [
        center + Math.cos(degreeInRadians) * radius * scale,
        center + Math.sin(degreeInRadiansY) * radius * scale
    ];
};

const keyframe = new Keyframe({
    0: {
        transform: [{rotate: '0deg'}],
    },
    100: {
        transform: [{rotate: '360deg'}],
    },
});

const Radar = (props) => {

    const [animation, _] = useState(new Animated.Value(0));

    const viewBoxSize = 120;
    const viewBoxCenter = viewBoxSize * 0.5;
    const radius = viewBoxSize * 0.4;

    const calculateEdgePoint = useMemo(() => calculateEdgePointFn(viewBoxCenter, radius), [radius]);

    const startAnimation = () => {
        Animated.loop(Animated.timing(animation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        ).start();
    };

    useEffect(() => {
        startAnimation();
    }, []);

    let spin = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Svg fill="blue" height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>

                <View style={{top:200, left:150, position:'absolute'}}>
                <Animated.Image
                   // x="5%"
                   // y="5%"
                    exiting={keyframe}
                    entering={spin}
                    style={{
                        height: 150, width: 150,
                        transform: [{rotate: spin}] // Bind rotation to animated value
                    }}
                    source={require('../../assets/img/radline_01.gif')}
                   resizeMode="cover"
                >
                </Animated.Image>
                </View>
                <Circle
                    cx={viewBoxCenter}
                    cy={viewBoxCenter}
                    r={radius}
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="0.5"
                    fill="blue"
                />

                {times(3).map(i => (
                    <Circle
                        key={`circle_outline_${i}`}
                        cx={viewBoxCenter}
                        cy={viewBoxCenter}
                        r={(i + 1) * radius * 0.25}
                        stroke="#FFFFFF"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                        fill="transparent"
                    />
                ))}

                {times(4).map(i => (
                    <Line
                        key={`crosshair_${i}`}
                        x1={calculateEdgePoint(i * 45)[0]}
                        y1={calculateEdgePoint(i * 45)[1]}
                        x2={calculateEdgePoint(i * 45 + 180)[0]}
                        y2={calculateEdgePoint(i * 45 + 180)[1]}
                        stroke="#FFFFFF"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                        fill="transparent"
                    />
                ))}

            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    checkCircle: {
        textAlign: 'right',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
    },

});

export default Radar;
