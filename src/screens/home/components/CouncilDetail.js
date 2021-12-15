import React from 'react';
import {Platform, Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Dimensions} from 'react-native';
import {Button} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const CouncilDetail = (props) => {

    const {navigation, route} = props;

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>
                <View style={styles.meta}>
                    <TouchableOpacity>
                        <Text onPress={() => navigation.goBack()}>
                            <AntIcon name="close" size={25} color={Colors.TERTIARY_TEXT_COLOR}/>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.headingTitle}>Growth Coaching</Text>
                    <Text style={styles.paragraph}>
                        This Agreement governs your use of Apple’s services (“Services”),
                        through which you can buy, get, license, rent or subscribe to content,
                        Apps (as defined below), and other in-app services (collectively, “Content”).
                        ontent may be offered through the Services by Apple or a third party.
                        Our Services are available for your use in your country or territory of residence (“Home
                        Country”).
                        By creating an account for use of the Services in a particular country or territory you are
                        specifying it as your Home Country.
                        To use our Services, you need compatible hardware, software (latest version recommended and
                        sometimes required) and Internet access (fees may apply).
                    </Text>
                </View>

                <Button style={styles.moreButton}>
                    <Text style={styles.moreButtonText}>Load More</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
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
    moreButton: {
        width: '50%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    moreButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
});
export default CouncilDetail;
