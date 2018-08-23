import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer';


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle
                  || (() => noop => noop);
const enhancers = [
  applyMiddleware(thunk),
  devTools(),
];
const persistedState = {
  navLink: { tabIndex: sessionStorage.getItem('tabIndex') || '0' },
};
const store = createStore(rootReducer, persistedState, compose(...enhancers));
export default store;
