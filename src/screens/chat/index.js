import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Chat from './components';

const ChatScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Chat
            {...props}
        />
    );
};

export default ChatScreen;
