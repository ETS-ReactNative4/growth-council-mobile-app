import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_NAME} from '../../constants';
import {Typography} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const HeaderTitle = props => {
  const [username, setUsername] = useState(null);
  const isFocused = useIsFocused();

  const {profile, fetchProfileByIdentifier, profileLoading} = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);


  return (
    <View style={{marginLeft: 20}}>
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
        {profile?.user_meta?.first_name} {profile?.user_meta?.last_name}
      </Text>
    </View>
  );
};

export default HeaderTitle;
