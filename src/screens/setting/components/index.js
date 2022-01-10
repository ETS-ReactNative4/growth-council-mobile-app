import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    Switch,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {clearAsyncStorage} from '../../../utils/storageUtil';

const Setting = (props) => {
    const {
        navigation,
        route,
        upcomingEvents,
        upcomingEventLoading,
        upcomingEventError,
        fetchAllUpcomingEvent,
        cleanUpcomingEvent,
        profile,
        profileLoading,
        profileError,
        fetchProfile,
        cleanProfile,
    } = props;

	
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        const fetchProfileAsync = async () => {
            await fetchProfile();
        };
        fetchProfileAsync();

    }, []);

    const logout = () => {
        clearAsyncStorage();
        navigation.navigate('Home')
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,}}>
            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/img/splash-screen.png")} resizeMode="cover">


                    <View style={{height: '100%'}}>
                        <View style={styles.icon}>
                            <Image source={{uri: profile.avatar}}
                                   style={{width: 90, height: 90, borderRadius: 19,}}
                            />
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.headingText1}>{profile.display_name}</Text>
                            <Text>{profile.user_email}</Text>
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.wrapper}>

                                <View style={styles.middleWrapper}>

                                    <View style={styles.middleImage}>
                                        <Ionicons
                                            name="person-outline"
                                            color='white'
                                            size={20}/>
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Account</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ManageAccount')}>
                                        <Ionicons
                                            name='chevron-forward-outline'
                                            size={20}
                                            color='#d7d7d7'
                                            style={{marginTop: 20, marginLeft: 120}}
                                        />
                                    </TouchableOpacity>

                                </View>


                                <View style={styles.middleWrapper}>
                                    <View style={styles.middleImage}>
                                        <Material
                                            name={'payment'}
                                            size={20}
                                            color="white"

                                        />
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Payment Method</Text>
                                    <Ionicons
                                        name='chevron-forward-outline'
                                        size={20}
                                        color='#d7d7d7'
                                        style={{marginTop: 20, marginLeft: 50}}
                                    />

                                </View>
                                <View style={styles.middleWrapper}>
                                    <View style={styles.middleImage}>
                                        <Ionicons
                                            name={'notifications'}
                                            size={20}
                                            color="white"

                                        />
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Notification</Text>

                                    <Switch
                                        trackColor={{false: "#767577", true: "#32a32e"}}
                                        thumbColor={isEnabled ? "white" : "white"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                        style={{transform: [{scaleX: 1.4}, {scaleY: 1.5}], marginLeft: 60}}
                                    />

                                </View>
                            </View>
                            <View style={styles.wrapper}>

                                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                                    <View style={styles.middleWrapper}>
                                        <View style={styles.middleImage1}>
                                            <Ionicons
                                                name={'headset'}
                                                size={20}
                                                color="white"

                                            />
                                        </View>
                                        <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Help</Text>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                                    <View style={styles.middleWrapper}>
                                        <View style={styles.middleImage1}>
                                            <Ionicons
                                                name={'lock-closed-outline'}
                                                size={20}
                                                color="white"

                                            />
                                        </View>
                                        <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Privacy Policy</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={logout}>
                                    <View style={styles.middleWrapper}>
                                        <View style={styles.middleImage1}>
                                            <Material
                                                name={'logout'}
                                                size={20}
                                                color="white"
                                            />
                                        </View>
                                        <Text style={{fontSize: 18, fontWeight: '500', margin: 15}}>Logout</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>


                            <Text style={{fontSize: 10, marginTop: 10}}>Powered By</Text>
                            <Image source={require('../../../assets/img/footer_company_name_image.png')}
                                   style={{width: '60%', marginTop: 10, marginBottom: 15}}
                            />

                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        height: '100%',
    },
    header: {
        width: '80%',
        height: 190,
        backgroundColor: "white",
        margin: 40,
        marginTop: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        borderWidth: 0.5,

    },
    icon: {
        width: 90,
        height: 90,
        backgroundColor: "white",
        borderRadius: 19,
        marginLeft: 150,
        marginTop: 30,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 20,
        borderWidth: 0.3,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE_MINUS,
        marginTop: 40,
        fontWeight: '800',


    },
    middle: {
        height: '80%',
        width: '100%',
        backgroundColor: 'white',
        marginTop: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute"
    },
    wrapper: {
        width: '80%',
        height: 180,
        marginTop: 10,
    },
    middleWrapper: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',


    },

    middleImage: {
        width: 40,
        height: 40,
        backgroundColor: '#3A9BDC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    middleImage1: {
        width: 40,
        height: 40,
        backgroundColor: '#d7d7d7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
    }


})
