import { configureStore } from '@reduxjs/toolkit'
import {  persistReducer } from "redux-persist";
import persistStore from 'redux-persist/lib/persistStore';
import expenseSlice, { ExpenseState } from '../slices/expenseSlice.ts';
import storage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import {FLUSH, REHYDRATE,PAUSE, PERSIST,PURGE, REGISTER} from 'redux-persist';

export interface RootState {
  expense: ExpenseState;
}
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

let rootReducer=combineReducers({
  expense:expenseSlice,

})
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
 

})

export const persistor = persistStore(store);
export default store;