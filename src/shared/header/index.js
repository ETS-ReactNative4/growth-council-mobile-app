import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_NAME} from '../../constants';
import {Typography} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const HeaderTitle = props => {
  const [username, setUsername] = useState(null);
  const isFocused = useIsFocused();

  const {
    profile,   
    fetchProfileByIdentifier,
    
  } = props;

  useEffect(() => {
   
       fetchProfileByIdentifier();

	}, [isFocused]);

//   useEffect(() => {
//     async function myName() {
//       const name = await getAsyncStorage(USER_NAME);
//       setUsername(name);
//     }

//     myName();
//   }, [isFocused]);

  return (
    <View
      style={{
        marginLeft: Platform.OS === 'ios' ? 5 : 40,
        marginTop: Platform.OS === 'ios' ? 10 : 10,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: Platform.OS === 'ios' ? 8 : 10,
          fontFamily: Typography.FONT_SF_MEDIUM,
        }}>
        Hello,
      </Text>
      <Text
        style={{
          fontFamily: Typography.FONT_SF_MEDIUM,
          color: 'white',
          fontSize: Platform.OS === 'ios' ? 16 : 18,
          fontWeight: 'normal',
        }}>
        {profile.display_name}
      </Text>
    </View>
  );
};

export default HeaderTitle;
