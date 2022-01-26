import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../screens/auth/authSlice';
<<<<<<< HEAD
import profileReducer from '../screens/account/profileSlice';
import passwordReducer from '../screens/setting/passwordSlice';
import upcomingEventReducer from '../screens/dashboard/slice/upcomingEventSlice';
=======

import userReducer from '../screens/account/slice/userSlice';
import passwordReducer from '../screens/account/slice/passwordSlice';

>>>>>>> qa
import pointOfEngagementReducer from '../screens/dashboard/slice/pointOfEngagementSlice';
import pillarPOEReducer from '../screens/dashboard/slice/pillarPOESlice';

import communityMemberReducer from '../screens/dashboard/slice/communityMemberSlice';

<<<<<<< HEAD
import eventReducer from '../screens/event/eventSlice';
=======
import aboutReducer from '../screens/about/slice/aboutSlice';
import feedbackReducer from '../screens/feedback/slice/feedbackSlice';
import ideaReducer from '../screens/ideas/slice/ideaSlice';
import privacyReducer from '../screens/privacy/slice/privacySlice';

import eventReducer from '../screens/event/slice/eventSlice';
import eventRegisterReducer from '../screens/event/slice/eventRegisterSlice';

import connectionReducer from '../screens/chat/slice/connetionSlice';

import memberConnectionReducer from '../screens/people/slice/memberConnectionSlice';

import profileReducer from '../screens/account/slice/profileSlice';
import otherProfileReducer from '../screens/account/slice/otherProfileSlice';
import profileEventReducer from '../screens/account/slice/profileEventSlice';
import profileSessionReducer from '../screens/account/slice/profileSessionSlice';

import communityReducer from '../screens/dashboard/slice/communitySlice';
import pillarEventsReducer from '../screens/dashboard/slice/pillarEventsSlice';
import communityMemberContentReducer from '../screens/dashboard/slice/communityMemberContentSlice';
import growthCoachingMemberContentReducer from '../screens/dashboard/slice/growthCoachingMemberContentSlice';
import bestPracticesReducer from '../screens/dashboard/slice/bestPracticesSlice';
import bestPracticesMemberContentReducer from '../screens/dashboard/slice/bestPracticesMemberContentSlice';
import growthCoachingsReducer from '../screens/dashboard/slice/growthCoachingSlice';
import poeDetailReducer from '../screens/details/slice/poeDetailSlice';
import poeEventListReducer from '../screens/details/slice/poeEventListSlice';
import pillarMembersContentsReducer from '../screens/details/slice/pillarMembersContentsSlice';

import sessionDetailReducer from '../screens/details/slice/sesssionDetailSlice';
>>>>>>> qa

import pillarReducer from '../screens/home/pillarSlice';
import pillarSliderReducer from '../screens/home/pillarSliderSlice';

import sessionReducer from '../screens/sessions/slice/sessionSlice';
import sessionRegisterReducer from '../screens/sessions/slice/sessionRegister';

import calendarEventReducer from '../screens/calendar/calendarEventSlice';

import searchReducer from '../screens/search/searchSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
};

const reducers = combineReducers({
    auth: authReducer,
<<<<<<< HEAD
    profile: profileReducer,
    password: passwordReducer,
    upcomingEvents: upcomingEventReducer,
    pointOfEngagements: pointOfEngagementReducer,
    communityMembers: communityMemberReducer,
    events: eventReducer,
    pillars: pillarReducer,
    pillarSliders: pillarSliderReducer,
=======
    users: userReducer,
    password: passwordReducer,
    upcomingEvents: upcomingEventReducer,
    poes: pointOfEngagementReducer,
    pillarPOEs: pillarPOEReducer,
    communityMembers: communityMemberReducer,
    events: eventReducer,
    about: aboutReducer,
    details: detailReducer,
    feedback: feedbackReducer,
    privacy: privacyReducer,
    idea: ideaReducer,
    pillars: pillarReducer,
    pillarSliders: pillarSliderReducer,
    pillarEvents: pillarEventsReducer,
    poeDetails: poeDetailReducer,
    poeEvents: poeEventListReducer,
    pillarMemberContents: pillarMembersContentsReducer,

    connection: connectionReducer,
    communities: communityReducer,
    communityMemberContents: communityMemberContentReducer,
    sessionDetails: sessionDetailReducer,
    profile: profileReducer,
    otherProfiles: otherProfileReducer,
    profileEvent: profileEventReducer,
    bestPractices: bestPracticesReducer,
    growthCoachings: growthCoachingsReducer,
    bestPracticesMemberContents: bestPracticesMemberContentReducer,
    growthCoachingMemberContents: growthCoachingMemberContentReducer,
    profileSession: profileSessionReducer,
    memberConnections: memberConnectionReducer,
    eventRegisters: eventRegisterReducer,
    sessions: sessionReducer,
    sessionRegisters: sessionRegisterReducer,

    calendarEvents: calendarEventReducer,
    searches: searchReducer,
>>>>>>> qa
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
<<<<<<< HEAD
    middleware: (getDefaultMiddleware) => {
=======
    middleware: getDefaultMiddleware => {
>>>>>>> qa
        let middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });

        if (__DEV__ && !process.env.JEST_WORKER_ID) {
            const createDebugger = require('redux-flipper').default;
            middlewares.push(createDebugger());
        }

        return middlewares;
    },
});

const persistor = persistStore(store);

export {store, persistor};
