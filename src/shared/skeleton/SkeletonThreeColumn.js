import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {Colors} from '../../theme';

const SkeletonThreeColumn = () => {
    return (
        <View style={styles.skeletonWrapper}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems={'center'}>
                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30}/>
                    <SkeletonPlaceholder.Item
                        flex={1}
                        justifyContent={'center'}
                        marginLeft={12}
                    >
                        <SkeletonPlaceholder.Item
                            width="70%"
                            height={32}
                            borderRadius={0}
                            alignItems={'center'}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                        width={50}
                        height={15}
                        borderRadius={0}
                        alignItems={'center'}
                    />
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

export default SkeletonThreeColumn;
