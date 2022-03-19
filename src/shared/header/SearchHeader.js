import React from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme';

const SearchHeader = props => {
  const {navigation, value, onChangeText} = props;
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <FeatherIcon
          name="chevron-left"
          size={30}
          color={Colors.TERTIARY_BUTTON_COLOR}
        />
      </Pressable>
      <View style={styles.searchContainer}>
        <FeatherIcon name="search" size={20} color="#B2B3B9" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#B2B3B9"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  searchContainer: {
    flex: 1,
    height: 38,
    marginLeft: 13,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    flex: 1,
    height: 38,
    marginLeft: 10,
    paddingVertical: 0,
    fontFamily: 'SFProText-Regular',
  },
});

export default SearchHeader;
