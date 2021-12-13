import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../theme';

const screenWidth = Math.round(Dimensions.get('window').width);

const Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={() => onPress(item)}>
      <View style={styles.imageContainer}>
        <Image
          style={{ height: Platform.OS === 'ios' ? 400 : 350, width: screenWidth, right: 0, left: 0,resizeMode: 'stretch',}}
          source={{uri: item[imageKey]}}
        />
      </View>
      <Text style={styles.desc}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.NONARY_BORDER_COLOR,
    borderBottomWidth: 1
  },
  desc: {
    fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE,
    fontFamily: Typography.FONT_MEDIUM,
    letterSpacing: 0,
    lineHeight: 24,
    //marginTop: 18,
    color: Colors.PRIMARY_TEXT_COLOR,
    textAlign: 'center',
    bottom: 200,
  },
});

export default Preview;
