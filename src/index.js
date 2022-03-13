import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import PushNotification, {Importance} from 'react-native-push-notification';

import {store, persistor} from './store';
import {MainNavigation} from './navigations';
import {navigationRef} from './utils/navigationUtil';
import {AuthProvider} from './context/auth';
import SplashScreen from './screens/splash';
import {navigate} from './utils/navigationUtil';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;

let fakeApiCallWithoutBadNetwork = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

const App = () => {

    let init = async () => {
        await RNBootSplash.hide();
    };

    useEffect(() => {
        init();
    }, []);

    const onBeforeLift = async () => {
        await fakeApiCallWithoutBadNetwork(1000);
    };

    const showNotification = notification => {
        PushNotification.localNotification({
            channelId: 'growth-council-reminder',
            title: notification?.data?.title || notification?.notification?.title,
            message: notification?.data?.message || notification?.notification?.body,
            priority: 'high',
            messageId: notification?.messageId,
        });
    };

    const createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: 'growth-council-reminder', // (required)
                channelName: 'growth council reminder', // (required)
                channelDescription: 'A growth council default channel"', // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
    };

    const requestUserPermission = async () => {
        /**
         * On iOS, messaging permission must be requested by
         * the current application before messages can be
         * received or sent
         */
        const authStatus = await messaging().requestPermission();
        return (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
    };

    useEffect(() => {
        createChannel();
        if (requestUserPermission()) {
            /**
             * Returns an FCM token for this device
             */
            messaging()
                .getToken()
                .then(fcmToken => {
                    console.log('FCM Token -> ', fcmToken);
                });
        }

        /**
         * When a notification from FCM has triggered the application
         * to open from a quit state, this method will return a
         * `RemoteMessage` containing the notification data, or
         * `null` if the app was opened via another method.
         */
        messaging()
            .getInitialNotification()
            .then(async remoteMessage => {
                console.log("InitialNotification::::::::::", remoteMessage);
                if (remoteMessage) {
                    console.log(
                        'getInitialNotification:' +
                        'Notification caused app to open from quit state',
                    );
                    const notificationType = remoteMessage?.data?.notification_type;
                    switch (notificationType) {
                        case 'event':
                            navigate('EventDetail', {id: remoteMessage.data.post_id});
                            break;
                        case 'session':
                            navigate('SessionDetail', {id: remoteMessage.data.post_id});
                            break;
                        case 'connection':
                            navigate('People', {id: remoteMessage.data.user_id});
                            break;
                        case 'chat':
                            navigate('UserList');
                            break;
                    }
                }
            });

        /**
         * When the user presses a notification displayed via FCM,
         * this listener will be called if the app has opened from
         * a background state. See `getInitialNotification` to see
         * how to watch for when a notification opens the app from
         * a quit state.
         */
        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log("NotificationOpenedApp::::::::::", remoteMessage);
            if (remoteMessage) {
                console.log(
                    'onNotificationOpenedApp: ' +
                    'Notification caused app to open from background state',
                );
                const notificationType = remoteMessage?.data?.notification_type;
                switch (notificationType) {
                    case 'event':
                        navigate('EventDetail', {id: remoteMessage.data.post_id});
                        break;
                    case 'session':
                        navigate('EventDetail', {id: remoteMessage.data.post_id});
                        break;
                    case 'connection':
                        navigate('People', {id: remoteMessage.data.user_id});
                        break;
                    case 'chat':
                        navigate('UserList');
                        break;
                }
            }
        });

        /**
         * Set a message handler function which is called when
         * the app is in the background or terminated. In Android,
         * a headless task is created, allowing you to access the
         * React Native environment to perform tasks such as updating
         * local storage, or sending a network request.
         */
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            showNotification(remoteMessage);
        });

        /**
         * When any FCM payload is received, the listener callback
         * is called with a `RemoteMessage`. Returns an unsubscribe
         * function to stop listening for new messages.
         */
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            showNotification(remoteMessage);
        });

        return () => {
            unsubscribe;
        };
    }, []);

    const routeNameRef = useRef();

    return (
        <Provider store={store}>
            {/**
             * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
             * and saved to redux.
             * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
             * for example `loading={<SplashScreen />}`.
             * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
             */}
            <PersistGate
                loading={<SplashScreen/>}
                onBeforeLift={onBeforeLift}
                persistor={persistor}>
                <NativeBaseProvider>
                    <PaperProvider>
                        <AuthProvider>
                            <NavigationContainer
                                ref={navigationRef}
                                onReady={() => {
                                    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
                                }}
                                onStateChange={async () => {
                                    const previousRouteName = routeNameRef.current;
                                    const currentRouteName = navigationRef.current.getCurrentRoute().name;
                                    console.log("RouteName", previousRouteName, currentRouteName);
                                    if (previousRouteName !== currentRouteName) {
                                        await analytics().logScreenView({
                                            screen_name: currentRouteName,
                                            screen_class: currentRouteName,
                                        });
                                    }
                                    routeNameRef.current = currentRouteName;
                                }}
                            >
                                <MainNavigation/>
                            </NavigationContainer>
                        </AuthProvider>
                    </PaperProvider>
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
