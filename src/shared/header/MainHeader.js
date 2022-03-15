import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import HeaderTitle from '.';
import {fetchProfileByID} from '../../screens/account/slice/profileSlice';
import HeaderRight from './HeaderRight';

const MainHeader = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

  return (
    <ImageBackground
      source={require('../../assets/img/appBG.png')}
      style={{width: Dimensions.get('window').width}}>
      <SafeAreaView style={{marginTop: -20}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <IonIcon name="menu-outline" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('About')}>
            <Image
              source={require('../../assets/img/GILCouncillog.png')}
              style={{
                height: 35,
                width: 35,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <HeaderTitle
            {...props}
            profile={profile}
            profileLoading={profileLoading}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
          />
        </View>

        <HeaderRight
          {...props}
          navigation={props.navigation}
          profile={profile}
          fetchProfileByIdentifier={fetchProfileByIdentifier}
        />
      </View>
    </ImageBackground>
  );
};

export default MainHeader;
