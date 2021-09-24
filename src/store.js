import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddlewere from 'redux-saga';

import { reducer } from './reducers';
import rootSaga from './saga/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddlewere();

export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
