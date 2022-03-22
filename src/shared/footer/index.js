import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const Footer = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}>
      {/* <Text style={{fontSize: 8, marginTop: 10, marginBottom:5}}>Powered By</Text> */}
      <Image
        source={require('../../assets/img/splashFooter.png')}
        style={{width: 90, height: 35}}
      />
    </View>
  );
};

export default Footer;
