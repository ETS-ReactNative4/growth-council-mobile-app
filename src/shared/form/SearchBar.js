import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

const Searchbox = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      style={styles.searchbox}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchbox: {
    marginTop: 25,
    marginBottom: 15,
    width: '95%',
    paddingHorizontal: 0,
    borderRadius: 15,
  },
});

export default Searchbox;
