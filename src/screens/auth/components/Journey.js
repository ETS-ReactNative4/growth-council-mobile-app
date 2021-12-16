import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions
} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {Button} from "native-base";

const screenHeight = Math.round(Dimensions.get('window').height);

const Journey = ({navigation}) => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <View style={styles.header}>
                    <Text style={styles.headingText1}>What are you interested in?</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <Button style={[styles.button, styles.plainButton]}
                            onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={[styles.buttonText, styles.plainButtonText]}>Start your journey</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 50,
        width: '80%',
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginBottom: 20,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        ...CommonStyles.button,
        height: 56,
        width: '40%'
    },
    buttonText: {
        ...CommonStyles.buttonText,
        fontFamily: Typography.FONT_BOLD,
    },
    plainButton: {
        width: '50%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    plainButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
});


export default Journey;
