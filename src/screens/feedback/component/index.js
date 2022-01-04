import React, {useEffect} from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {Button} from 'native-base';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Feedback = (props) => {

    const {navigation, feedback, feedbackLoading, feedbackError, fetchFeedback} = props;

    const win = Dimensions.get('window');

    useEffect(() => {
        const fetchFeedbackAsync = async () => {
            await fetchFeedback();
        };
        fetchFeedbackAsync();
    }, []);

    console.log("feedback::::::", feedback)
    
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
            />
            <ScrollView
                style={{
                    height: Platform.OS === 'ios' ? 400 : 350,
                }}>
                <View style={[styles.container, {height: win.height}]}>
                    <View style={styles.feedback}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{feedback.heading1}</Text>
                            <View style={styles.titleBorder}></View>
                        </View>
                        <Text style={styles.paragraph}>
                            {/* As a member-driven organization, we thrive on maintaining an open
              and continuous dialog with our members. If you have feedback or an
              idea for making your membership experience most impactful, we
              welcome your input! */}
                            {feedback.content1}
                        </Text>
                    </View>
                    <View style={styles.cta}>
                        <Button
                            style={[
                                styles.button,
                                styles.plainButton,
                                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
                            ]}
                            onPress={() => navigation.navigate('About')}>
                            <Text style={[styles.buttonText, styles.plainButtonText]}>
                                Contact Our Program Team
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.poweredBy}>
                        <Text style={{fontSize: 7, marginTop: 2}}>Powered By</Text>
                        <Image
                            source={require('../../../assets/img/footer_company_name_image.png')}
                            style={{marginTop: 2}}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};
export default Feedback;
const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    header: {
        ...CommonStyles.header,
        marginTop: Platform.OS === 'ios' ? 120 : 62,
        width: '100%',
        marginLeft: 32,
        marginRight: 32,
    },
    feedback: {
        padding: 30,
    },
    title: {
        marginBottom: 30,
    },
    titleText: {
        color: '#000',
        fontSize: 24,
        paddingBottom: 30,
        fontWeight: '600',
    },
    titleBorder: {
        height: 5,
        width: 50,
        backgroundColor: 'rgba(24,56,99,1)',
    },
    aboutImage: {
        marginBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
    },
    backgroundText: {
        padding: 30,
        flex: 1,
        backgroundColor: '#1f71cc',
    },
    backgroundTitle: {
        paddingBottom: 30,
    },
    backgroundTitleText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 30,
    },
    backgroundTitleBorder: {
        height: 5,
        width: 50,
        backgroundColor: '#fff',
    },
    backgroundParagraph: {
        color: '#fff',
    },
    cta: {
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        ...CommonStyles.button,
        height: 56,
        width: '40%',
        backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
    },
    buttonText: {
        ...CommonStyles.buttonText,
        fontFamily: Typography.FONT_BOLD,
        fontSize: 15,
    },
    iconImage: {
        width: 300,
        height: 350,
        borderRadius: 15,
        overflow: 'hidden',
    },
    plainButton: {
        width: '70%',
        borderRadius: 25,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    plainButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
    poweredBy: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 30,
    },
});


