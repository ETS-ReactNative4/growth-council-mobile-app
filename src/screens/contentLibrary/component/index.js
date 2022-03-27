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
  StatusBar,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import SearchBox from '../../../shared/header/SearchHeader';

const Content = props => {
  const {
    navigation,
    content,
    contentLoading,
    contentError,
    cleanContent,

    searchContent,
    searchContentLoading,
    searchContentError,
    searchContentByIdentifier,
    cleanContentSearch,
  } = props;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(content);

  useEffect(() => {
    setFilteredDataSource(content);
  }, [content]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = content?.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(content);
      setSearch(text);
    }
  };

  const _renderContent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.children_count === 0) {
            navigation.navigate('LibraryDetail', {
              resources: item?.term_id,
              itemname: item?.name,
            });
          } else {
            navigation.navigate('ContentDetail', {
              resourceId: item?.term_id,
              resourcesName: item?.name,
            });
          }
        }}>
        <View style={[styles.content, styles.shadowProp]}>
          {item?.image === null && (
            <ImageBackground
              style={{width: '100%', height: 190, borderRadius: 16}}
              source={require('../../../assets/img/image.png')}>
              <View style={styles.contentWrapper}>
                <Text style={{color: 'black'}}>{item?.children_count}</Text>
                <Text style={{fontSize: 10, color: 'black'}}>Article</Text>
              </View>
              <View style={styles.wrapper}>
                <HTMLView
                  value={item?.name}
                  textComponentProps={{
                    style: {
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '600',
                    },
                  }}
                />
                {/* <Text style={{color: 'black', fontSize: 14}}>{item.name}</Text> */}
              </View>
            </ImageBackground>
          )}
          {item?.image !== null && (
            <ImageBackground
              style={{width: '100%', height: 190, borderRadius: 16}}
              source={{uri: item?.image}}>
              <View style={styles.contentWrapper}>
                <Text style={{color: 'black'}}>{item?.children_count}</Text>
                <Text style={{fontSize: 10, color: 'black'}}>Article</Text>
              </View>
              <View style={styles.wrapper}>
                <HTMLView
                  value={item?.name}
                  textComponentProps={{
                    style: {
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '600',
                    },
                  }}
                />
                {/* <Text style={{color: 'black', fontSize: 14}}>{item.name}</Text> */}
              </View>
            </ImageBackground>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
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
              value={search}
              onChangeText={text => searchFilterFunction(text)}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              marginHorizontal: 20,
              paddingBottom: 10,
            }}>
            <Text style={{fontSize: 9, color: '#14A2E2'}}>Content Library</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
            marginHorizontal: 20,
            paddingBottom: 20,
          }}>
          {contentLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
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
    marginLeft: 1,
    height: 190,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 5,
    // borderWidth: 0.3,
    backgroundColor: 'white',
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

    bottom: 0.3,
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
export default Content;
