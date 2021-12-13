import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {Colors} from '../../theme';

const Skeleton = () => {
    return (
        <View style={styles.skeletonWrapper}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row">
                    <SkeletonPlaceholder.Item width={44} height={44} borderRadius={22}/>
                    <SkeletonPlaceholder.Item
                        flex={1}
                        justifyContent={'center'}
                        marginLeft={12}
                    >
                        <SkeletonPlaceholder.Item
                            width="100%"
                            height={12}
                            borderRadius={6}
                            alignItems={'center'}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonWrapper: {
        marginBottom: 10,
        backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
        padding: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.SENARY_BORDER_COLOR,
    },

});

export default Skeleton;
