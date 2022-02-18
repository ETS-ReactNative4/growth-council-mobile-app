import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';

import {store, persistor} from './store';
import {MainNavigation} from './navigations';
import {navigationRef} from './utils/navigationUtil';
import {AuthProvider} from './context/auth';
import SplashScreen from './screens/splash';

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

    const TOPIC = 'MyEvents';
    const requestUserPermission = async () => {
        /**
         * On iOS, messaging permission must be requested by
         * the current application before messages can be
         * received or sent
         */
        const authStatus = await messaging().requestPermission();
        console.log('Authorization status(authStatus):', authStatus);
        return (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
    };

    useEffect(() => {
        if (requestUserPermission()) {
            /**
             * Returns an FCM token for this device
             */
            messaging().getToken().then((fcmToken) => {
                console.log('FCM Token -> ', fcmToken);
            });
        } else {
            console.log('Not Authorization status:');
        }

        /**
         * When a notification from FCM has triggered the application
         * to open from a quit state, this method will return a
         * `RemoteMessage` containing the notification data, or
         * `null` if the app was opened via another method.
         */
        messaging()
            .getInitialNotification().then(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'getInitialNotification:' +
                    'Notification caused app to open from quit state',
                );
                console.log(remoteMessage);
                alert(
                    'getInitialNotification: Notification caused app to' +
                    ' open from quit state',
                );
            }
        });

        /**
         * When the user presses a notification displayed via FCM,
         * this listener will be called if the app has opened from
         * a background state. See `getInitialNotification` to see
         * how to watch for when a notification opens the app from
         * a quit state.
         */
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'onNotificationOpenedApp: ' +
                    'Notification caused app to open from background state',
                );
                console.log(remoteMessage);
                alert(
                    'onNotificationOpenedApp: Notification caused app to' +
                    ' open from background state',
                );
            }
        });

        /**
         * Set a message handler function which is called when
         * the app is in the background or terminated. In Android,
         * a headless task is created, allowing you to access the
         * React Native environment to perform tasks such as updating
         * local storage, or sending a network request.
         */
        messaging().setBackgroundMessageHandler(
            async (remoteMessage) => {
                console.log(
                    'Message handled in the background!',
                    remoteMessage,
                );
            });

        /**
         * When any FCM payload is received, the listener callback
         * is called with a `RemoteMessage`. Returns an unsubscribe
         * function to stop listening for new messages.
         */
        const unsubscribe = messaging().onMessage(
            async (remoteMessage) => {
                alert('A new FCM message arrived!');
                console.log(
                    'A new FCM message arrived!',
                    JSON.stringify(remoteMessage),
                );
            },
        );

        /**
         * Apps can subscribe to a topic, which allows the FCM
         * server to send targeted messages to only those devices
         * subscribed to that topic.
         */
        messaging()
            .subscribeToTopic(TOPIC)
            .then(() => {
                console.log(`Topic: ${TOPIC} Suscribed`);
            });

        return () => {
            unsubscribe;
        };
    }, []);

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
                            <NavigationContainer ref={navigationRef}>
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
