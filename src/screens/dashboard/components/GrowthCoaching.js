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
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const GrowthCoaching = props => {
  const {
    navigation,
    growthCoachings,
    growthCoachingLoading,
    growthCoachingError,
    fetchAllgrowthCoaching,
    cleangrowthCoaching,
    growthCoachingMemberContents,
    growthCoachingMemberContentLoading,
    growthCoachingMemberContentError,
    fetchAllgrowthCoachingMemberContent,
    cleangrowthCoachingMemberContent,
  } = props;

  useEffect(() => {
    const fetchAllgrowthCoachingAsync = async () => {
      await fetchAllgrowthCoaching();
    };
    fetchAllgrowthCoachingAsync();
  }, []);

  useEffect(() => {
    const fetchAllgrowthCoachingMemberContentAsync = async () => {
      await fetchAllgrowthCoachingMemberContent();
    };
    fetchAllgrowthCoachingMemberContentAsync();
  }, []);

  console.log('Growth Coaching =========', growthCoachings);
  console.log('Member================', growthCoachingMemberContents);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.bottomWrapper}>
        <Image style={styles.bottomImage} source={{uri: item.avatar}} />
        <Text style={{fontSize: 13}}>{item.display_name}</Text>

        <Text style={{fontSize: 10}}>Frost and Sullivan</Text>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#EBECF0',
            width: 30,
            height: 30,
            justifyContent: 'center',
            marginLeft: 60,
            marginTop: 10,
          }}>
          <Ionicons
            name={'chatbox'}
            size={20}
            color="grey"
            style={{marginLeft: 5}}
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

  //   const _renderMiddleItem = ({item, index}) => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
  //         <View style={styles.middleWrapper}>
  //           <View style={styles.middleW}>
  //             <Font name={item.icon} size={30} color="#92CA91" />
  //           </View>
  //           <Text style={{marginTop: 10, fontSize: 12}}>{item.text}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   };

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
            source={require('../../../assets/img/green_blank.png')}>
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
              <Text>{date[1]}</Text>
              <Text>{date[0]}</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.headingText1}>{item.title}</Text>
              <Text style={styles.headingText2}>{item.evcal_subtitle}</Text>
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
          source={item?.uri}></ImageBackground>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <ImageBackground
					style={{width:'100%',
					height:100,

					}}
					source={require('../../../assets/img/green_blank.png')}>
						<View style={{display:'flex', flexDirection:'row'}}>
						<Image
							source={require("../../../assets/img/dashboard_logo.png")}
							style={{
								position: 'absolute',
								top: 40,
								height: 30,
								width: 30,
								left: 10,
								borderWidth: 5,
							}}
						/>
						<View style={{marginLeft:50,}}>
						<Text style={{fontWeight:"700",  color:"white", fontSize:20, top:40}}>Growth Coaching</Text>
						</View>

						<Font
							name={'search'}
							size={30}
							color="white"
							style={{marginLeft:80, marginTop:40}}
						/>
						<Image
						source={require("../../../assets/img/profile_image.png")}
						style={{
						height: 50,
						width:50,
						marginTop:30,
						marginLeft:10,
						borderRadius:50,
					}}
				/>
					</View>
				</ImageBackground> */}

        <View style={styles.top}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {' '}
            Growth Community Events
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={growthCoachings}
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
            Growth Community Member
          </Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={growthCoachingMemberContents.members}
              renderItem={_renderItem}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20}}>
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
    marginTop: 10,
  },
  middleWrapper: {
    height: 150,
    width: 90,
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
    height: 220,
    margin: 10,
    width: 400,
  },
  bottomWrapper: {
    width: 120,
    height: 190,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
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
    marginTop: 20,
    marginLeft: 10,
  },
});

export default GrowthCoaching;
