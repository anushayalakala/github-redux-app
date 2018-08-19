import {createStore,compose,applyMiddleware} from 'redux';
import rootReducer from '../Reducer';
import thunk from 'redux-thunk';


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);
const enhancers= [
    applyMiddleware(thunk),
    devTools()
];
const persistedState = {
  navLink :  { tabIndex : sessionStorage.getItem('tabIndex') ||"0" }
};
const store = createStore(rootReducer,persistedState,compose(...enhancers));
export default store;

