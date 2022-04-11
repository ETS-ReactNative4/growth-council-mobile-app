import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {CommonStyles, Colors} from '../../../theme';
import {database} from '../../../utils/firebaseUtil';

const Chat = props => {
  const {
    navigation,
    route,
    notifications,
    notificationLoading,
    notificationError,
    sendNotificationByIdentifier,
    cleanNotification,
  } = props;

  const friendID = route.params.friendID;
  const friendName = route.params.friendName;
  const friendAvatar = route.params.friendAvatar;
  const userID = route.params.userID;
  const userAvatar = route.params.userAvatar;
  const userName = route.params.userName;

  console.log('FRIEND NAME:::::::::::::::', friendID, friendName);
  console.log('USER NAME:::::::::::::::', userID, userName);

  const chatID = () => {
    const chatIDPre = [];
    chatIDPre.push(friendID);
    chatIDPre.push(userID);
    chatIDPre.sort();
    return chatIDPre.join('_');
  };

  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    let unsubscribe = null;
    const fetchMessageAsync = async () => {
      const chatsCol = await collection(
        database,
        'rooms',
        chatID(),
        'messages',
      );
      const q = await query(chatsCol, orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, querySnapshot => {
        const messageList = querySnapshot?.docs?.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }));
        setMessages(messageList);
      });
    };
    fetchMessageAsync();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMessage2Async = async () => {
      let docIds = [];
      const chatsCol = await collection(
        database,
        'rooms',
        chatID(),
        'messages',
      );
      const chatSnapshot = await getDocs(
        query(
          chatsCol,
          where('status', '==', 'unread'),
          where('user._id', '==', friendID),
        ),
      );
      chatSnapshot.docs.map(async record => {
        if (record.exists) {
          console.log('Document ID::::::::::: ', record.id, record.data()._id);
          const taskDocRef = doc(
            database,
            'rooms',
            chatID(),
            'messages',
            record.id,
          );
          console.log('Document ID::::::::::: ', docIds);
          await updateDoc(taskDocRef, {status: 'read'});
        }
      });
    };

    fetchMessage2Async();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    const chatsCol = await collection(database, 'rooms', chatID(), 'messages');
    const newDoc = await addDoc(chatsCol, {
      _id,
      createdAt,
      text,
      user,
      status: 'unread',
    });
    console.log('Document ID::::::::::: ', newDoc);
    const response = await sendNotificationByIdentifier({
      user_id: friendID,
      title: `Message From ${userName}`,
      message: text,
      notification_type: 'chat',
    });
    console.log('Notification response::::::::::: ', response);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={40}
            color="#02B0F0"
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            source={{
              uri: friendAvatar,
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              marginLeft: 10,
			  backgroundColor:'red'
            }}
          />
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#323232', fontSize: 16}}>{friendName}</Text>
          </View>
        </View>

        {/**/}
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        placeholder={'Write a message'}
        user={{
          _id: userID,
          name: userName,
          avatar: userAvatar,
          // name: auth?.currentUser?.displayName,
          // avatar: auth?.currentUser?.photoURL
        }}
        renderSend={props => {
          return (
            <Send {...props} containerStyle={styles.sendContainer}>
              <Ionicons name={'send-sharp'} size={20} color={'white'} />
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
    flexDirection: 'row',
  },
});

export default Chat;
