import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as FLTextInput} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

const FlatTextInput = forwardRef(({error, touched, ...otherProps}, ref) => {

    const validationColor = !touched ? Colors.SECONDARY_BORDER_COLOR : error ? Colors.PRIMARY_ERROR_COLOR : Colors.PRIMARY_BORDER_COLOR;

    return (
            <FLTextInput
                style={styles.textInput}
                underlineColor={validationColor}
                selectionColor={Colors.PRIMARY_INPUT_TEXT_COLOR}
                theme={{
                    colors: {
                        primary: Colors.PRIMARY_INPUT_TEXT_COLOR,
                        placeholder: Colors.SECONDARY_INPUT_TEXT_COLOR,
                        text: Colors.PRIMARY_INPUT_TEXT_COLOR,
                    },
                }}
                ref={ref}
                {...otherProps}
            />
    );
});

const styles = StyleSheet.create({
    textInput: {
        height: 56,
        marginBottom: 15,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        color: Colors.PRIMARY_INPUT_TEXT_COLOR,
        width: '100%',
        paddingHorizontal: 0,
    },
});


export default FlatTextInput;
