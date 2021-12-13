import React, {forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput as FLTextInput} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

const FlatOutlineTextInput = forwardRef(({error, touched, ...otherProps}, ref) => {

    const validationColor = !touched ? Colors.SECONDARY_BORDER_COLOR : error ? Colors.PRIMARY_ERROR_COLOR : Colors.PRIMARY_BORDER_COLOR;

    return (
        <View style={{
            width: '100%',
            marginBottom: 15,
        }}>
        <FLTextInput
            mode={'outlined'}
            style={styles.textInput}
            selectionColor={Colors.PRIMARY_INPUT_TEXT_COLOR}
            outlineColor={validationColor}
            theme={{
                roundness: 5,
                colors: {
                    primary: Colors.TERTIARY_BORDER_COLOR,
                    placeholder: Colors.PRIMARY_INPUT_TEXT_COLOR,
                    text: Colors.SECONDARY_INPUT_TEXT_COLOR,
                },
            }}
            ref={ref}
            {...otherProps}
        />
        </View>
    );
});

const styles = StyleSheet.create({
    textInput: {
        height: 45,
        backgroundColor: Colors.SECONDARY_INPUT_TEXT_BACKGROUND_COLOR,
        textAlign: 'left',
        fontSize: Typography.FONT_SIZE_MEDIUM,
        color: Colors.PRIMARY_INPUT_TEXT_COLOR,
    },
});


export default FlatOutlineTextInput;
