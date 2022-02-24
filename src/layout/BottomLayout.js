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
        <Pressable
          onPress={() => navigation.navigate('Dashboard')}
          android_ripple={{borderless: true, radius: 50}}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
                tintColor: focused ? '#e32f45' : '#748c94',
              }}>
              <Ionicons
                name="home-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : '#748c94'}}
              />
            </View>
            <Text
              style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              Home
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Calendar')}
		 android_ripple={{borderless: true, radius: 50}}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="calendar-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : '#748c94'}}
              />
            </View>
            <Text
              style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              Calendar
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('UserList')}
		 android_ripple={{borderless: true, radius: 50}}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="chatbox-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : '#748c94'}}
              />
            </View>
            <Text
              style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              Chat
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('People')}
		 android_ripple={{borderless: true, radius: 50}}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="people-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : '#748c94'}}
              />
            </View>
            <Text
              style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              People
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Person')}
		 android_ripple={{borderless: true, radius: 50}}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="person-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? '#e32f45' : '#748c94'}}
              />
            </View>
            <Text
              style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
              Profile
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  NavContainer: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    right: 10,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 70,
    alignContent: 'center',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 40,
  },
  IconBehave: {
    padding: 14,
  },
});

export default BottomLayout;
