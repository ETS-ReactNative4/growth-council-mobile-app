import React, {useState, useCallback, useLayoutEffect} from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat'
import {collection, getDocs, addDoc, query, orderBy} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors} from '../../../theme';
import {database} from '../../../utils/firebaseUtil';

const Chat = (props) => {

    const {navigation, route} = props;

    const friendID = route.params.friendID;
    const friendName = route.params.friendName;
    const friendAvatar = route.params.friendAvatar;
    const userID = route.params.userID;
    const userAvatar = route.params.userAvatar;
    const userName = route.params.userName;

    console.log("CHAT:::::::::::::::", friendID, userID);

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const fetchMessageAsync = async () => {
            const chatsCol = await collection(database, 'chats');
            const chatSnapshot = await getDocs(query(chatsCol, orderBy('createdAt', 'desc')));
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
                placeholder={'Write a message'}
                user={{
                    _id: userID,
                    name: userName,
                    avatar: userAvatar
                    // name: auth?.currentUser?.displayName,
                    // avatar: auth?.currentUser?.photoURL
                }}
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={styles.sendContainer}
                        >
                            <Ionicons
                                name={'send-sharp'}
                                size={22}
                                color={'white'}
                            />
                        </Send>
                    );
                }}
                image={friendAvatar}
                alwaysShowSend={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    sendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 15,
        height: 35,
        width: 35,
        backgroundColor: '#246EE9',
        borderRadius: 40,
    }
});

export default Chat;
