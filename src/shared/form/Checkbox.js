import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

import {Colors, Typography} from '../../theme';

function CheckBox({label, status, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.checkbox}>
        <Checkbox status={status} />
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    color: Colors.PRIMARY_INPUT_TEXT_COLOR,
    width: '100%',
    paddingHorizontal: 0,
  },
});

export default CheckBox;
