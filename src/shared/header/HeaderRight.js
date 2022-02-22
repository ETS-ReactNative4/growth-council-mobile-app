import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const HeaderRight = props => {
  const {navigation, profile, fetchProfileByIdentifier} = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, []);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" color={'white'} size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{height: 40, width: 40, borderRadius: 20}}
        onPress={() => navigation.navigate('Person')}>
        <Image
          source={{
            uri: profile.avatar,
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
