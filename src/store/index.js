import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducer';
import { createLogger } from 'redux-logger';
import rootSaga from './saga';

// export const history = createBrowserHistory();
const rootReducer = createRootReducer();

const logger = createLogger({
  collapsed: true,
});

let middlewares;
const sagaMiddleware = createSagaMiddleware();
if (process.env.NODE_ENV === 'development') {
  middlewares = [sagaMiddleware, logger];
} else {
  middlewares = [sagaMiddleware];
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export default store;
