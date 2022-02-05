import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_NAME} from '../../constants';
import {Typography} from '../../theme';

const HeaderTitle = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function myName() {
      const name = await getAsyncStorage(USER_NAME);
      await setUsername(name);
    }

    myName();
  }, []);

  return (
    <View style={{marginLeft: Platform.OS === 'ios' ? 5 : 40, marginTop: Platform.OS === 'ios' ? 10 : 10}}>
      <Text
        style={{
          color: 'white',
          fontSize:  Platform.OS === 'ios' ? 8: 10,
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
        {username}
      </Text>
    </View>
  );
};

export default HeaderTitle;
