import React from 'react';
import {
<<<<<<< HEAD
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
=======
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
	TouchableOpacity,
	Image
} from 'react-native';
import {Button} from 'react-native-paper';
import Font from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import SearchBox from '../../../shared/form/SearchBar';
import {BubblesLoader} from 'react-native-indicator';

>>>>>>> qa
import {CommonStyles, Colors, Typography} from '../../../theme';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import Searchbox from '../../../shared/form/SearchBar';
import {Button} from 'react-native-paper';

<<<<<<< HEAD
const events = [
  {
    eventType: 'Best Practices',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Growth Coaching',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Best Practices',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
  {
    eventType: 'Growth Community',
    eventTitle: 'Executive Coaching Clinic On Goal Setting',
    eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
    eventDay: '01',
    eventMonth: 'AUG',
  },
];

const eventItems = ({item, index}) => {
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventTheme}></View>
      <View style={styles.eventDetails}>
        <View style={styles.eventInfo}>
          <Text style={styles.evnetTitle}>{item.eventTitle}</Text>
          <Text style={styles.eventParagraph}>Hosted by {item.eventHost}</Text>
        </View>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>
            {item.eventDay}
            {'\n'}
            {item.eventMonth}
          </Text>
        </View>
      </View>
    </View>
  );
};

const searchTags = [
  'Growth Coaching',
  'Community',
  'Artificial Intelligence',
  'Best Practices',
];

