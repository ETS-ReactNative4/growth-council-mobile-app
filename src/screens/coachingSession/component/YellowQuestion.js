import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Typography} from '../../../theme';
import {RadioButton} from 'react-native-paper';

const YellowQuestion = (props) => {

    const {question} = props;

    const [checked, setChecked] = useState(null);

    return (
        <View style={[styles.questionWrapper, styles.shadowProp]}>

            <View style={{alignItems: "center", justifyContent: 'center', borderBottomWidth: 0.1}}>
                <Text style={styles.title}>{question?.post_title}</Text>
            </View>
            {[
                {name: "Yes", value: true},
                {name: "No", value: false}
            ].map((option) => (
                <View style={styles.wrapper}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton
                            value={option?.value}
                            status={option?.value === checked ? "checked" : "unchecked"}
                            onPress={() => {
                                setChecked(option?.value);
                            }}

                        />
                        <Text style={{marginTop: 5}} key={option.name}>{option.name}</Text>
                    </View>

                </View>
            ))}

            <View>

            </View>
        </View>
    )

};
const styles = StyleSheet.create({

    questionWrapper: {
        height: 154,
        borderRadius: 22,
        margin: 5,
        marginTop: 25,
        padding: 12,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    title: {
        fontSize: 14,
        fontFamily: Typography.FONT_SF_SEMIBOLD,
        color: "#1E2022"
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 20,
    }

});

export default YellowQuestion;
