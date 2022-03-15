import React, {useState} from 'react';
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

const CriticalIssue = props => {
  const {navigation} = props;

  const Data = [
    {
      image: require('../../../assets/img/Critical.png'),
      title: 'Strategic Planning for 2030 and Beyond',
      description:
        'Curating the strategic roadmap \n \n Pivoting in response to changing external factors \n \n Aligning the organization for your top competitive priorities',
    },
    {
      image: require('../../../assets/img/Critical.png'),
      title: 'The War for Talent',
      description:
        'Curating the strategic roadmap \n \n Pivoting in response to changing external factors \n \n Aligning the organization for your top competitive priorities',
    },
    {
      image: require('../../../assets/img/Critical.png'),
      title:
        'Integrating New Disruptive Technologies into Your Innovation Portfolio',
      description:
        'Curating the strategic roadmap \n \n Pivoting in response to changing external factors \n \n Aligning the organization for your top competitive priorities',
    },
    {
      image: require('../../../assets/img/Critical.png'),
      title: 'Go-To-Market Strategy',
      description:
        'Curating the strategic roadmap \n \n Pivoting in response to changing external factors \n \n Aligning the organization for your top competitive priorities',
    },

    {
      image: require('../../../assets/img/Critical.png'),
      title: 'Go-To-Market Strategy',
      description:
        'Curating the strategic roadmap.\n \n Pivoting in response to changing external factors.\n \n Aligning the organization for your top competitive priorities',
    },
  ];

  const _renderContent = ({item, index}) => {
    return (
      <View style={[styles.content, styles.shadowProp]}>
        <Image
          style={{width: '100%', height: 100, borderRadius: 16}}
          source={item?.image}
        />
        <View style={styles.contentWrapper}>
          <Text style={{color: 'black', fontSize: 14}}>{item.title}</Text>
          {/* <Text style={{color: 'black', fontSize: 10, padding:10}}>{item.description}</Text> */}
          <HTMLView
            value={item.description}
            textComponentProps={{
              style: {
                fontSize: 10,
                color: 'black',
                marginLeft: 10,
                marginTop: 10,
              },
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              paddingBottom: 30,
              fontWeight: '600',
            }}>
            2022 Critical Issue
          </Text>

          <View style={styles.titleBorder}></View>

          <Text style={styles.titleText}>
            Council members vote each year to determine which industry
            challenges, or critical issues, will be the Council’s focus for the
            year ahead.
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
    padding: 20,
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
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 2,
    position: 'relative',
    borderWidth: 0.1,
  },
  contentWrapper: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },

  title: {
    marginBottom: 20,
  },
  titleText: {
    color: '#666767',
    fontSize: 14,
    marginTop: 30,
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  shadowProp: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
export default CriticalIssue;
