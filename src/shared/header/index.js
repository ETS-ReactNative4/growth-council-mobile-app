import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_NAME} from '../../constants';
import { Typography } from '../../theme';

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
    <View style={{marginLeft: 40, marginTop:10}}>
      <Text
        style={{
          color: '#000',
          fontSize: 10,
          fontFamily:Typography.FONT_SF_MEDIUM,
        }}>
        Hello
      </Text>
      <Text
        style={{
          fontFamily:Typography.FONT_SF_MEDIUM,
          color: '#000',
          fontSize: 18,
        }}>
        {username}
      </Text>
    </View>
  );
};

export default HeaderTitle;
