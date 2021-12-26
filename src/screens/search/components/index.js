import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';

const Search = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Search</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
  },
});

export default Search;
