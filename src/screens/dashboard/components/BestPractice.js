import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const BestPractice = props => {
    const {
        navigation,
        bestPractices,
        bestPracticeLoading,
        bestPracticeError,
        fetchAllbestPractice,
        cleanBestPractice,
        bestPracticesMemberContents,
        bestPracticesMemberContentLoading,
        bestPracticesMemberContentError,
        fetchAllbestPracticesMemberContent,
        cleanBestPracticesMemberContent,
    } = props;

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.bottomWrapper} key={index}>
                <Image
                    source={{uri: item.avatar}}
                    style={{
                        width: '90%',
                        height: 80,
                        marginTop: 6,
                        borderRadius: 20,
                    }}
                />
                <Text style={{fontSize: 11, marginTop: 8}}>{item?.display_name}</Text>
                <Text style={{fontSize: 8}}>Frost and Sullivan</Text>
                <View
                    style={{
                        borderRadius: 50,
                        backgroundColor: '#EBECF0',
                        width: 25,
                        height: 23,
                        justifyContent: 'center',
                        marginLeft: 40,
                        marginTop: 5,
                    }}>
                    <Ionicons
                        name={'chatbox'}
                        size={17}
                        color="grey"
                        style={{marginLeft: 3}}
                    />
                </View>
            </View>
        );
    };

    const data1 = [
        {
            icon: 'brain',
            text: 'Executive MindChange',
        },
        {
            icon: 'location-arrow',
            text: 'Megatrends Workshop',
        },
        {
            icon: 'window-maximize',
            text: 'Annual Council Meeting',
        },
        {
            icon: 'clipboard',
            text: 'BrainStorming Strategy Discussion',
        },
    ];

    // const _renderMiddleItem = ({item, index}) => {
    //   return (
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
    //       <View style={styles.middleWrapper}>
    //         <View style={styles.middleW}>
    //           <Font name={item.icon} size={30} color="skyblue" />
    //         </View>
    //         <Text style={{marginTop: 10, fontSize: 12}}>{item.text}</Text>
    //       </View>
    //     </TouchableOpacity>
    //   );
    // };

    const _renderTopItem = ({item, index}) => {
        const actualDate = moment(item.event_start).format('ll').split(',', 3);
        const date = actualDate[0].split(' ', 3);
        console.log(date[1]);
        return (
            <View style={styles.topWrapper}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
                    <ImageBackground
                        style={{
                            width: '100%',
                            height: 170,
                            borderRadius: 20,
                        }}
                        source={require('../../../assets/img/blue_blank.png')}>
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
                            <Text>{date[1]}</Text>
                            <Text>{date[0]}</Text>
                        </View>

                        <View style={styles.header}>
                            <Text style={styles.headingText1}>{item.title}</Text>
                            <Text style={styles.headingText2}>
                                Hosted by {item?.organizer?.term_name}
                                {item?.organizer?.description}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
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
            <View style={styles.ContentWrapper}>
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

    useEffect(() => {
        const fetchAllbestPracticeAsync = async () => {
            await fetchAllbestPractice();
        };
        fetchAllbestPracticeAsync();
    }, []);

    useEffect(() => {
        const fetchAllbestPracticeMemberContentAsync = async () => {
            await fetchAllbestPracticesMemberContent();
        };
        fetchAllbestPracticeMemberContentAsync();
    }, []);

    console.log('Best Practices ============', bestPractices);
    console.log('Members============', bestPracticesMemberContents.term_id);
    console.log('Content ============', bestPracticesMemberContents);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {' '}
                        Best Practice Events
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={bestPractices}
                            renderItem={_renderTopItem}
                        />
                    </View>
                </View>

                {/* <View style={styles.middle}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Points of Engagement
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data1}
              renderItem={_renderMiddleItem}
            />
          </View>
        </View> */}

                <View style={styles.bottom}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        Growth Community Members
                    </Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={bestPracticesMemberContents.members}
                            renderItem={_renderItem}
                        />
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20}}>
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
                            data={bestPracticesMemberContents.pillar_contents}
                            renderItem={_renderContentItem}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: '100%',
    },
    top: {
        height: 200,
        marginTop: 50,
        margin: 5,
        justifyContent: 'center',
    },

    topWrapper: {
        height: 170,
        width: 300,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 50,
    },
    header: {
        margin: 10,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_NORMAL,
        marginTop: 5,
        fontWeight: '800',
        color: 'white',
        fontSize: 16,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: '400',
        color: 'white',
    },
    middle: {
        width: 400,
        height: 190,
        marginLeft: 10,
        marginTop: 10,
    },
    middleWrapper: {
        height: 160,
        width: 90,
        borderRadius: 20,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleW: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    headingText3: {
        ...CommonStyles.headingText3,
        fontFamily: Typography.FONT_NORMAL,
        padding: 4,
    },
    bottom: {
        height: 200,
        margin: 10,
    },
    bottomWrapper: {
        width: 90,
        height: 170,
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    bottomImage: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    content: {
        height: 250,
        marginTop: 20,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 20,
    },
    ContentWrapper: {
        height: 200,
        width: 300,
        marginTop: 10,
        marginLeft: 10,
    },
});

export default BestPractice;
