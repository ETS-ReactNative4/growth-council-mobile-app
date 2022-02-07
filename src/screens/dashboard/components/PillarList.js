import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {
  COACHING_COLOR,
  COMMUNITY_COLOR,
  PRACTICE_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_TEXT_COLOR,
  QUATERNARY_TEXT_COLOR,
} from '../../../theme/colors';

const PillarList = props => {
  const {navigation, pillarSliders} = props;

  //console.log('pillar_ID', pillarSliders?.term_id);

  return pillarSliders.map((item, index) => {
    let navigationPath = '';
    let borderColor = PRIMARY_BACKGROUND_COLOR;
    switch (item?.slug) {
      case 'community':
        navigationPath = 'Community';
        borderColor = COMMUNITY_COLOR;
        break;
      case 'best-practices':
        navigationPath = 'Best Practices';
        borderColor = PRACTICE_COLOR;
        break;
      case 'growth-coaching':
        navigationPath = 'Growth Coaching';
        borderColor = COACHING_COLOR;
    }

    return (
      <View style={[styles.ImageWrapper, {borderColor: borderColor}]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationPath, {pillarId: item.term_id})
          }>
          <Image source={{uri: item?.image}} style={styles.ImageStyle} />
          <Text style={styles.sliderText}>{item?.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  ImageWrapper: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: Platform.OS === 'ios' ? 150 : 172,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: PRIMARY_BACKGROUND_COLOR,
    overflow: 'hidden',
  },
  ImageStyle: {
    width: '100%',
    height: '100%',
  },
  sliderText: {
    position: 'absolute',
    top: '80%',
    left: 8,
    color: QUATERNARY_TEXT_COLOR,
    marginTop: 10,
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? 10 : 12,
  },
});
export default PillarList;
