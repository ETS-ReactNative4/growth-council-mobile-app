import React, {useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';

const CommunityDetail = props => {
    const {
        navigation,
        route,
        sessionDetails,
        sessionDetailLoading,
        sessionDetailError,
        fetchSessionDetailByIdentifier,
        cleanSessionDetail,
    } = props;

    useEffect(() => {
        const fetchEventDetailAsync = async () => {
            await fetchSessionDetailByIdentifier(route.params.id);
        };
        fetchEventDetailAsync();
    }, []);

    console.log('route.params.id:::::::::::::::::', route.params.id);
    console.log('Session Detail:::::::::::::::::', sessionDetails.ID);

    const Data = [
        {
            uri: require('../../../assets/img/profile_image.png'),
            text: 'Jay',
        },
        {
            uri: require('../../../assets/img/welcome_profile_image.png'),
            text: 'John',
        },
        {
            uri: require('../../../assets/img/dash_member_image.png'),
            text: 'John',
        },
        {
            uri: require('../../../assets/img/profile_image.png'),
            text: 'Jay',
        },
    ];

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.bottomWrapper}>
                <Image style={styles.bottomImage} source={item?.uri}/>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.text}</Text>
                <View
                    style={{
                        borderRadius: 50,
                        backgroundColor: '#eeeeee',
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        marginLeft: 60,
                    }}>
                    <Ionicons
                        name={'chatbox'}
                        size={20}
                        color="#cccccc"
                        style={{marginLeft: 5}}
                    />
                </View>
            </View>
        );
    };

    const data2 = [
        {
            date: '10',
            month: 'july',
            text: 'Executive Coaching Clinic On Goal Setting',
            text1: 'Hosted by Michael Cooper',
        },
        {
            date: '10',
            month: 'Oct',
            text: 'Associate Member Meeting',
            text1: 'Hosted by Michael Cooper',
        },
    ];

    const _renderTopItem = ({item, index}) => {
        return (
            <View style={styles.topWrapper}>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: 170,
                        borderRadius: 20,
                    }}
                    source={require('../../../assets/img/blank_event_design.png')}>
                    <View
                        style={{
                            width: '15%',
                            height: 50,
                            marginTop: 10,
                            marginLeft: 240,
                            backgroundColor: '#EBECF0',
                            borderRadius: 10,
                            padding: 5,
                            alignItems: 'center',
                        }}>
                        <Text>{item.date}</Text>
                        <Text>{item.month}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headingText1}>{item.text}</Text>
                        <Text style={styles.headingText2}>{item.text1}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const pic = [
        {
            uri: require('../../../assets/img/welcome_screen_info_image.png'),
        },
        {
            uri: require('../../../assets/img/image.png'),
        },
        {
            uri: require('../../../assets/img/contactus.png'),
        },
    ];

    const _renderContentItem = ({item, index}) => {
        return (
            <View style={styles.contentWrapper2}>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: 190,
                        borderRadius: 20,
                    }}
                    source={item?.uri}/>
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={require("../../../assets/img/image.png")} style={{height: 400}}>


                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <View style={styles.arrow}>
                            <Ionicons name={'arrow-back'} size={50} color="white"/>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.icon}>
                        <Image
                            source={require('../../../assets/img/Path203.png')}
                            style={{
                                width: 35,
                                height: 35,
                                marginLeft: 25,
                            }}
                        />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentWrapper}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    marginTop: 50,
                                }}>
                                Megatrend Workshop
                            </Text>
                            <Text style={styles.paragraph}>
                                Mega trends are transformative, global forces that define the
                                futre world with their far reaching impact on business,
                                societies, economics, cutures and personal lives. Global Mega
                                Trends to 2030. Futurecasting key themes that will shape our
                                futures lives, provides a comprehensive analysis of the
                                transformative, global forces that define the future world with
                                their far-reaching impact on business, societies, economics,
                                culture and personal lives.
                            </Text>

                            <View style={styles.top}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}> Events</Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={data2}
                                        renderItem={_renderTopItem}
                                    />
                                </View>
                            </View>
                            <View style={styles.bottom}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}> Members</Text>
                                <View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={Data}
                                        renderItem={_renderItem}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        marginTop: 30,
                                        marginLeft: 10,
                                    }}>
                                    {' '}
                                    Growth Coaching Content
                                </Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={pic}
                                        renderItem={_renderContentItem}
                                    />
                                </View>
                            </View>
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
        height: 1310,
    },
    arrow: {
        marginTop: 30,
    },
    icon: {
        width: 90,
        height: 90,
        backgroundColor: 'white',
        borderRadius: 19,
        marginLeft: 150,
        marginTop: 190,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 10,
        borderWidth: 0.3,
    },
    content: {
        backgroundColor: 'skyblue',
        borderRadius: 18,
        marginTop: 150,
    },
    contentWrapper: {
        backgroundColor: 'white',
        borderRadius: 18,
        height: 1000,
        overflow: 'scroll',
        marginTop: 10,
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: 15,
        lineHeight: 24,
        margin: 20,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
    top: {
        height: 200,
        marginTop: 10,
        margin: 10,
        justifyContent: 'center',
    },
    topWrapper: {
        height: 170,
        width: 300,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 50,
    },
    bottom: {
        height: 180,
        margin: 10,
        width: 400,
    },
    bottomWrapper: {
        width: 120,
        height: 160,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 0.3,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },
    bottomImage: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    header: {
        margin: 10,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginTop: 10,
        fontWeight: '800',
        color: 'white',
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: '700',
        color: 'white',
    },
    contentWrapper2: {
        height: 200,
        width: 310,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 50,
    },
});

export default CommunityDetail;
