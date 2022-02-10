import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_AVATAR} from '../../constants';
import {useIsFocused} from '@react-navigation/native';


const HeaderRight = props => {
  const [avatar, setAvatar] = useState(null);
  const isFocused = useIsFocused();

  const {
	  navigation,
    profile,   
    fetchProfileByIdentifier,
    
  } = props;

  useEffect(() => {
   
       fetchProfileByIdentifier();

	}, [isFocused]);

//   useEffect(() => {
//     async function myAvatarImg() {
//       const avatarImg = await getAsyncStorage(USER_AVATAR);
//       setAvatar(avatarImg);
//     }

//     myAvatarImg();
//   }, []);

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginLeft: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons
          name="search-outline"
          color={'white'}
          size={Platform.OS === 'ios' ? 20 : 30}
          style={{marginTop: 15, marginRight: Platform.OS === 'ios' ? 5 : 5}}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Person')}>
        <Image
          //source={require('../assets/img/small_profile_image.png')}
          source={{
            uri: profile.avatar
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            marginRight: Platform.OS === 'ios' ? 10 : 15,
            marginTop: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
