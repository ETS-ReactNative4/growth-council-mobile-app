import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'native-base';

import {CommonStyles, Colors, Typography} from '../../../theme';

const AgreementForm = (props) => {

    const {navigation, route} = props;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.TERTIARY_BACKGROUND_COLOR}/>

            <View>
                <Text style={styles.headingTitle}>A. INTRODUCTION TO OUR SERVICES</Text>
                <Text style={styles.paragraph}>
                    This Agreement governs your use of Apple’s services (“Services”),
                    through which you can buy, get, license, rent or subscribe to content,
                    Apps (as defined below), and other in-app services (collectively, “Content”).
                    ontent may be offered through the Services by Apple or a third party.
                    Our Services are available for your use in your country or territory of residence (“Home Country”).
                    By creating an account for use of the Services in a particular country or territory you are
                    specifying it as your Home Country.
                    To use our Services, you need compatible hardware, software (latest version recommended and
                    sometimes required) and Internet access (fees may apply).
                </Text>
            </View>

            <View>
                <Button style={styles.acceptButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.acceptButtonText}>Create Your Account</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 15,
        marginBottom: 25,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
});
export default AgreementForm;
