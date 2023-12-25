import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['changeLaguage', 'changeRole'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, ...customizedMiddleware],
});
