import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'

import {CommonStyles, Colors} from '../../../theme';
import {database, auth} from '../../../utils/firebaseUtil';

const Chat = (props) => {

    const {navigation, route} = props;

    const friendID = route.params.friendID;
    const userID = route.params.userID;

    console.log("CHAT:::::::::::::::", friendID, userID);

    const [messages, setMessages] = useState([]);

    // useEffect(async () => {
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, []);

    useLayoutEffect(() => {
        const unsubscribe = database.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));
    });

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {_id, createdAt, text, user,} = messages[0];
        database.collection('chats').add({_id, createdAt, text, user})

    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    //name: auth?.currentUser?.displayName,
                    // avatar: auth?.currentUser?.photoURL
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
