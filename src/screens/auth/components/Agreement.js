import React, {useCallback} from 'react';
import {Platform, Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';

const AgreementForm = (props) => {

    const {navigation, route, error, customerSignUp, cleanCustomer} = props;

    const handleSubmit = () => {
        const customerData = route?.params?.customer;
        delete customerData.confirm_password;
        customerSignUp(customerData);
        if (error === null) {
            navigation.navigate('SignIn');
            ToastMessage.show('Your account has been successfully created. We\\\'ve sent you verification link to your email account. Please check your email inbox and verify your email address.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => cleanCustomer();
        }, []),
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.TERTIARY_BACKGROUND_COLOR}/>
            <View style={styles.meta}>
                <Text style={styles.title}>TERMS OF SERVICE</Text>
                <TouchableOpacity>
                    <Text onPress={() => navigation.goBack()}>
                        <AntIcon name="close" size={25} color={Colors.QUATERNARY_TEXT_COLOR}/>
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.timestamp}>Last Updated: 8 OCT 2020</Text>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
            >
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
                <Text style={styles.headingTitle}>B. USING OUR SERVICES</Text>
                <Text style={styles.headingSubTitle}>PAYMENTS, TAXES, AND REFUNDS</Text>
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

            </ScrollView>

            <View style={styles.termsWrapper}>

                <View style={styles.message}>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>

                <View style={styles.checkboxWrapper}>
                    <Icon name="ios-checkbox" size={25} color={Colors.PRIMARY_TEXT_COLOR}/>
                    <Text style={styles.checkboxText}>I Accept the terms of service</Text>
                </View>
                <View style={styles.termsActionButton}>
                    <Button style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </Button>
                    <Button style={styles.acceptButton} onPress={() => handleSubmit()}>
                        <Text style={styles.acceptButtonText}>ACCEPT</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    scrollContainer: {
        height: '20%',
        width: '85%',
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 0,
    },
    contentContainer: {
        paddingBottom: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: Platform.OS === 'ios' ? 50 : 10,
        marginLeft: 32,
        marginRight: 32,
    },
    title: {
        fontFamily: Typography.FONT_SEMI_BOLD,
        fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
        marginVertical: 8,
        color: Colors.PRIMARY_HEADING_COLOR,
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
    },
    headingSubTitle: {
        ...CommonStyles.headingSubTitle,
        textAlign: 'left',
    },
    timestamp: {
        fontSize: Typography.FONT_SIZE_SMALL,
        color: Colors.TERTIARY_TEXT_COLOR,
        marginBottom: 10,
        marginLeft: 32,
        fontFamily: Typography.FONT_NORMAL,
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
    termsWrapper: {
        width: '100%',
        backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
        paddingTop: 30,
        paddingLeft: 22,
        paddingRight: 22,
        paddingBottom: 20,
        shadowColor: '#00000029',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    checkbox: {
        borderRadius: 5,
        borderColor: Colors.TERTIARY_BORDER_COLOR,
        height: Platform.OS === 'ios' ? 30 : 24,
        padding: Platform.OS === 'ios' ? 5 : 2,
        width: Platform.OS === 'ios' ? 30 : 24,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        color: Colors.QUINARY_TEXT_COLOR,
        marginRight: 15,
    },
    checkboxText: {
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_MEDIUM,
        color: Colors.QUATERNARY_TEXT_COLOR,
        paddingLeft: 5,
        paddingTop: 5,
    },
    termsActionButton: {
        marginTop: 15,
        marginLeft: 12,
        marginRight: 20,
        marginBottom: 5,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    cancelButton: {
        width: '50%',
        borderRadius: 25,
        borderColor: Colors.TERTIARY_BORDER_COLOR,
        borderWidth: 2,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
        marginRight: 5,
    },
    cancelButtonText: {
        color: Colors.SECONDARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
    acceptButton: {
        width: '50%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    acceptButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
    message: {
        ...CommonStyles.message,
    },
    errorText: {
        ...CommonStyles.errorText,
        marginLeft: 12,
        marginBottom: 5,
        marginTop: 0,
        lineHeight: 18,
        textAlign: 'left',
    },
});
export default AgreementForm;
