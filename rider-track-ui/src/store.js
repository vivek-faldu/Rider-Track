/**
 * The redux store for global state management.
 * Task: 58
 * Date: 10/10/2019
 * Copied from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 * The redux persist part has been referred from: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const persistConfiguration = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const pReducer = persistReducer(persistConfiguration, rootReducer);

const initialState = {};
const middleware = [thunk];
const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  ),
);

export default store;
export const persistor = persistStore(store);
