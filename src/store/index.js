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
import userReducer from '../screens/account/slice/userSlice';
import passwordReducer from '../screens/account/slice/passwordSlice';
import pointOfEngagementReducer from '../screens/dashboard/slice/pointOfEngagementSlice';
import communityMemberReducer from '../screens/dashboard/slice/communityMemberSlice';
import aboutReducer from '../screens/about/slice/aboutSlice';
import feedbackReducer from '../screens/feedback/slice/feedbackSlice';
import ideaReducer from '../screens/ideas/slice/ideaSlice';
import eventReducer from '../screens/event/eventSlice';
import connectionReducer from '../screens/people/slice/connetionSlice';
import profileReducer from '../screens/account/slice/profileSlice';
import otherProfileReducer from '../screens/account/slice/otherProfileSlice';
import profileEventReducer from '../screens/account/slice/profileEventSlice';
import communityReducer from '../screens/dashboard/slice/communitySlice';
import communityMemberContentReducer from '../screens/dashboard/slice/communityMemberContentSlice';
import sessionDetailReducer from '../screens/details/slice/sesssionDetailSlice';
import bestPracticesReducer from '../screens/dashboard/slice/bestPracticesSlice';
import bestPracticesMemberContentReducer from '../screens/dashboard/slice/bestPracticesMemberContentSlice';
import growthCoachingsReducer from '../screens/dashboard/slice/growthCoachingSlice';
import growthCoachingMemberContentReducer from '../screens/dashboard/slice/growthCoachingMemberContentSlice';
import profileSessionReducer from '../screens/account/slice/profileSessionSlice';
import pillarEventsReducer from '../screens/dashboard/slice/pillarEventsSlice';

import upcomingEventReducer from '../screens/home/slice/upcomingEventSlice';
import detailReducer from '../screens/home/slice/detailSlice';
import pillarReducer from '../screens/home/slice/pillarSlice';
import pillarSliderReducer from '../screens/home/slice/pillarSliderSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  password: passwordReducer,
  upcomingEvents: upcomingEventReducer,
  pointOfEngagements: pointOfEngagementReducer,
  communityMembers: communityMemberReducer,
  events: eventReducer,
  about: aboutReducer,
  details: detailReducer,
  feedback: feedbackReducer,
  idea: ideaReducer,
  pillars: pillarReducer,
  pillarSliders: pillarSliderReducer,
  pillarEvents: pillarEventsReducer,

  connection: connectionReducer,
  communities: communityReducer,
  communityMemberContents: communityMemberContentReducer,
  sessionDetails: sessionDetailReducer,
  profile: profileReducer,
  otherProfile: otherProfileReducer,
  profileEvent: profileEventReducer,
  bestPractices: bestPracticesReducer,
  growthCoachings: growthCoachingsReducer,
  bestPracticesMemberContents: bestPracticesMemberContentReducer,
  growthCoachingMemberContents: growthCoachingMemberContentReducer,
  profileSession: profileSessionReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
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
