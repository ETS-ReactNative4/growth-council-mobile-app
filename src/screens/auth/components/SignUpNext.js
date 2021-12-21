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
                <View>
                <Image source={require('../../../assets/img/welcome_profile_image.png')}/>

                </View>


                <View style={styles.header}>
                    <Text style={styles.headingText1}>Welcome John!</Text>
                    <Text style={styles.headingText2}>Have you some problem today?</Text>
                    <Text style={styles.headingText2}>Don't worry, now you are part of</Text>
                    <Text style={styles.headingText2}>Growth Council, Lets us help you.</Text>
                </View>

                <View style={styles.arrow}>
                    <Ionicons
                        name={'arrow-forward'}
                        size={80}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => navigation.navigate('Journey')}
                    />
                </View>

                  <Image source={require('../../../assets/img/footer_logo.png')}/>
                  <View>
                  <Text>Powered By</Text>
                  </View>
                  <Image source={require('../../../assets/img/footer_company_name_image.png')}/>

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
        alignItems : 'center',
        
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
       
    },
    arrow: {
        marginTop : 200,
        justifyContent : 'flex-end'
    },
});


export default SignUpNext;
