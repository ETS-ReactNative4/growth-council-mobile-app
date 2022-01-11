import React, {useState, useCallback, useLayoutEffect} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import {collection, getDocs, addDoc} from 'firebase/firestore';

import {CommonStyles, Colors} from '../../../theme';
import {database} from '../../../utils/firebaseUtil';

const Chat = (props) => {

    const {navigation, route} = props;

    const friendID = route.params.friendID;
    const userID = route.params.userID;

    console.log("CHAT:::::::::::::::", friendID, userID);

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const fetchMessageAsync = async () => {
            // const chatsCol = collection(database, 'chats').orderBy('createdAt', 'desc');
            const chatsCol = await collection(database, 'chats');
            const chatSnapshot = await getDocs(chatsCol);
            const messageList = chatSnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }));
            setMessages(messageList);
        };
        fetchMessageAsync();

    }, []);

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        console.log("Message ID::::::::::: ", messages[0]);
        const {_id, createdAt, text, user,} = messages[0];
        const chatsCol = await collection(database, 'chats');
        console.log("chatsCol ID::::::::::: ", chatsCol);
        const newDoc = await addDoc(chatsCol, {_id, createdAt, text, user});
        console.log("Document ID::::::::::: ", newDoc);
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
