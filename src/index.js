import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';

import {store, persistor} from './store';
import {MainNavigation} from './navigations';
import {navigationRef} from './utils/navigationUtil';
import {AuthProvider} from './context/auth';
import SplashScreen from './screens/splash';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

let fakeApiCallWithoutBadNetwork = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {

    let init = async () => {
        await RNBootSplash.hide();
    };

    useEffect(() => {
        init();
    }, []);

    const onBeforeLift = async () => {
        await fakeApiCallWithoutBadNetwork(3000);
    };

    return (<Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={<SplashScreen/>} onBeforeLift={onBeforeLift} persistor={persistor}>
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
    </Provider>);
};


export default App;
