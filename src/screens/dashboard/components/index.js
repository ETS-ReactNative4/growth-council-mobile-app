import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image, ImageBackground, TouchableOpacity
} from 'react-native';
import {Button} from 'native-base';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Dashboard = ({navigation}) => {

    return (
        <View style={styles.container}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    wrapper: {
        top: '20%',
    },
});

export default Dashboard;
