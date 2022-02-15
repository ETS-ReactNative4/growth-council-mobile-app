import React, {useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import Svg, {Circle, Line, Rect, Path, G} from "react-native-svg";
import times from "lodash/times";
import {withAnchorPoint} from 'react-native-anchor-point';

const svgY = (degrees) => degrees + 180;
const degToRadians = deg => (deg * Math.PI) / 180.0;

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

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


    const CARD_WIDTH = 180;
    const CARD_HEIGHT = 180;

    let spin = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const getTransform = () => {
        let transformValues = [{perspective: 400}];
        transformValues.push({rotateX: spin});
        let transform = {
            transform: transformValues,
        };
        return withAnchorPoint(transform, {x: 0.5, y: 0.5}, {width: CARD_WIDTH, height: CARD_HEIGHT})
    };

    const width = 100;
    const offsetAndroid = Platform.OS === 'android' ? width / 2 : 0;
    const [pivotX, pivotY] = [25, 25];

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Svg fill="blue" height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>

                <Rect x={-pivotX} y={-pivotY} width="50" height="50" />
                <AnimatedG
                    style={{
                        transform: [
                            { translateX: -offsetAndroid },
                            {
                                rotate: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'], // I would like to set pivot point at 25 25
                                }),
                            },
                            { translateX: offsetAndroid },
                        ],
                    }}>
                    <AnimatedPath
                        fill="#FFF"
                        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                        transform={`translate(-${pivotX} -${pivotY})`}
                    />
                </AnimatedG>
                {/*<View style={{top: 200, left: 150, position: 'absolute'}}>*/}
                    {/*<Animated.Image*/}
                        {/*// style={{*/}
                        {/*//     //height: 150, width: 150,*/}
                        {/*//    // transform: [{rotate: spin}] // Bind rotation to animated value*/}
                        {/*// }}*/}
                        {/*style={[styles.blockBlue, getTransform()]}*/}
                        {/*source={require('../../assets/img/radline_01.gif')}*/}
                        {/*resizeMode="cover"*/}
                    {/*>*/}
                    {/*</Animated.Image>*/}
                {/*</View>*/}
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
    blockBlue: {
        height: 150,
        width: 150,
        flex: 1,
    },

});

export default Radar;
