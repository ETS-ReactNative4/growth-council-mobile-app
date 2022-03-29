import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';

const OptionHeader = props => {
  

  return (
    <ImageBackground source={props.image} style={{width: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: Platform.OS === 'ios' ? 40 : 20,
          paddingBottom: 10,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {props.noDrawer ? (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <IonIcon name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <IonIcon name="menu-outline" color={'white'} size={30} />
            </TouchableOpacity>
          )} 
          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'SFProText-Medium',
              fontSize: 21,
              color: 'white',
            }}>
            {props.title}
          </Text>
        </View>

        
      </View>
    </ImageBackground>
  );
};

export default  OptionHeader;
