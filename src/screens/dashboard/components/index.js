import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';

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
            <Image style={styles.bottomImage} source={item?.uri} />
            <Text>{item.text}</Text>
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
                <Font name={item.icon} size={40} color="skyblue" />
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
const Dashboard = ({navigation}) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    style={{width: '100%', height: 200}}
                    source={require('../../../assets/img/blank_event_design.png')}>
                    {/*<View style={{display: 'flex', flexDirection: 'row'}}>*/}
                        {/*<Image*/}
                            {/*source={require('../../../assets/img/dashboard_logo.png')}*/}
                            {/*style={{*/}
                                {/*position: 'absolute',*/}
                                {/*top: 20,*/}
                                {/*height: 30,*/}
                                {/*width: 30,*/}
                                {/*left: 10,*/}
                                {/*borderWidth: 5,*/}
                            {/*}}*/}
                        {/*/>*/}
                        {/*<View style={{marginLeft: 50}}>*/}
                            {/*<Text style={{marginTop: 15, color: 'white', fontSize: 15}}>*/}
                                {/*Good Morning*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontWeight: '700', color: 'white', fontSize: 20}}>*/}
                                {/*Edward*/}
                            {/*</Text>*/}
                        {/*</View>*/}

                        {/*<Font*/}
                            {/*name={'search'}*/}
                            {/*size={30}*/}
                            {/*color="white"*/}
                            {/*style={{marginLeft: 150, marginTop: 20}}*/}
                        {/*/>*/}
                        {/*<Image*/}
                            {/*source={require('../../../assets/img/profile_image.png')}*/}
                            {/*style={{*/}
                                {/*height: 50,*/}
                                {/*width: 50,*/}
                                {/*marginTop: 10,*/}
                                {/*marginLeft: 10,*/}
                                {/*borderRadius: 50,*/}
                            {/*}}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    <Image
                        source={require('../../../assets/img/massk.png')}
                        style={{
                            position: 'absolute',
                            top: 90,
                            height: 150,
                            width: '30%',
                            left: 10,
                            borderRadius: 10,
                            borderWidth: 5,
                        }}
                    />
                    <Image
                        source={require('../../../assets/img/community_slider_image.png')}
                        style={{
                            position: 'absolute',
                            top: 90,
                            height: 150,
                            width: '30%',
                            left: 138,
                            borderRadius: 10,
                        }}
                    />
                    <Image
                        source={require('../../../assets/img/massk.png')}
                        style={{
                            position: 'absolute',
                            top: 90,
                            height: 150,
                            width: '30%',
                            right: 10,
                            borderRadius: 10,
                        }}
                    />
                </ImageBackground>

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
                            data={data2}
                            renderItem={_renderTopItem}
                        />
                        {/* <Swiper style={styles.wrapper} autoplay
                        paginationStyle={{top: '90%', backgroundColor: 'transparent'}}
                        showsButtons={false}
						loop={false}
						showsPagination={false}
                >

						<View style={styles.topWrapper} >
							<ImageBackground
								style={{width:'100%',
								height:170,
								borderRadius:20}}
								source={require('../../../assets/img/blank_event_design.png')}>

							<View style={{
								width:"15%",
								height:50,
								marginTop:10,
								marginLeft:240,
								backgroundColor:'#EBECF0',
								borderRadius:10,
								padding:5,
								alignItems:'center'

							}}>
								<Text>28</Text>
								<Text>July</Text>
							</View>

							<View style={styles.header}>
							<Text style={styles.headingText1}>Executive Coaching Clinic On Goal Setting</Text>
							<Text style={styles.headingText2}>Hosted by Michael Cooper</Text>
							</View>
							</ImageBackground>
						</View>

						<View style={styles.topWrapper} >

							<ImageBackground
								style={{width:'100%',
								height:170,
								borderRadius:20}}
								source={require('../../../assets/img/blank_event_design.png')}>

							<View style={{
								width:"15%",
								height:50,
								marginTop:10,
								marginLeft:240,
								backgroundColor:'#EBECF0',
								borderRadius:10,
								padding:5,
								alignItems:'center'

							}}>
								<Text>10</Text>
								<Text>Oct</Text>
							</View>

							<View style={styles.header}>
							<Text style={styles.headingText1}>Associate Member Meeting</Text>
							<Text style={styles.headingText2}>Hosted by Michael Cooper</Text>
							</View>
							</ImageBackground>

						</View>

				</Swiper> */}
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
                            data={Data}
                            renderItem={_renderItem}
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
        marginTop: 80,
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
        // backgroundColor:'white',
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
        height: 190,
        margin: 10,
        width: 400,
    },
    bottomWrapper: {
        width: 120,
        height: 140,
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