const searchTag = ({item, index}) => {
  return (
    <Button style={styles.searchTagBtn}>
      <Text style={styles.searchTabBtnText}>{item}</Text>
    </Button>
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

const Search = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: 150}}
          source={require('../../../assets/img/search_back_image.png')}>
          {/*<View*/}
            {/*style={{*/}
              {/*flexDirection: 'row',*/}
              {/*justifyContent: 'center',*/}
            {/*}}>*/}
            {/*<View style={{flex: 1}}>*/}
              {/*<Image*/}
                {/*source={require('../../../assets/img/dashboard_logo.png')}*/}
                {/*style={{*/}
                  {/*position: 'absolute',*/}
                  {/*top: 20,*/}
                  {/*height: 40,*/}
                  {/*width: 40,*/}
                  {/*left: 10,*/}
                  {/*borderWidth: 5,*/}
                {/*}}*/}
              {/*/>*/}
            {/*</View>*/}
            {/*<View style={{flex: 1}}>*/}
              {/*<Image*/}
                {/*source={require('../../../assets/img/dashboard_logo.png')}*/}
                {/*style={{*/}
                  {/*position: 'absolute',*/}
                  {/*top: 20,*/}
                  {/*height: 40,*/}
                  {/*width: 40,*/}
                  {/*left: 10,*/}
                  {/*borderWidth: 5,*/}
                {/*}}*/}
              {/*/>*/}
            {/*</View>*/}
            {/*<View style={{flex: 3, justifyContent: 'center'}}>*/}
              {/*<Text*/}
                {/*style={{*/}
                  {/*marginTop: 15,*/}
                  {/*fontWeight: '700',*/}
                  {/*color: 'white',*/}
                  {/*fontSize: 24,*/}
                {/*}}>*/}
                {/*Search*/}
              {/*</Text>*/}
            {/*</View>*/}
            {/*<View*/}
              {/*style={{*/}
                {/*flex: 2,*/}
                {/*justifyContent: 'center',*/}
                {/*alignItems: 'flex-end',*/}
              {/*}}>*/}
              {/*<Image*/}
                {/*source={require('../../../assets/img/small_profile_image.png')}*/}
                {/*style={{*/}
                  {/*height: 50,*/}
                  {/*width: 50,*/}
                  {/*marginTop: 10,*/}
                  {/*marginRight: 10,*/}
                  {/*borderRadius: 50,*/}
                {/*}}*/}
              {/*/>*/}
            {/*</View>*/}
          {/*</View>*/}

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Searchbox />
          </View>
        </ImageBackground>

        <View style={{marginTop: 20}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchTags}
            renderItem={searchTag}
          />
        </View>

        <View style={styles.middle}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Suggestions</Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data1}
              renderItem={_renderMiddleItem}
            />
          </View>
        </View>
        <View style={styles.events}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={events}
            renderItem={eventItems}
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
  searchTagBtn: {
    backgroundColor: '#ffff',
    height: 50,
    width: 170,
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 10,
  },
  searchTabBtnText: {
    color: '#060606',
    fontSize: 12,
  },
  events: {
    padding: 20,
  },
  eventCard: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  eventTheme: {
    height: '100%',
    width: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(128,186,116,1)',
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  evnetTitle: {
    marginBottom: 5,
  },
  eventParagraph: {
    fontSize: 10,
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
  },
  eventDateText: {
    textAlign: 'center',
  },
=======
const Search = (props) => {

    const {
        navigation,
        searches,
        searchLoading,
        searchError,
        searchEventsByIdentifier,
        cleanSearch,
    } = props;

    console.log("searches::::::::::::", searches);

	
	const eventItems = ({item, index}) => {
	
		const actualDate = moment(item.event_start).format('ll').split(',', 3);
		const date = actualDate[0].split(' ', 3);

		let backgroundColor = Colors.COMMUNITY_COLOR;
		switch (item?.pillar_categories[0]?.slug) {
		case 'growth-community':
			backgroundColor = Colors.COMMUNITY_COLOR;
			break;
		case 'basic-practices':
			backgroundColor = Colors.PRACTICE_COLOR;
			break;
		case 'growth-coaching':
			backgroundColor =Colors.COACHING_COLOR ;
		}
		return (
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
					<View style={[styles.eventCard, styles.shadowProp]} key={index}>
						<View style={[styles.eventTheme,{backgroundColor:backgroundColor}]}/>
						<View style={styles.eventDetails}>
							<View style={styles.eventInfo}>
								<Text style={styles.evnetTitle}>{item?.title}</Text>
								<Text style={styles.eventParagraph}>Hosted by {item?.organizer?.term_name}  {item?.organizer?.description}</Text>
							</View>
							<View style={styles.eventDate}>
								<Text style={styles.eventDateText}>
									{date[1]}
									{'\n'}
									{date[0]}
								</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	
	
	const searchTag = ({item, index}) => {
		return (
			<View style={[styles.searchTagBtn, styles.shadowProp]}>
				<Text style={styles.searchTabBtnText}>{item.name}</Text>
			</View>
		);
	};
	

	
	const _renderMiddleItem = ({item, index}) => {
		return (
			<View style={styles.middleWrapper}>
				<View style={[styles.middleW, styles.shadowProp]}>
				<Image
					source={{uri: item?.image}}
					style={{width: 30, height: 30}}
            	/>
				</View>
				<Text style={{marginTop: 8,fontSize:10 }}>{item?.name}</Text>
			</View>
		);
	};

    return (
        <ScrollView style={{backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <ImageBackground
                    style={{width: '100%', height: 100}}
                    source={require('../../../assets/img/search_back_image.png')}>
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <SearchBox searchEventsByIdentifier={searchEventsByIdentifier}/>
                    </View>
                </ImageBackground>

                <View style={{marginTop: 20}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={searches.pillars}
                        renderItem={searchTag}
                    />
                </View>

                <View style={styles.middle}>
                    <Text style={{fontFamily:Typography.FONT_SF_SEMIBOLD, fontSize: 11}}>Suggestions</Text>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={searches.poes}
                            renderItem={_renderMiddleItem}
                        />
                    </View>
                </View>
                <View style={styles.events}>
				{searchLoading && (
					<View style={styles.loading1}>
					<BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60} />
					</View>
				)}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={searches.events_sessions}
                        renderItem={eventItems}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
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

        marginLeft: 10,
        marginTop: 5,
	
    },
    middleWrapper: {
		width: 80,
		borderRadius: 20,
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight:15,
    },
    middleW: {
		backgroundColor: 'white',
		width: 64,
		height: 64,
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
    searchTagBtn: {
        backgroundColor: '#ffff',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        marginLeft: 10,
		marginTop:5,
		marginBottom:5,
		marginRight:10,
		padding:15,
    },
    searchTabBtnText: {
        color: '#060606',
        fontSize: 12,
    },
    events: {
        padding: 20,
    },
    eventCard: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    eventTheme: {
        width: 10,
        borderTopLeftRadius:10,
		borderBottomLeftRadius:10,
        backgroundColor: 'rgba(128,186,116,1)',
    },
    eventDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    eventInfo: {
        paddingRight: 5,
        flex: 5,
    },
    evnetTitle: {
        marginBottom: 5,
		fontSize:14,
		fontFamily:Typography.FONT_SF_REGULAR
    },
    eventParagraph: {
        fontSize: 10,
    },
    eventDate: {
        flex: 1,
        padding:10,
        backgroundColor: 'rgba(245,245,245,1)',
        borderRadius: 10,
        fontSize: 18,
    },
    eventDateText: {
        textAlign: 'center',
    },
	shadowProp: {
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	
		elevation: 5,
	  },
	  loading1: {
		marginLeft: 150,
		flex: 1,
		flexDirection: 'column',
		position: 'absolute',
		zIndex: 1011,
	  },
>>>>>>> qa
});

export default Search;
