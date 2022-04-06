import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import spinner from '../../assets/gif/Spinner-1s-200px.gif'; // create gif from https://loading.io

const Loader = () => {
  return (
    <View style={styles.loading}>
      <Image src={spinner} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
