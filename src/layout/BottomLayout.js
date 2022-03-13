import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomLayout = ({focused, navigation}) => {
  return (
    <View style={[styles.NavContainer, styles.shadow]}>
      <View style={styles.NavBar}>
        <Pressable onPress={() => navigation.navigate('Dashboard')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#57585A',
              }}>
              <Ionicons
                name="home-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : 'white'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Calendar')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#57585A',
              }}>
              <Ionicons
                name="calendar-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : 'white'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('UserList')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#57585A',
              }}>
              <Ionicons
                name="chatbox-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : 'white'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('People')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#57585A',
              }}>
              <Ionicons
                name="people-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : 'white'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Account')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#57585A',
              }}>
              <Ionicons
                name="person-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : 'white'}}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  NavContainer: {
    position: 'absolute',
    bottom: 1,
    width: '100%',

    // backgroundColor: 'rgba(215,233,245, 0.88)',
	backgroundColor:'rgb(0,0,139)',
    // borderRadius: 15,
    height: 60,
    alignContent: 'center',
  },
  shadow: {
    shadowColor: 'rgba(200, 200, 200, 0.33)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2.5,
    shadowRadius: 3.5,
    elevation: 3,
  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    borderRadius: 40,
  },
  IconBehave: {
    padding: 14,
  },
});

export default BottomLayout;
