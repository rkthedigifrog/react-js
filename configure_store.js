import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
export const history = createHistory();

import { loadingBarMiddleware } from 'react-redux-loading-bar'

function configureStoreProd(initialState) {
	const reactRouterMiddleware = routerMiddleware(history);
	const middlewares = [
		// Add other middleware on this line...

		loadingBarMiddleware({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']}),
		// thunk middleware can also accept an extra argument to be passed to each thunk action
		
		thunk,
		reactRouterMiddleware,
	];

	return createStore(rootReducer, initialState, compose(
		applyMiddleware(...middlewares)
		)
	);
}

function configureStoreDev(initialState) {
	const reactRouterMiddleware = routerMiddleware(history);
	const middlewares = [
		

		loadingBarMiddleware({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']}),
		// Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
		reduxImmutableStateInvariant(),

		
		thunk,
		reactRouterMiddleware,
	];

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares )
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;