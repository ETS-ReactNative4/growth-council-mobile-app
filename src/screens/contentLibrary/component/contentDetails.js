import React, {useEffect, useState} from 'react';
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

const ContentLibrary = props => {
  const {
    navigation,
    contentLibrary,
    contentLibraryLoading,
    contentLibraryError,
    fetchContentLibrary,
    cleanContentLibrary,
  } = props;
  const [searchKey, setSearchKey] = useState('');

  useEffect(()=>{
	  const fetchContentLibraryAsync = async()=>{
		  await fetchContentLibrary();
	  };
	  fetchContentLibraryAsync()
  },[]);

  const Data = [
    {
      image: require('../../../assets/img/library.png'),
      text: 'Customer Experience Ecosystem',
      number: '1',
    },
    {
      image: require('../../../assets/img/blank_event_design.png'),
      text: 'Growth Innovation Leadership',
      number: '13',
    },
    {
      image: require('../../../assets/img/library.png'),
      text: 'Product Innovation & Development',
      number: '20',
    },
    {
      image: require('../../../assets/img/library.png'),
      text: 'The Future of Innovation',
      number: '17',
    },

    {
      image: require('../../../assets/img/library.png'),
      text: 'Transformational Think Tanks',
      number: '14',
    },
  ];

  const _renderContent = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('LibraryDetail')}>
        <View style={[styles.content, styles.shadowProp]}>
          <ImageBackground
            style={{width: '100%', height: 190, borderRadius: 16}}
            source={item?.image}>
            <View style={styles.contentWrapper}>
              <Text>{item.number}</Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={{color: 'black', fontSize: 14}}>{item.text}</Text>
            </View>
          </ImageBackground>
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
              <Text style={{fontSize: 9, color: '#14A2E2', marginBottom: 10}}>
                Executive MindXChange Events
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={Data}
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
    width: '98%',
    height: 190,
    marginLeft: 5,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
    // borderWidth: 0.3,
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
  wrapper: {
    padding: 10,
    zIndex: 30,
    height: 40,
    bottom: 1,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: 'white',
    position: 'absolute',
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
});
export default ContentLibrary;
