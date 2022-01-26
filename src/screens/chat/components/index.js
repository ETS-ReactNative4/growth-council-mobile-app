import React, {useState, useCallback, useLayoutEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat'
import {collection, getDocs, addDoc, setDoc, query, orderBy,doc} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
            //const chatsCol = await collection(database, 'rooms');
            const chatsCol = await collection(database, 'rooms', `${userID}-${friendID}`, 'messages');
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
        // const chatsCol = await collection(database, 'rooms');
        const chatsCol = await collection(database, 'rooms', `${userID}-${friendID}`, 'messages');
        console.log("chatsCol ID::::::::::: ", chatsCol);
        const newDoc = await addDoc(chatsCol, {_id, createdAt, text, user});
       // const newDoc = await setDoc(doc(chatsCol, "rooms", userID), {_id, createdAt, text, user});
        console.log("Document ID::::::::::: ", newDoc);
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name='chevron-back-outline'
                        size={30}
                        color='#02B0F0'
                        style={{marginTop: 10}}
                    />
                </TouchableOpacity>

                <Image
                    // source={require('../../../assets/img/profile_image.png')}
                    source={{
                        uri: friendAvatar,
                    }}
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        marginLeft: 20,

                    }}
                />
                <View style={{marginLeft: 10, width: "50%"}}>
                    <Text style={{color: '#323232', fontSize: 16}}>{friendName}</Text>
                    <Text style={{color: '#969696', fontSize: 14}}>Last seen recently</Text>
                </View>

                <Ionicons
                    name='ellipsis-horizontal-sharp'
                    size={30}
                    color='#969696'
                    style={{marginTop: 10, marginLeft: 30}}
                />

            </View>
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
                                size={20}
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
    },
    wrapper: {
        height: 80,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        borderTopWidth: 0.2,
        padding: 10,

        display: 'flex',
        flexDirection: 'row'
    },
});

export default Chat;
