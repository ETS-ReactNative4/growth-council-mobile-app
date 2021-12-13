import React, {forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput as RNTextInput} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

const TextInput = forwardRef(({error, touched, ...otherProps}, ref) => {

    const validationColor = !touched ? Colors.SECONDARY_BORDER_COLOR : error ? Colors.PRIMARY_ERROR_COLOR : Colors.PRIMARY_BORDER_COLOR;

    return (
        <View style={{
            borderRadius: 8,
            borderColor: validationColor,
            borderWidth: 1,
            height: 56,
            overflow: 'hidden',
            marginLeft: 9,
            marginRight: 15,
            width: '90%',
            marginBottom: 15,
        }}>
            <RNTextInput
                style={styles.textInput}
                ref={ref}
                {...otherProps}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 56,
        overflow: 'hidden',
        backgroundColor: Colors.SECONDARY_INPUT_TEXT_BACKGROUND_COLOR,
        textAlign: 'left',
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_NORMAL,
        color: Colors.TERTIARY_INPUT_TEXT_COLOR,
    },
});

export default TextInput;
