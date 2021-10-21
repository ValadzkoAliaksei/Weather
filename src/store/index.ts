import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddlewere from 'redux-saga';

import { weatherReducer } from './weather';
import rootSaga from './weather/saga';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddlewere();

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
