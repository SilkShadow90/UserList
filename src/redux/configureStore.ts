import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/root';
import { AppState } from '../types';

type RootState = ReturnType<typeof rootReducer>;

export function configureStore(preloadedState: RootState | AppState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

  return createStore(rootReducer, preloadedState as RootState, composedEnhancers);
}
