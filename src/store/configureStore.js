import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers';
// import apiMiddleware from './apiMiddleware';
// import rootSaga from '../sagas';

const logger = createLogger(); // <-- remove in production

// const sagaMiddleware = createSagaMiddleware();

export default function configureStore(api, initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                // sagaMiddleware,
                // apiMiddleware(api),
                thunk,
                logger,
            ),
        ),
    );

    // sagaMiddleware.run(rootSaga);

    // if (module.hot) {
    //   console.log('module.hot', module.hot);
    //   console.log('module----------------');
    //   module.hot.accept('../reducers', () => {
    //     const nextRootReducer = require('../reducers');
    //     store.replaceReducer(nextRootReducer);
    //   });
    // }

    return store;
}
