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
import {useDispatch, useSelector} from 'react-redux';

import {fetchProfileByID} from '../../screens/account/slice/profileSlice';
import HeaderRight from './HeaderRight';

const SubHeader = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

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
          {/* <TouchableOpacity onPress={() => props.navigation.navigate('About')}>
            <Image
              source={require('../../assets/img/GILCouncillog.png')}
              style={{
                height: 35,
                width: 35,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity> */}
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

export default SubHeader;
