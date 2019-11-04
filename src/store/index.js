import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleaware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleaware = createSagaMiddleaware({
  sagaMonitor,
});

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleaware)
      )
    : applyMiddleware(sagaMiddleaware);

const store = createStore(rootReducer, enhancer);

sagaMiddleaware.run(rootSaga);

export default store;
