import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';

const Search = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={{height: 170, backgroundColor: 'grey'}}/>
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

export default Search;
