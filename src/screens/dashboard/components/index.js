import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
	TouchableOpacity
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const Data = [
//     {
//         uri: require('../../../assets/img/profile_image.png'),
//         text: 'Jay',
//     },
//     {
//         uri: require('../../../assets/img/welcome_profile_image.png'),
//         text: 'John',
//     },
//     {
//         uri: require('../../../assets/img/dash_member_image.png'),
//         text: 'John',
//     },
//     {
//         uri: require('../../../assets/img/profile_image.png'),
//         text: 'Jay',
//     },
// ];

const _renderItem = ({item, index}) => {
    return (
        <View style={styles.bottomWrapper}>
            <Image style={styles.bottomImage} source={require('../../../assets/img/profile_image.png')}/>
            <Text style={{fontSize:16, marginTop:8}}>{item.data.display_name}</Text>
			<Text style={{fontSize:10}}>Frost and Sullivan</Text>
			<View style={{borderRadius:50, backgroundColor:"#EBECF0", width:30, height:30, justifyContent:"center", marginLeft:60, marginTop:10}}>
				<Ionicons
					name={'chatbox'}
					size={20}
					color="grey"
					style={{marginLeft:5,}}
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
        icon: 'brain',
        text: 'Executive MindChange',
    },
    {
        icon: 'location-arrow',
        text: 'Megatrends Workshop',
    },
];

const _renderMiddleItem = ({item, index}) => {
    return (
        <View style={styles.middleWrapper}>
            <View style={styles.middleW}>
                <Font name={item.icon} size={40} color="skyblue"/>
            </View>
            <Text style={{marginTop: 10}}>{item.text}</Text>
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
                style={{width: '100%', height: 170, borderRadius: 20}}
                source={require('../../../assets/img/blank_event_design.png')}>
                <View
                    style={{
                        width: '30%',
                        height: 50,
                        marginTop: 10,
                        marginLeft: 180,
                        backgroundColor: '#EBECF0',
                        borderRadius: 10,
                        padding: 5,
                        alignItems: 'center',
                    }}>
                    <Text>{item.post_date}</Text>
                    <Text>{item.month}</Text>
                </View>

                <View style={styles.header}>
                    <Text style={styles.headingText1}>{item.post_title}</Text>
                    <Text style={styles.headingText2}>{item.evcal_subtitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const Dashboard = (props) => {

    const {
        navigation,
        upcomingEvents,
        upcomingEventLoading,
        upcomingEventError,
        fetchAllUpcomingEvent,
        cleanUpcomingEvent,
        pointOfEngagements,
        pointOfEngagementLoading,
        pointOfEngagementError,
        fetchAllPointOfEngagement,
        cleanPointOfEngagement,
        communityMembers,
        communityMemberLoading,
        communityMemberError,
        fetchAllCommunityMember,
        cleanCommunityMember
    } = props;

    useEffect(() => {
        const fetchAllUpcomingEventAsync = async () => {
            await fetchAllUpcomingEvent();
        };
        fetchAllUpcomingEventAsync();

    }, []);

    // useEffect(() => {
    //     const fetchAllPointOfEngagementAsync = async () => {
    //        await fetchAllPointOfEngagement();
    //     };
    //     fetchAllPointOfEngagementAsync();
    // }, []);
    
    useEffect(() => {
        const fetchAllCommunityMemberAsync = async () => {
           await fetchAllCommunityMember();
        };
        fetchAllCommunityMemberAsync();
    }, []);

    console.log("upcomingEvents:::::::::::::::::", upcomingEvents);
    // console.log("pointOfEngagements:::::::::::::::::", pointOfEngagements);
    console.log("communityMembers:::::::::::::::::", communityMembers);

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    style={{width: '100%', height: 180}}
                    source={require('../../../assets/img/blank_event_design.png')}>
						<TouchableOpacity
							onPress={() => navigation.navigate('Model', {screen: 'HomeCommunity'})}>
										<Image
											source={require('../../../assets/img/massk.png')}
											style={{
												position: 'absolute',
												top: 80,
												height: 150,
												width: '30%',
												left: 10,
												borderRadius: 10,
												borderWidth: 5,
											}}
										/>
					</TouchableOpacity>
					<TouchableOpacity
							onPress={() => navigation.navigate('Model', {screen: 'HomeCommunity'})}>
                    <Image
                        source={require('../../../assets/img/community_slider_image.png')}
                        style={{
                            position: 'absolute',
                            top: 80,
                            height: 150,
                            width: '30%',
                            left: 138,
                            borderRadius: 10,
                        }}
                    />
					</TouchableOpacity>

					<TouchableOpacity
							onPress={() => navigation.navigate('Model', {screen: 'GrowthDetail'})}>
						<Image
							source={require('../../../assets/img/massk.png')}
							style={{
								position: 'absolute',
								top: 80,
								height: 150,
								width: '30%',
								right: 10,
								borderRadius: 10,
							}}
						/>
					</TouchableOpacity>
                </ImageBackground>
				</View>

                <View style={styles.top}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Upcoming Events
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={upcomingEvents}
                            renderItem={_renderTopItem}
                        />


                    </View>
                </View>

                <View style={styles.middle}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Points of Engagement
                    </Text>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data1}
                            renderItem={_renderMiddleItem}
                        />
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Growth Community Member
                    </Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={communityMembers}
                            renderItem={_renderItem}
                        />
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
        marginTop: 80,
        margin: 10,
        justifyContent: 'center',
    },

    topWrapper: {
        height: 170,
        width: 320,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 50,
    },
    header: {
        marginLeft: 10,
    },
    headingText1: {
        
        fontFamily: Typography.FONT_NORMAL,
        marginTop: 10,
        fontWeight: '800',
        color: 'white',
		fontSize:18
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: '700',
        color: 'white',
    },
    middle: {
        width: 400,
        height: 200,
        marginLeft: 10,
        marginTop: 15,
    },
    middleWrapper: {
        height: 150,
        width: 100,
        borderRadius: 20,
        marginTop: 10,
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
        height: 240,
        margin: 10,
        width: 400,
    },
    bottomWrapper: {
        width: 120,
        height: 190,
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    bottomImage: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
});

export default Dashboard;
