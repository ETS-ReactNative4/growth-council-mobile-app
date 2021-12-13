import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import Tab from './Tab';

const Tabs = (props) => {

    const {tabs, active, onMeasurement, onPress} = props;

    return (
        <View style={styles.overlay}>
            {tabs?.map((tab, index) => (
                <Tab
                    key={index}
                    onMeasurement={
                        onMeasurement ? onMeasurement.bind(null, index) : undefined
                    }
                    color={active ? 'white' : 'white'}
                    onPress={onPress ? onPress.bind(null, index) : undefined}
                    {...tab}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
         ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        flex: 1,
        marginTop: -7,
    },
});

export default Tabs;
