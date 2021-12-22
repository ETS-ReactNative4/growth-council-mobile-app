import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';

const Chat = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View>
                <Text>Chat</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
});

export default Chat;
