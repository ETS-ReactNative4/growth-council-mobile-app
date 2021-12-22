import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const SignUpNext = ({navigation}) => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <Image source={require('../../../assets/img/welcome_profile_image.png')}/>

                <View style={styles.header}>
                    <Text style={styles.headingText1}>Welcome to John!</Text>
                    <Text style={styles.headingText2}>Have you some problem today?</Text>
                </View>

                <View style={styles.arrow}>
                    <Ionicons
                        name={'arrow-forward'}
                        size={80}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => navigation.navigate('Journey')}
                    />
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
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        width: 210,
        marginBottom: 30,
    },
    arrow: {},
});


export default SignUpNext;
