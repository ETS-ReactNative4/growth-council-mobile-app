import React from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView, Dimensions, ImageBackground} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const Detail = (props) => {

    const {navigation, route} = props;

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>

            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover">
                    <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                    <View style={{height: '15%'}}>
                    </View>

                    <View style={styles.content}>

                        <View>
                            <Text style={styles.headingText1}>WHY THE RIGHT COMMUNIITY MATTERS TO YOUR SUCCESS</Text>
                             <View style = {{left : 0}}>
                                <Ionicons
                                    name={'remove-outline'}
                                    size={70}
                                    color={'#173762'}                                    
                                />
                            </View>  
                            <Text style={styles.paragraph}>
                                This Agreement governs your use of Apple’s services (“Services”),
                                through which you can buy, get, license, rent or subscribe to content,
                                Apps (as defined below), and other in-app services (collectively, “Content”).

                                ontent may be offered through the Services by Apple or a third party.
                                Our Services are available for your use in your country or territory of residence (“Home
                                Country”).

                                By creating an account for use of the Services in a particular country or territory you
                                are
                                specifying it as your Home Country.
                                To use our Services, you need compatible hardware, software (latest version recommended
                                and
                                sometimes required) and Internet access (fees may apply).
                            </Text>
                        </View>

                        <View>
                            <Button style={styles.acceptButton} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.acceptButtonText}>Create Your Account</Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,

    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 18,
        height: '100%',
        padding: 25
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        color: Colors.NONARY_TEXT_COLOR,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 5,
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 5,
        marginBottom: 25,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
    acceptButton: {
        borderRadius: 10,
        marginTop: 30,
        width: '45%',
        height: 50,
        backgroundColor: '#183863'
    },
    acceptButtonText: {
        color: '#ffffff',
    }
});
export default Detail;
