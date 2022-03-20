import React, {useState, useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LibraryDetail = props => {
  const {
    navigation,
    route,
    libraryDetails,
    libraryDetailsLoading,
    libraryDetailsError,
    fetchLibraryDetail,
    cleanLibraryDetail,
  } = props;
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const fetchLibraryDetailAsync = async () => {
      await fetchLibraryDetail(route.params.resources);
    };
    fetchLibraryDetailAsync();
  }, []);

  console.log(route.params.resources);
  console.log(route.params.breadcrumbName);
  console.log(route.params.itemname);

  const Data = [
    {
      id: 1,
      text: '2021: The Executive MindXchange Summary: Five Timely Take-Aways',
      text1:
        'An Executive MindXchange Summary of the 2021 Customer Experience Ecosystem: A Frost & Sullivan VIRTUAL Executive MindXchange',
      date: '12/09/2022',
    },
    {
      id: 2,
      text: '2021: The Executive MindXchange Summary: Five Timely Take-Aways',
      text1:
        'An Executive MindXchange Summary of the 2021 Customer Experience Ecosystem: A Frost & Sullivan VIRTUAL Executive MindXchange',
      date: '12/09/2022',
    },
  ];

  const _renderContent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ContentLibraryDetail',{id:item?.ID})}>
        <View>
          <View style={[styles.eventCard, styles.shadowProp]} key={index}>
            <View style={[styles.eventTheme, {borderColor: '#19325A'}]} />
            <View style={styles.eventDetails}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item?.post_name}</Text>
				{/* <HTMLView
                value={item?.post_excerpt}
                style={styles.eventParagraph}
              /> */}
                {/* <Text style={styles.eventParagraph}>{item.text1}</Text> */}
              </View>
              <View
                style={{
                  width: 50,
                  height: 60,
                  backgroundColor: '#EBECF0',
                  borderRadius: 10,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <FontAwesome5 name="file-video" size={20} color="#9B9CA0" />
                <Text style={{fontSize: 8, marginTop: 2}}>View</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              alignContent: 'center',
              marginLeft: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color="#B2B3B9"
                style={{marginTop: 5}}
              />
            </TouchableOpacity>

            <Searchbar
              style={styles.input}
              placeholder="Search"
              keyboardType="default"
              value={searchKey}
              onChangeText={async text => {
                setSearchKey(text);
                //   await fetchAllUsers({
                // 	s: text,
                // 	sort: sorting,
                // 	expertise_areas: category,
                //   });
              }}
            />
          </View>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 9, marginBottom: 10}}>
                Content Library
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={15}
                color="#B2B3B9"
              />
              <Text style={{fontSize: 9, marginBottom: 10}}>
                {route.params.breadcrumbName}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={15}
                color="#B2B3B9"
              />
              <Text style={{fontSize: 9, color: '#14A2E2', marginBottom: 10}}>
                {route.params.itemname}
              </Text>
            </View>

            <View style={{borderWidth: 0.2}} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}>
			   {libraryDetailsLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={libraryDetails}
            renderItem={_renderContent}
          />
          <View style={{marginTop: 10}}>
            <Footer />
          </View>
        </ScrollView>
      </View>
      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
  },
  input: {
    height: 45,
    width: '85%',
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  content: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 0.3,
    // backgroundColor: 'red',
  },
  contentWrapper: {
    width: 50,
    height: 60,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    position: 'absolute',
    right: 10,
    top: 20,
    opacity: 0.7,
  },

  eventCard: {
    width: '99%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,

    // borderWidth: 0.3,
  },
  eventTheme: {
    width: 10,
    borderRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 10,
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
  eventTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'normal',
  },
  eventParagraph: {
    fontSize: 8,
    fontWeight: 'regular',
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
    height: 50,
    width: 40,
  },
  eventDateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
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
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
export default LibraryDetail;
