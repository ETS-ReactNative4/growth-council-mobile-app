import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Tab = (props) => {

    const {color, name, onMeasurement, onPress} = props;

    return (
        <TouchableWithoutFeedback {...{onPress}}>
            <View
                onLayout={
                    onMeasurement
                        ? ({
                               nativeEvent: {
                                   layout: {width},
                               },
                           }) => {
                            onMeasurement(width);
                        }
                        : undefined
                }
                style={styles.container}
            >
                <Text style={[styles.text, {color}]}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    text: {
        fontSize: 14,
    },
});

export default Tab;
