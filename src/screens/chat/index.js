import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Chat from './components';
import {sendNotificationByUserID, resetNotification} from './slice/notificationSlice';

const ChatScreen = (props) => {

    const dispatch = useDispatch();

    const {notifications, notificationLoading, notificationError} = useSelector(state => state.notifications);

    /**
     * Send notification connected member.
     * @param {object} formData
     *
     */
    const sendNotificationByIdentifier = formData => {
        return dispatch(sendNotificationByUserID(formData));
    };

    /**
     * Clear connect member notification.
     *
     */
    const cleanNotification = () => {
        dispatch(resetNotification());
    };

    return (
        <Chat
            {...props}
            notifications={notifications}
            notificationLoading={notificationLoading}
            notificationError={notificationError}
            sendNotificationByIdentifier={sendNotificationByIdentifier}
            cleanNotification={cleanNotification}
        />
    );
};

export default ChatScreen;
