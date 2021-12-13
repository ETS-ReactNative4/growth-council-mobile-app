import React, {forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput as FLTextInput} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

const FlatRoundedTextInput = forwardRef(({error, touched, ...otherProps}, ref) => {

    const validationColor = !touched ? Colors.SECONDARY_BORDER_COLOR : error ? Colors.PRIMARY_ERROR_COLOR : Colors.PRIMARY_BORDER_COLOR;

    return (
        <View style={{
            borderRadius: 5,
            borderColor: validationColor,
            borderWidth: 1,
            width: '100%',
            height: 56,
            overflow: 'hidden',
            marginBottom: 15,
        }}>
            <FLTextInput
                style={styles.textInput}
                selectionColor={Colors.PRIMARY_INPUT_TEXT_COLOR}
                theme={{
                    roundness: 5,
                    colors: {
                        primary: Colors.SECONDARY_INPUT_TEXT_COLOR,
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
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 56,
        overflow: 'hidden',
        backgroundColor: Colors.SECONDARY_INPUT_TEXT_BACKGROUND_COLOR,
        textAlign: 'left',
        fontSize: Typography.FONT_SIZE_MEDIUM,
        color: Colors.PRIMARY_INPUT_TEXT_COLOR,
    },
});


export default FlatRoundedTextInput;
