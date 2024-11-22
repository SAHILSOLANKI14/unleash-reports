import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import createRootReducer from './reducer';
import { createLogger } from 'redux-logger';
import rootSaga from './saga';

const rootReducer = createRootReducer();

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['singlepage'], // Specify reducers to persist (e.g., `cart`, `auth`)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares =
  process.env.NODE_ENV === 'development' ? [sagaMiddleware, logger] : [sagaMiddleware];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
