import React, {useState, useEffect} from 'react';
import {Badge} from 'react-native-paper';
import {collection, query, onSnapshot, where} from 'firebase/firestore';

import {database} from '../../utils/firebaseUtil';

const ChatCount = (props) => {

    const {item, userID} = props;

    const [friend, setFriend] = useState(item);

    const chatID = (item) => {
        const chatIDPre = [];
        chatIDPre.push(item?.ID);
        chatIDPre.push(userID);
        chatIDPre.sort();
        return chatIDPre.join('_');
    };

    const messageCount = async (item) => {
        const chatsCol = await collection(database, 'rooms', chatID(item), 'messages');
        const q = await query(chatsCol, where('status', '==', 'unread'), where('user._id', '!=', userID));
        onSnapshot(q, (querySnapshot) => {
            item = {...item, ...{count: querySnapshot.size}};
            setFriend(item);
        });

    };

    useEffect(() => {
        messageCount(item);

    }, []);

    return (
        friend?.count > 0 &&
        <Badge size={25}> {friend?.count}</Badge>
    );
};


export default ChatCount;
