import React from 'react';
import {Platform, Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Dimensions,Image} from 'react-native';
import {Button} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const CouncilDetail = (props) => {

    const {navigation, route} = props;

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
            <View style={styles.container}>
            
                <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

                <View style={styles.meta}>
                    <Image style={{ width: '100%',height: 230, alignItems: 'center', borderRadius: 15}} source={require('../../../assets/img/welcome_screen_info_image.png')}/>
                     <View style = {{ position : 'absolute', right : 0}}>
                        <Ionicons
                            name={'md-close-circle-sharp'}
                            size={40}
                            color={'#0aade7'}
                            onPress={() => navigation.goBack()}
                        />
                    </View>                     
                </View>                 

                <View style = {{marginBottom: 20}}>
                    <Text style={styles.headingTitle}>Growth Coaching</Text>
                    <Text style={styles.paragraph}>
                        This Agreement governs your use of Apple’s services (“Services”),
                        through which you can buy, get, license, rent or subscribe to content,
                        Apps (as defined below), and other in-app services (collectively, “Content”).
                        ontent may be offered through the Services by Apple or a third party.
                        Our Services are available for your use in your country or territory of residence (“Home
                        Country”).                        
                    </Text>
                     <Text style={styles.paragraph}>                       
                        By creating an account for use of the Services in a particular country or territory you are
                        specifying it as your Home Country.
                        To use our Services, you need compatible hardware, software (latest version recommended and
                        sometimes required) and Internet access (fees may apply).
                    </Text>
                </View>

                <View style = {{ alignItems: 'center', justifyContent: 'center',}}>
                     <Button style={styles.moreButton} onPress={() => navigation.navigate('Detail')}>
                    <Text style={styles.moreButtonText}>Load More</Text>
                </Button>

                </View>
               
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        padding : 20,        
    },
    meta: {      
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 50 : 10,
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
        fontSize : 20,
        fontWeight: "bold",
        color: '#1f3354',
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
    moreButton: {
        width: '40%',
        borderRadius: 10,
        height: 40,
        fontSize : 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,

    },
    moreButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
        fontSize : 13,
        fontWeight: "bold",
    },
});
export default CouncilDetail;
