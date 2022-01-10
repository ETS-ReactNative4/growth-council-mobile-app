import React, {useState, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'

import {CommonStyles, Colors} from '../../../theme';

const Chat = (props) => {

    const {navigation, route} = props;

    const friendID = route.params.friendID;
    const userID = route.params.userID;

    console.log("CHAT:::::::::::::::", friendID, userID);
    
    const [messages, setMessages] = useState([]);

    useEffect(async () => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                }}
            />
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
